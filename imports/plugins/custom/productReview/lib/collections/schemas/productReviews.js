import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const Review = new SimpleSchema({
  rating: {
    type: Number,
    optional: false
  },
  review: {
    type: String,
    optional: false
  },
  userEmail: {
    type: String,
    optional: false
  },
  productName: {
    type: String,
    optional: false
  },
  createdAt: {
    type: Date,
    optional: false
  }
});

registerSchema("Review", Review);
