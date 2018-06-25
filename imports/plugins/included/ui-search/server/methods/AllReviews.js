import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import * as Collections from "/lib/collections";

Meteor.methods({
  "update/productSearchWithRating"(productName, avgRating = 0) {
    check(productName, String);
    check(avgRating || 0, Number);

    const product = Collections.ProductSearch.findOne({
      handle: productName
    });

    const values = {
      handle: productName,
      avgRating: parseInt(avgRating, 10)
    };
    let saveData;

    if (product) {
      saveData = Collections.ProductSearch.update(
        { handle: productName },
        { $set: values }
      );
    }
    return saveData;
  }
});
