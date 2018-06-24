import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";


import "../style/style.css";

class CancelOrderComponent extends Component {
  difference = () => {
    const timeExpended = Math.abs(new Date() - this.props.order.createdAt) / 1000;
    return timeExpended;
  }

  confirmAction = () => {
    const deduction = this.deduction();   
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

  cancelOrder = () => {
    const { _id } = this.props.order;
    Meteor.call("deleteOrder", _id);
    this.refundPayment();
  }

  deduction = () => {
    const { shipping } = this.props.order.billing[0].invoice;
    let deduct = 0;
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

  refundPayment = () => {
    Meteor.call("wallet/get", Meteor.user()._id, (err, payload) => {
      const { subtotal } = this.props.order.billing[0].invoice;
      const deductedAmount = this.deduction();
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
