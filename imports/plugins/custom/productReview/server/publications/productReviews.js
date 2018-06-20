import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../lib/collections";

Meteor.publish("Reviews", function (productName) {
  check(productName, String);
  if (Meteor.isServer) {
    return Reviews.find(
      {
        productName
      },
    );
  }
});
