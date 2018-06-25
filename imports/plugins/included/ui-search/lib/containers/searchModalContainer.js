import React, { Component } from "react";
import { compose } from "recompose";
import _ from "lodash";
import { Reaction } from "/client/api";
import { registerComponent } from "@reactioncommerce/reaction-components";
import SearchSubscription from "./searchSubscription";

function tagToggle(arr, val) {
  if (arr.length === _.pull(arr, val).length) {
    arr.push(val);
  }
  return arr;
}

const wrapComponent = (Comp) => (
  class SearchModalContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collection: "products",
        value: localStorage.getItem("searchValue") || "",
        renderChild: true,
        facets: [],
        minPrice: 0,
        maxPrice: 10000000,
        createdAt: "",
        vendor: "",
        isVendor: false,
        sortBy: {},
        sortValue: "",
        vendors: [],
        rate: 5
      };
    }

    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        this.setState({
          renderChild: false
        });
      }
    }

    handleSelectPrice = event => {
      const priceRange = event.target.value;
      const splitPriceRange = priceRange.split(" - ");
      localStorage.setItem("isFiltered", true);
      this.setState({
        minPrice: parseInt(splitPriceRange[0], 10),
        maxPrice: parseInt(splitPriceRange[1], 10)
      });
    }

    handleSelectVendor = (event) => {
      localStorage.setItem("isFiltered", true);
      const vendor = event.target.value;
      if (vendor !== "vendor") {
        this.setState({
          vendor,
          isVendor: true
        });
      } else {
        this.setState({
          vendor,
          isVendor: false
        });
      }
    }

    handleSelectRating = (event) => {
      this.setState({
        rate: parseInt(event.target.value, 10)
      });
    }

    handleSelectSort = (event) => {
      const value = event.target.value;
      switch (value) {
        case "Lowest-Price":
          this.setState({ sortBy: { "price.min": 1  } });
          break;
        case "Highest-Price":
          this.setState({ sortBy: { "price.max": -1 } });
          break;
        case "New-Arrival":
          this.setState({ sortBy: { createdAt: -1 } });
          break;
        case "Highest Ratings":
          this.setState({ sortBy: { avgRating: -1 } });
          break;
        case "Lowest Ratings":
          this.setState({ sorBy: { avgRating: 1 } });
          break;
        default:
          this.setState({ sortBy: {} });
          break;
      }
    }

    handleChange = (event, value) => {
      localStorage.setItem("searchValue", value);

      this.setState({
        value,
        minPrice: 0,
        maxPrice: 10000000,
        vendor: ""
      });
    }

    handleClick = () => {
      localStorage.setItem("searchValue", "");
      this.setState({ value: "" });
    }

    handleAccountClick = (event) => {
      Reaction.Router.go("account/profile", {}, { userId: event._id });
      this.handleChildUnmount();
    }

    handleTagClick = (tagId) => {
      const newFacet = tagId;
      const element = document.getElementById(tagId);
      element.classList.toggle("active-tag");

      this.setState({
        facets: tagToggle(this.state.facets, newFacet)
      });
    }

    handleToggle = (collection) => {
      this.setState({ collection });
    }

    handleChildUnmount = () =>  {
      this.setState({ renderChild: false });
    }

    render() {
      return (
        <div>
          {this.state.renderChild ?
            <div className="rui search-modal js-search-modal">
              <Comp
                handleChange={this.handleChange}
                handleClick={this.handleClick}
                handleToggle={this.handleToggle}
                handleAccountClick={this.handleAccountClick}
                handleTagClick={this.handleTagClick}
                value={this.state.value}
                unmountMe={this.handleChildUnmount}
                searchCollection={this.state.collection}
                facets={this.state.facets}
                handleSelectPrice={this.handleSelectPrice}
                handleSelectVendor={this.handleSelectVendor}
                handleSelectSort={this.handleSelectSort}
                handleSelectRating={this.handleSelectRating}
                minPrice={this.state.minPrice}
                maxPrice={this.state.maxPrice}
                vendor={this.state.vendor}
                isVendor={this.state.isVendor}
                sortBy={this.state.sortBy}
                rate={this.state.rate}
              />
            </div> : null
          }
        </div>
      );
    }
  }
);

registerComponent("SearchSubscription", SearchSubscription, [ wrapComponent ]);

export default compose(wrapComponent)(SearchSubscription);
