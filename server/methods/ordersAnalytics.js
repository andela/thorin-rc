import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import * as Collections from "/lib/collections";

Meteor.methods({
  ordersAnalytics: (value) => {
    check(value, Object);

    return Collections.Orders.find({
      createdAt: {
        $gte: new Date(value.fromDate),
        $lte: new Date(value.toDate)
      }
    }).fetch();
  }
});
