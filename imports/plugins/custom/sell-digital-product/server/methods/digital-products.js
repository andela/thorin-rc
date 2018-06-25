import { Meteor } from "meteor/meteor";
import { DigitalProducts } from "../../lib/collections";
import { check } from "meteor/check";

Meteor.methods({
  "upsertDigitalProduct"(modifier) {
    check(modifier, Object);
    if (!modifier.uploadSuccess) {
      return DigitalProducts.upsert({
        productId: modifier.productId
      }, {
        $set: {
          productId: modifier.productId,
          isDigital: modifier.isDigital
        }
      });
    } else if (modifier.uploadSuccess) {
      return DigitalProducts.upsert({
        productId: modifier.productId
      }, {
        $set: {
          productId: modifier.productId,
          productTitle: modifier.productTitle,
          isDigital: modifier.isDigital,
          fileUrl: modifier.fileUrl,
          bytes: modifier.bytes
        }
      });
    }
  }
});
