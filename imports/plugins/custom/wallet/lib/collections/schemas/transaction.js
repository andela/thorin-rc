import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const Transaction = new SimpleSchema({
  userId: {
    type: String,
    optional: false
  },
  amount: {
    type: Number,
    optional: false
  },
  walletId: {
    type: Number,
    optional: false
  },
  transactionType: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: false
  }
});

registerSchema("Transaction", Transaction);
