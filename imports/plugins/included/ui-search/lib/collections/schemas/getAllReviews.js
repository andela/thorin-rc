import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const AllReviews = new SimpleSchema({
  avgRating: {
    type: Number,
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

registerSchema("AllReviews", AllReviews);
