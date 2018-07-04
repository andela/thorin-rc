/*eslint-disable */
import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";
import { check } from "meteor/check";

Meteor.methods({
  productInventory: (data) => {
    check(data, Object);
    check(data.searchItem, String);

    return Collections.Products.find({
      $and: [{
        type: "variant",
        title: {
          $regex: data.searchTerm,
          $options: "i"
        }
      }]
    }).fetch();
  },

  productInventoryResult: () => {
    return Collections.Products.find({
      $and: [{
        type: "variant"
      }]
    }).fetch();
  }

});
