import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const PaystackPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.mode": {
      type: Boolean,
      defaultValue: true
    },
    "settings.secretKey": {
      type: String,
      label: "SECRET Key",
      optional: true
    },
    "settings.publicKey": {
      type: String,
      label: "PUBLIC Key",
      optional: true
    }
  }
]);

registerSchema("PaystackPackageConfig", PaystackPackageConfig);

export const PaystackPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "Cardholder name"
  },
  payerEmail: {
    type: String,
    label: "Cardholder email"
  }
});

registerSchema("PaystackPayment", PaystackPayment);
