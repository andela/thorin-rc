import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { registerComponent, composeWithTracker } from "/imports/plugins/core/components/lib";
import { Products, Media, Tags } from "/lib/collections";
import { formatPriceString } from "/client/api";

class FeaturedProducts extends Component {
  renderProduct = (product, spanClass, divClass) =>  {
    const backgroundStyle = product.productMedia ?
      { backgroundImage: `url(${product.productMedia.url({ store: "small" })})` }
      : { backgroundImage: "url('/resources/placeholder.gif')" };

    return (
      <span className={spanClass} style={backgroundStyle}
        key={product.product.title}
      >
        <div className={`product-details ${divClass}`}><a href={`/product/${product.product.handle}`}><strong>
          <p>{product.product.title}</p></strong></a>
        <p>{formatPriceString(product.product.price.max)}</p>
        </div>
      </span>
    );
  }

  renderProducts = (tagProducts) => {
    if (!tagProducts) return (<h3> No Products Found</h3>);
    return (
      <div key={tagProducts.tag.name}>
        <div className="product-grids">

          <div className="product">
            {tagProducts.products.slice(0, 2).map(product => this.renderProduct(product, "product-img", ""))}
          </div>
          <div className="product">
            {tagProducts.products.slice(2, 4).map(product => this.renderProduct(product, "product-img", ""))}
          </div>

        </div>
        <h3 className="more-to-love-tag"><a href={`/tag/${tagProducts.tag.slug}`}>{tagProducts.tag.name} </a>
          <i className="fa fa-chevron-right" /></h3>
      </div>
    );
  }


  renderMoreToLove = (tagProducts) => {
    if (!tagProducts) return (<h3>No Products Found</h3>);
    return (
      <div key={tagProducts.tag.name}>
        {tagProducts.products.map(product => this.renderProduct(product, "more-img-div absolute-div",
          "margin-more"))}
        <span className="tag-container">
          <h3 className="more-to-love-tag"><a href={`/tag/${tagProducts.tag.slug}`}>{tagProducts.tag.name} </a>
            <i className="fa fa-chevron-right" /></h3>
        </span>
      </div>
    );
  }


  render() {
    return (
      <div>
        <div className="container">
          <h2 className="flash-text">Products You Would Love</h2>
          <div className="products-we-love">
            { this.props.productsToLove && this.props.productsToLove.map(product => this.renderProducts(product)) }
          </div>
        </div>
        <hr className="divider" />


        <div className="container more-to-love">
          <h2 className="flash-text">More To Love</h2>
          <div className="product">
            { this.props.moreToLove && this.props.moreToLove.map((product) => this.renderMoreToLove(product)) }

          </div>
        </div>
      </div>
    );
  }
}

const getTagsWithProducts = (tags, limit) => {
  const tagProducts = [];
  tags.map((tag) => {
    const products = Products.find({
      hashtags: tag._id
    }, { limit }).fetch();

    products.map((product, index) => {
      const media = Media.findOne({
        "metadata.productId": product._id,
        "metadata.toGrid": 1
      }, {
        sort: { "metadata.priority": 1, "uploadedAt": 1 }
      });

      const productMedia = media instanceof FS.File ? media : false;

      products[index] = {
        product,
        productMedia
      };
    });

    tagProducts.push({
      tag,
      products
    });
  });

  return tagProducts;
};
const composer = (props, onData) => {
  const subscription = Meteor.subscribe("Products");
  if (subscription.ready()) {
    const productsToLoveTags = Tags.find({
      name: { $in: ["Tech", "Fashion", "Home"] }
    }).fetch();
    const moreToLoveTags = Tags.find({
      name: { $in: ["E-books", "Games and toys", "Sports"] }
    }).fetch();

    const productsToLove = getTagsWithProducts(productsToLoveTags, 4);
    const moreToLove = getTagsWithProducts(moreToLoveTags, 1);

    onData(null, { productsToLove, moreToLove });
  }
};

registerComponent("FeaturedProducts", FeaturedProducts, composeWithTracker(composer));

FeaturedProducts.PropTypes = {
  productsToLove: PropTypes.array,
  moreToLove: PropTypes.array
};

export default compose(composeWithTracker(composer))(FeaturedProducts);
