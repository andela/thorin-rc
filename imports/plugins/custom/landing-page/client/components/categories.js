import React, { Component } from "react";
import { slugify } from "transliteration";

const categories = [
  {
    category: "Fashion",
    subCategories: ["Shoes", "Bags", "Sunglasses", "Watches", "Hats", "Sneakers", "Clothes"]
  },
  {
    category: "Tech",
    subCategories: ["Monitors", "Phones", "Laptops", "Television", "Headsets", "Tablets"]
  },
  {
    category: "Digital Products",
    subCategories: ["Music", "E-books", "Audio Books", "Pictures", "Digital Arts", "Blueprints"]
  },
  {
    category: "Home",
    subCategories: ["Furniture", "Blenders", "Lamps"]
  },
  {
    category: "Sports",
    subCategories: ["Sportswear"]
  },
  {
    category: "Games and Toys",
    subCategories: ["Games", "Toys"]
  }
];

class Categories extends Component {
    renderSubCategory = (subcategory) => (
      <li key={subcategory}>
        <a href={`/tag/${slugify(subcategory)}`}><i className="fa fa-chevron-circle-right" /> {subcategory}</a>
      </li>
    );

    renderCategories = ({ category, subCategories }) => (
      <div className="list-group-item" key={category}>
        <a href={`#${slugify(category)}`} data-toggle="collapse"><i className="fa fa-chevron-circle-right" /> { category } </a>
        <ul id={slugify(category)} className="collapse">
          <li><a href={`/tag/${slugify(category)}`}><i className="fa fa-chevron-circle-right" /> All</a></li>
          { subCategories.map(subCategory => this.renderSubCategory(subCategory)) }
        </ul>
      </div>
    );

    render() {
      return (
        <div className="list-group">
          { categories.map(category => this.renderCategories(category)) }
        </div>
      );
    }
}

export default Categories;

