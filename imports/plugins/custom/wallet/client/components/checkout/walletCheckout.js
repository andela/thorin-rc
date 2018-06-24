import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Random } from "meteor/random";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import "./walletCheckout.html";
import "../../style/style.css";
import { Cart, Shops, Packages } from "/lib/collections";

class WalletCheckout extends Component {
    state = {
      balance: "",
      walletId: "",
      price: Number(Cart.findOne().getTotal()),
      id: ""
    }

    componentDidMount() {
      this.getWalletDetails();
    }

    getWalletDetails = () => {
      Meteor.call("wallet/get", Meteor.user()._id, (err, payload) => {
        this.setState({
          balance: payload.balance,
          walletId: payload.walletId,
          id: payload._id
        });
      });
    }

    pay = (e) => {
      e.preventDefault();
      const amount = this.state.price;
      if (amount > this.state.balance) {
        Alerts.toast("Insufficient fund!!. Fund Your Wallet and try again", "error");
      } else {
        this.processPayment();
      }
    }

    processPayment = () => {
      const currency = Shops.findOne().currency;
      const packageData = Packages.findOne({
        name: "wallet",
        shopId: Reaction.getShopId()
      });
      Alerts.alert({
        title: `₦${this.state.price} will be deducted from your wallet`,
        type: "warning",
        html: "<h2>Order cannot be canceled for digital products</h2>",
        showCancelButton: true,
        confirmButtonText: "Confirm"
      }, (remove) => {
        if (remove) {
          const checkOut = {
            processor: "Wallet",
            method: "credit",
            paymentPackageId: packageData._id,
            paymentSettingsKey: packageData.registry[0].settingsKey,
            transactionId: Random.id(),
            currency,
            amount: this.state.price,
            status: "success" || "passed",
            mode: "authorize",
            createdAt: new Date(),
            transactions: []
          };
          Meteor.call("cart/submitPayment", checkOut);
          const transactionType = "Purchase";
          const userId = Meteor.user()._id;
          const walletId = this.state.walletId;
          const amount = this.state.price;
          Meteor.call("transaction/create", userId, Math.floor(amount.toFixed(2)), walletId, transactionType);
          Alerts.toast("Payment Suucesful", "success");
          this.walletToWallet();
        }
      });
    }

    walletToWallet = () => {
      const newBlanace = Number(this.state.balance) - this.state.price;
      Meteor.call("wallet/updateAmount", this.state.id, Math.floor(newBlanace.toFixed(2)), (err, payload) => {
        if (payload === true) {
          this.setState({ balance: newBlanace });
          const NotifcationId = Meteor.user()._id;
          const type = "payment";
          const url = "/account/wallet";
          const sms = false;
          Meteor.call("notification/send", NotifcationId, type, url, sms);
        } else {
          Alerts.toast("Somthing went wrong", "error");
        }
      });
    }

    render() {
      return (
        <div>
          <h2>Pay With Wallet</h2>
          <h3>Your Balance is N{this.state.balance} </h3>
          <button className="but btn-lg"
            type="button"
            data-toggle="modal"
            data-target="#myModal"
            onClick={this.pay}
          >
          Confirm Order
          </button>
        </div>
      );
    }
}


export default WalletCheckout;

Template.walletCheckout.helpers({
  walletCheckout() {
    return {
      component: WalletCheckout
    };
  }
});

