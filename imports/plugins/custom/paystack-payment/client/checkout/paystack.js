/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { AutoForm } from "meteor/aldeed:autoform";
import { Random } from "meteor/random";
import { $ } from "meteor/jquery";
import { Reaction } from "/client/api";
import { Cart, Packages } from "/lib/collections";
import { Paystack } from "../../lib/api";
import { PaystackPayment } from "../../lib/collections/schemas";

import "./paystack.html";

let submitting = false;

function uiEnd(template, buttonText) {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
}

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function paystackSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
}


Template.paystackPaymentForm.helpers({
  PaystackPayment() {
    return PaystackPayment;
  }
});

AutoForm.addHooks("paystack-payment-form", {
  onSubmit(val) {
    Meteor.call("paystack/loadPaystackApiKeys", (error, paystackPublicAndSecretKeys) => {
      if (error) {
        throw new Meteor.Error("Failed to load keys");
      }
      if (paystackPublicAndSecretKeys) {
        const { secretKey, publicKey } = paystackPublicAndSecretKeys;
        Meteor.subscribe("Packages", Reaction.getShopId());
        const paymentPackages = Packages.findOne({
          name: "paystack-paymentmethod",
          shopId: Reaction.getShopId()
        });
        const cart = Cart.findOne().getTotal();
        const amount = Math.round(cart * 100);
        const template = this.template;
        const payload = {
          key: publicKey,
          name: val.payerName,
          email: val.payerEmail,
          reference: Random.id(),
          amount,
          callback(response) {
            const reference = response.reference;
            if (reference) {
              Paystack.confirm(reference, secretKey, (err, res) => {
                if (err) {
                  paystackSubmitError(error);
                  uiEnd(template, "Resubmit payment");
                } else {
                  const transactionDetails = res.data;
                  submitting = false;
                  const paymentMethod = {
                    processor: "Paystack",
                    paymentPackageId: paymentPackages._id,
                    paymentSettingsKey: paymentPackages.registry[0].settingsKey,
                    cardType: transactionDetails.authorization.card_type,
                    method: "credit",
                    transactionId: transactionDetails.reference,
                    currency: transactionDetails.currency,
                    amount: transactionDetails.amount,
                    status: transactionDetails.status,
                    mode: "authorize",
                    createdAt: new Date(),
                    transactions: []
                  };
                  Alerts.toast("Transaction successful");
                  paymentMethod.transactions.push(transactionDetails.authorization);
                  Meteor.call("cart/submitPayment", paymentMethod);
                }
              });
            }
          },
          onClose() {
            uiEnd(template, "Resubmit payment");
          }
        };
        try {
          PaystackPop.setup(payload).openIframe();
          submitting = false;
        } catch (err) {
          paystackSubmitError(err);
          uiEnd(template, "Complete payment");
        }
      }
    });
    return false;
  },
  beginSubmit() {
    this.template.$(":input").attr("disabled", true);
    this.template.$("#btn-complete-order").text("Submitting ");
    return this.template.$("#btn-processing").removeClass("hidden");
  },
  endSubmit() {
    if (!submitting) {
      return uiEnd(this.template, "Complete your order");
    }
  }
});
