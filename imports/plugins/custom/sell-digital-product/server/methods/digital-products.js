import { Meteor } from "meteor/meteor";
import { Orders } from "/lib/collections";
import { Accounts } from "/lib/collections";
import { SSR } from "meteor/meteorhacks:ssr";
import { Logger, Reaction } from "/server/api";
import { DigitalProducts } from "../../lib/collections";
import { check } from "meteor/check";

Meteor.methods({
  "upsertDigitalProduct"(modifier) {
    check(modifier, Object);
    if (!modifier.uploadSuccess) {
      return DigitalProducts.upsert({
        productId: modifier.productId
      }, {
        $set: {
          productId: modifier.productId,
          isDigital: modifier.isDigital
        }
      });
    } else if (modifier.uploadSuccess) {
      return DigitalProducts.upsert({
        productId: modifier.productId
      }, {
        $set: {
          productId: modifier.productId,
          productTitle: modifier.productTitle,
          isDigital: modifier.isDigital,
          fileUrl: modifier.fileUrl,
          bytes: modifier.bytes
        }
      });
    }
  },

  "mailDigitalProducts"(cartId) {
    check(cartId, String);

    const currentOrder = Orders.findOne({
      cartId: cartId
    });

    const orderItems = currentOrder.items;
    const user = Accounts.findOne(Meteor.userId());
    const email = user.emails[0].address;

    orderItems.forEach((item) => {
      const product = DigitalProducts.findOne({
        productId: item.productId, isDigital: true
      });

      if (product !== undefined) {
        Logger.info("MAILING DIGITAL PRODUCT");
        const tpl = "orders/downloadDigitalProduct";
        SSR.compileTemplate(tpl, Reaction.Email.getTemplate(tpl));

        Reaction.Email.send({
          to: email,
          from: `${"Reaction Commerce"} <${"development@email.com"}>`,
          subject: `Download ${item.title}`,
          html: SSR.render(tpl, {
            name: user.name,
            productTitle: item.title,
            fileUrl: product.fileUrl,
            fileSize: product.bytes / 1000000
          })
        });
      }
    });
  },

  "findDigitalProduct"(productId) {
    check(productId, String);

    const product = DigitalProducts.findOne({
      productId: productId, isDigital: true
    });

    if (product !== undefined) {
      return product;
    }
    return "";
  }
});
