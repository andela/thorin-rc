import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import "../style/style.css";

class CancelOrderComponent extends Component {
  difference = () => {
    const timeExpended = Math.abs(new Date() - this.props.order.createdAt) / 1000; //eslint-disable-line
    return timeExpended;
  }

  deduction = (digitalProductCost) => {
    const { shipping } = this.props.order.billing[0].invoice; //eslint-disable-line
    let deduct;
    if (digitalProductCost) {
      deduct = 0 + digitalProductCost;
    } else {
      deduct = 0;
    }
    const difference = this.difference();
    if (difference > 100) deduct = deduct + Number(shipping);
    return deduct;
  }

  confirmAction = () => {
    let digitalItems = 0;
    let itemLength = 0;
    const { shipping } = this.props.order.billing[0].invoice; //eslint-disable-line
    const { items } = this.props.order; //eslint-disable-line
    this.props.order.items.map((product) => { //eslint-disable-line
      const {
        product: { isDigital }, variants: { price }, quantity
      } = product;
      if (isDigital) {
        digitalItems += price * quantity;
        itemLength += 1;
        return digitalItems;
      }
      return digitalItems;
    });
    const deductionTable = `<table class="deduction-table"><tbody>
      <tr>
        <td>Expenses</td>
        <td>Cost</td>
      </tr>
      <tr>
        <td>Digital Product</td>
        <td>${digitalItems}</td>
      </tr>
      <tr>
        <td>Shipping</td>
        <td>${shipping}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>${digitalItems + Number(shipping)}</td>
      </tr>
    </tbody></table>`;
    if (itemLength === items.length) {
      Alerts.toast("Digital products order cannot be cancelled", "error");
    } else {
      Alerts.alert({
        title: "Cancel Order",
        type: "info",
        html:
          "Are you sure you want to cancel this order" +
          `<div class="text-center"> ${deductionTable} </div> <h2>NGN${digitalItems + Number(shipping)}</h2> will be deducted from the amount you paid!`, //eslint-disable-line
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
    let isDigitalProduct = false;
    const { _id, items } = this.props.order; //eslint-disable-line
    items.map((product) => {
      const {
        product: { isDigital }, variants: { price }, quantity
      } = product;
      if (isDigital) {
        digitalItems += price * quantity;
        isDigitalProduct = isDigital;
        return digitalItems;
      }
      Meteor.call("deleteOrderItem", _id, product._id, (err) => {
        if (err) return Alerts.alert("Something went wrong");
        Meteor.call("insertCanceledOrder", product);
      });
    });
    if (!isDigitalProduct) {
      Meteor.call("deleteOrder", _id, (err) => {
        if (err) return Alerts.alert("Something went wrong");
      });
    }
    this.refundPayment(digitalItems);
  }

  notify = (messageType) => {
    let userId;
    if (messageType === "orderIsCanceled") userId = this.getAdminUserId();
    userId = Meteor.user()._id;
    const type = messageType;
    const url = "/account/wallet";
    const sms = false;
    Meteor.call("notification/send", userId, type, url, sms);
  }

  updateTransactionDetails = (wallet, amount) => {
    const userId = Meteor.user()._id;
    Meteor.call("transaction/create", userId, amount, wallet, "Refund", () => {
      this.notify("refund");
    });
  }

  refundPayment = (nonRefund) => {
    Meteor.call("wallet/get", Meteor.user()._id, (err, payload) => {
      const { subtotal } = this.props.order.billing[0].invoice; //eslint-disable-line
      const deductedAmount = this.deduction(nonRefund);
      const amountPaid = Number(subtotal);
      const amount  = amountPaid - deductedAmount + payload.balance;
      Meteor.call("wallet/updateAmount", payload._id, amount, (error, res) => {
        if (res) {
          this.notify("orderCanceled");
          this.updateTransactionDetails(payload.walletId, amountPaid - deductedAmount);
          Alerts.toast("The order is cancelled and your wallet have been refunded", "success"); //eslint-disable-line
        } else {
          Alerts.toast("Something went wrong", "error");
        }
      });
    });
  }
  render() {
    const { items } = this.props.order; //eslint-disable-line
    let digitalProduct;
    if (items.length === 1) {
      const { isDigital } = items[0].product;
      digitalProduct = isDigital;
    }
    const passedTime = this.difference() > 172800;
    const showCancelButton = passedTime || digitalProduct;
    return (
      <div>
        { showCancelButton ? "" :
          <input
            type="button"
            value="Cancel Order"
            className="btn btn-danger mt-2"
            onClick={this.confirmAction}
          />
        }
      </div>
    );
  }
}
registerComponent("CancelOrderComponent", CancelOrderComponent);
export default CancelOrderComponent;
