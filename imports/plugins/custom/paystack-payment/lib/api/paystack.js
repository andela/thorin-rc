import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";

export const Paystack = {
  accountOptions: function () {
    const settings = Packages.findOne({
      name: "reaction-paymentmethod"
    }).settings;
    if (!settings.publicKey) {
      throw new Meteor.Error("403", "Invalid Credentials");
    }
    return {
      publicKey: settings.publicKey
    };
  },

  authorize: function (cardInfo, paymentInfo, callback) {
    Meteor.call("paystackSubmit", "authorize", cardInfo, paymentInfo, callback);
  },

  confirm: (reference, secretKey, callback) => {
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const headers = new Headers({
      "Authorization": `Bearer ${secretKey}`,
      "Content-Type": "application/json"
    });
    fetch(url, {
      headers
    })
      .then(res => res.json())
      .then(response => {
        if (response.status) {
          callback(null, response);
        } else {
          callback(response, null);
        }
      });
  }
};
