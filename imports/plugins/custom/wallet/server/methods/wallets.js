import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Wallets } from "../../lib/collections";

Meteor.methods({
  "wallet/create"(userId, balance, walletId) {
    check(userId, String);
    check(balance, Number);
    check(walletId, Number);

    const wallets = Wallets.insert({
      userId,
      balance,
      walletId,
      createdAt: new Date()
    });
    return wallets;
  },
  "wallet/get"(userId) {
    check(userId, String);
    const walletDetails = Wallets.find({
      userId
    }).fetch();
    return walletDetails[0];
  },
  "wallet/updateAmount"(id, balance) {
    check(id, String);
    check(balance, Number);
    Wallets.update({ _id: id }, { $set: { balance: balance } });
    return true;
  },
  "wallet/toWallet"(walletId, amount) {
    check(walletId, Number);
    check(amount, Number);
    const done =  Wallets.update({ walletId: walletId }, { $inc: { balance: (+1 * amount) } });
    return done;
  },
  "wallet/findUser"(walletId) {
    check(walletId, Number);
    const user = Wallets.find({ walletId }).fetch();
    return user[0];
  }
});
