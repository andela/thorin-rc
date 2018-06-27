import { Meteor } from "meteor/meteor";
import { OrdersCanceled } from "../../lib/collections";
import { check } from "meteor/check";

Meteor.methods({
  "insertCanceledOrder"(data) {
    check(data, Object);
    const canceledOrder = OrdersCanceled.insert({
      product: data._id,
      createdAt: new Date()
    });
    return canceledOrder;
  },
  "getCanceledOrders"() {
    const canceledOrderLength = OrdersCanceled.find({});
    return canceledOrderLength;
  }
});
