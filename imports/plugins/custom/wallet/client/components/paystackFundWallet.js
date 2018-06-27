import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { $ } from "meteor/jquery";
import { Reaction } from "/client/api";
import { Template } from "meteor/templating";
import { Accounts } from "/lib/collections";
import { Paystack } from "../../../../custom/paystack-payment/lib/api";

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
export const paystackFundWallet = (amount) => {
  return new Promise((resolve, reject) => {
    const user = Meteor.user();
    const template = Template.instance();
    Meteor.call("paystack/loadPaystackApiKeys", (error, paystackPublicAndSecretKeys) => {
      if (error) {
        throw new Meteor.Error("Failed to load paystack keys");
      }
      if (paystackPublicAndSecretKeys) {
        const { secretKey, publicKey } = paystackPublicAndSecretKeys;
        Meteor.subscribe("Packages", Reaction.getShopId());
        const email = Accounts.findOne({ userId: user._id }).emails[0].address;
        const payload = {
          key: publicKey,
          amount,
          email,
          reference: Random.id(),
          callback(response) {
            const { reference } = response;
            if (reference) {
              Paystack.confirm(reference, secretKey, (err, res) => {
                if (err) {
                  paystackSubmitError(error);
                  uiEnd(template, "Resubmit payment");
                } else {
                  resolve(res.data);
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
        } catch (err) {
          reject(paystackSubmitError(err));
          uiEnd(template, "Complete payment");
        }
      }
    });
  });
};

