import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Transaction } from "../../lib/collections";

Meteor.methods({
  "transaction/create"(userId, amount, walletId, transactionType) {
    check(userId, String);
    check(amount, Number);
    check(walletId, Number);
    check(transactionType, String);

    const transaction = Transaction.insert({
      userId,
      amount,
      walletId,
      transactionType,
      createdAt: new Date()
    });
    return transaction;
  },
  "transaction/get"(userId) {
    check(userId, String);
    const transaction = Transaction.find({
      userId
    }).fetch();
    return transaction;
  }
});

