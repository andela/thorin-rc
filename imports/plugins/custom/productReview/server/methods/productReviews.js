import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../lib/collections";
import { Orders } from "lib/collections";

Meteor.methods({
  "review/create"(rating, review, userEmail, productName) {
    check(rating, Number);
    check(review, String);
    check(userEmail, String);
    check(productName, String);

    const reviews = Reviews.insert({
      rating,
      review,
      userEmail,
      productName,
      createdAt: new Date()
    });
    return reviews;
  },
  "reviews/average"(productName) {
    check(productName, String);
    let result = Reviews.aggregate([
      {
        $match: {
          productName
        }
      },
      {
        $group: {
          _id: "$productName",
          averageRate: { $avg: "$rating" }
        }
      }
    ]);
    if (result === undefined) {
      result = [0, 0];
    }
    return result[0].averageRate;
  },
  "reviews/isPurchased"(productId) {
    check(productId, String);

    const order = Orders.findOne({
      "userId": Meteor.userId(),
      "items.productId": productId
    });
    if (order === undefined) {
      return false;
    }
    return true;
  }
});
