import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const OrdersCanceled = new SimpleSchema({
  product: {
    type: String,
    optional: false
  },
  createdAt: {
    type: Date,
    optional: false
  }
});

registerSchema("OrdersCanceled", OrdersCanceled);
