import React, { Component } from "react";
import { slugify } from "transliteration";
import { formatPriceString } from "/client/api";

const flashDeals = [
  { imageUrl: "resources/images/shirt.jpeg",
    product: "Plaid Shirt",
    oldPrice: 5000, newPrice: 3000
  },
  { imageUrl: "resources/images/flash-watch.jpg",
    product: "Apple Watch",
    oldPrice: 6000, newPrice: 2000
  },
  { imageUrl: "resources/images/purse.jpg",
    product: "Dolce and Gabanna Clutch",
    oldPrice: 1000, newPrice: 300
  },
  { imageUrl: "resources/images/red-shoe.jpg",
    product: "Suzzane Badoski Heels",
    oldPrice: 15000, newPrice:
  10000 }
];

class FlashDeals extends Component {
  renderFlashDeals = ({ imageUrl, oldPrice, newPrice, product }) => (
    <div className="flash-item" key={slugify(product)}>
      <div className="flash-image" style={{ backgroundImage: `url('${imageUrl}')` }} />
      <a href={`/product/${slugify(product)}`}><span className=""><strong><p>{ product }</p></strong></span></a>
      <p>{formatPriceString(newPrice)}</p>
      <p className="old-price">{formatPriceString(oldPrice)}</p>
    </div>
  );

  render() {
    return (
      <div className="container">
        <h2 className="flash-text">Flash Deals Up to 20% Off</h2>
        <div className="row first-row">
          <div className="col-md-12 col-lg-9">
            <div className="flash">
              {flashDeals.map((flashDeal) => this.renderFlashDeals(flashDeal))}
            </div>
          </div>
          <div className="col-lg-3 hidden-md hidden-xs hidden-sm music-div">

            <div style={{ backgroundImage: "url('/resources/images/digital-art.png')" }}>
              <span><a href="/tag/digital-arts"><strong>Digital Arts</strong></a></span>
            </div>
            <div style={{ backgroundImage: "url('/resources/images/e-books.jpg')" }}>
              <span><a href="/tag/audio-books"><strong>Audio books</strong></a></span>
            </div>
            <div style={{ backgroundImage: "url('/resources/images/music.jpg')" }}>
              <span><a href="/tag/music"><strong>Music</strong></a></span>
            </div>
            <div style={{ backgroundImage: "url('/resources/images/blueprint.jpg')" }}>
              <span><a href="/tag/blue-prints"><strong>Blue Prints</strong></a></span>
            </div>
            <span className="digital-button"><a href="/tags/digital-products"><span>Digital Products <i className="fa fa-chevron-right" />
            </span></a></span>
          </div>
        </div>
      </div>
    );
  }
}

export default FlashDeals;
