import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * Digital product Schema
 */

export const DigitalProduct = new SimpleSchema({
  productId: {
    type: String,
    optional: false
  },
  productTitle: {
    type: String,
    optional: true
  },
  isDigital: {
    type: Boolean,
    optional: false,
    defaultValue: true
  },
  fileUrl: {
    type: String,
    optional: true,
    defaultValue: "link doesn't exist"
  },
  bytes: {
    type: String,
    optional: true,
    defaultValue: "O"
  }
});

registerSchema("DigitalProduct", DigitalProduct);
