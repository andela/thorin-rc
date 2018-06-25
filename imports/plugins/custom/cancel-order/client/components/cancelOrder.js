import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";


import "../style/style.css";

class CancelOrderComponent extends Component {
  difference = () => {
    const timeExpended = Math.abs(new Date() - this.props.order.createdAt) / 1000;
    return timeExpended;
  }

  isDigital = (id) => {
    Meteor.call("findDigitalProduct", id, (err, data) => {
      return data;
    });
  }
  confirmAction = () => {
    let digitalItems;
    let itemLength = 0;

    const { _id, items } = this.props.order;
    const item = this.props.order.items.map((product) => {
      const { variants: { price } } = product;
      const it = Meteor.call("findDigitalProduct", product.productId);
      console.log(it);

      // if ((this.isDigital(product.productId) !== '')) {
      //   console.log(this.isDigital(product.productId));
      //   itemLength += 1;
      //   digitalItems += price;
      //   console.log(itemLength, digitalItems)
      // }
    });


    //   const { product: { isDigital }, variants: { price } } = product;
    //   if (isDigital) {
    //     digitalItems += price;
    //     itemLength += 1;
    //     console.log('@@@@@@@@@@@@@@@@@')
    //     return digitalItems;
    //   }
    //   return digitalItems;
    // });
    if (itemLength === items.length) {
      Alerts.toast("Digital products order cannot be cancelled", "error");
    } else {
      const deduction = this.deduction(digitalItems);
      Alerts.alert({
        title: "Cancel Order",
        type: "info",
        html:
          "Are you sure you want to cancel this order" +
          `<h2>#${deduction}</h2> will be deducted from the amount you paid!`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true
      }).then(() => {
        this.cancelOrder();
      });
    }
  }

  cancelOrder = () => {
    let digitalItems = 0;
    const { _id, items } = this.props.order;
    const item = items.map((product, index) => {
      const { variants: { price } } = product;
      if (this.isDigital(product.productId)) {
        digitalItems += price;
        return digitalItems;
      }
      Meteor.call("deleteOrderItem", _id, index, (err) => {
        if (err) alert('@@@@@@@@@@@@@@@')
      });
    });
    // this.refundPayment(digitalItems);
  }

  deduction = (data) => {
    const { shipping } = this.props.order.billing[0].invoice;
    let deduct = 0 + data;
    const difference = this.difference();
    if (difference > 86400) deduct = shipping;
    return deduct;
  }

  notify = (messageType) => {
    const userId = Meteor.user()._id;
    const type = messageType;
    const url = "/account/wallet";
    const sms = false;
    Meteor.call("notification/send", userId, type, url, sms);
  }

  updateTransactionDetails = (wallet) => {
    const { subtotal } = this.props.order.billing[0].invoice;
    const userId = Meteor.user()._id;
    const refund = Number(subtotal);
    Meteor.call("transaction/create", userId, refund, wallet, "Refund", () => {
      this.notify("refund");
    });
  }

  refundPayment = (nonRefund) => {
    Meteor.call("wallet/get", Meteor.user()._id, (err, payload) => {
      const { subtotal } = this.props.order.billing[0].invoice;
      const deductedAmount = this.deduction(nonRefund);
      const amountPaid = Number(subtotal);
      const amount  = amountPaid - deductedAmount + payload.balance;
      Meteor.call("wallet/updateAmount", payload._id, amount, (error, res) => {
        if (res) {
          this.notify("orderCanceled");
          this.updateTransactionDetails(payload.walletId);
          Alerts.toast("The order is cancelled and your wallet have been refunded", "success");
        } else {
          Alerts.toast("Something went wrong", "error");
        }
      });
    });
  }
  render() {
    return (
      <input
        type="button"
        value="Cancel Order"
        className="btn btn-danger"
        onClick={this.confirmAction}
      />
    );
  }
}
registerComponent("CancelOrderComponent", CancelOrderComponent);
export default CancelOrderComponent;
