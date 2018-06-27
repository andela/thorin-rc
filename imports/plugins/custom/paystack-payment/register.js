/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "PaystackPayment",
  name: "paystack-paymentmethod",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    "mode": false,
    "publicKey": "",
    "paystack": {
      enabled: false
    },
    "paystack-paymentmethod": {
      enabled: false,
      support: [
        "Authorize",
        "Capture",
        "Refund"
      ]
    }
  },
  registry: [
    // Settings panel
    {
      label: "Paystack Payment", // this key (minus spaces) is used for translations
      provides: ["paymentSettings"],
      container: "dashboard",
      template: "paystackSettings"
    },

    // Paystack Payment form used during checkout
    {
      template: "paystackPaymentForm",
      provides: ["paymentMethod"],
      icon: "fa fa-credit-card-alt"
    }
  ]
});
