import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { TextField, Button, IconButton, SortableTableLegacy } from "@reactioncommerce/reaction-ui";
import ProductGridContainer from "/imports/plugins/included/product-variant/containers/productGridContainer";
import { accountsTable } from "../helpers";

class SearchModal extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    handleAccountClick: PropTypes.func,
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    handleTagClick: PropTypes.func,
    handleToggle: PropTypes.func,
    products: PropTypes.array,
    siteName: PropTypes.string,
    tags: PropTypes.array,
    unmountMe: PropTypes.func,
    value: PropTypes.string,
    handleSelectPrice: PropTypes.func,
    handleSelectVendor: PropTypes.func,
    handleSelectRating: PropTypes.func,
    handleSelectSort: PropTypes.func,
    maxPrice: PropTypes.number,
    minPrice: PropTypes.number,
    sortBy: PropTypes.object,
    vendor: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      vendors: []
    };
  }

  componentWillMount() {
    this.populateVendors(this.props);
  }

  componentWillReceiveProps(newProps) {
    const isFiltered = localStorage.getItem("isFiltered");
    if (isFiltered) {
      localStorage.removeItem("isFiltered");
      return;
    }
    this.populateVendors(newProps);
  }

  populateVendors = newProps => {
    const vendors = [];
    newProps.products.forEach(product => {
      if (vendors.indexOf(product.vendor) === -1) vendors.push(product.vendor);
    });
    return this.setState({ vendors });
  };

  renderSearchInput() {
    return (
      <div className="rui search-modal-input">
        <label data-i18n="search.searchInputLabel">Search {this.props.siteName}</label>
        <i className="fa fa-search search-icon" />
        <TextField className="search-input" textFieldStyle={{ marginBottom: 0 }} onChange={this.props.handleChange} value={this.props.value} />
        <Button
          className="search-clear"
          i18nKeyLabel="search.clearSearch"
          label="Clear"
          containerStyle={{ fontWeight: "normal" }}
          onClick={this.props.handleClick}
        />
      </div>
    );
  }

  renderSearchTypeToggle() {
    if (Reaction.hasPermission("admin")) {
      return (
        <div className="rui search-type-toggle">
          <div
            className="search-type-option search-type-active"
            data-i18n="search.searchTypeProducts"
            data-event-action="searchCollection"
            data-event-value="products"
            onClick={() => this.props.handleToggle("products")}
          >
            Products
          </div>
          {Reaction.hasPermission("accounts") && (
            <div
              className="search-type-option"
              data-i18n="search.searchTypeAccounts"
              data-event-action="searchCollection"
              data-event-value="accounts"
              onClick={() => this.props.handleToggle("accounts")}
            >
              Accounts
            </div>
          )}
        </div>
      );
    }
  }

  renderProductSearchTags() {
    return (
      <div className="rui search-modal-tags-container">
        <p className="rui suggested-tags" data-i18n="search.suggestedTags">
          Suggested tags
        </p>
        <div className="rui search-tags">
          {this.props.tags.map(tag => (
            <span className="rui search-tag" id={tag._id} key={tag._id} onClick={() => this.props.handleTagClick(tag._id)}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  renderSortFilter() {
    return (
      <form className="form-inline sort-filter-section">
        <div className="form-group filter-by-div">
          <label htmlFor="filterBy" className="filter-by-label">
            Filter By
          </label>
          <select onChange={this.props.handleSelectPrice} defaultValue="1 - 1000000" className="form-control filter-by-select" id="filterBy">
            <option value="1 - 1000000">All</option>
            <option value="0 - 100">0 - &#x20a6;100</option>
            <option value="100 - 1000">&#x20a6;100 - &#x20a6;1000</option>
            <option value="1000 - 10000">&#x20a6;1000 - &#x20a6;10000</option>
            <option value="10000 - 100000">&#x20a6;10000 - &#x20a6;100000</option>
            <option value="100000 - 1000000">&#x20a6;100000 - &#x20a6;1000000</option>
          </select>
          <select id="select-vendor" onChange={this.props.handleSelectVendor} className="form-control filter-by-select" defaultValue="All">
            <option value="vendor">
              All Vendors
            </option>
            {this.state.vendors.map((vendor, i) => <option key={i}>{vendor}</option>)}
          </select>
        </div>
        <div className="form-group filter-by-div">
          <label htmlFor="sortBy" className="filter-by-label">
            Sort By
          </label>
          <select className="form-control filter-by-select" id="sortBy" defaultValue="New Arrival" onChange={this.props.handleSelectSort}>
            <option value="Lowest-Price">Lowerest Price</option>
            <option value="Highest-Price">Highest Price</option>
            <option value="New-Arrival">New Arrival</option>
            <option value="Highest-Rating">Highest Ratings</option>
            <option value="Lowest-Rating">Lowest Ratings</option>
          </select>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div>
        <div className="rui search-modal-close">
          <IconButton icon="fa fa-times" onClick={this.props.unmountMe} />
        </div>
        <div className="rui search-modal-header">
          {this.renderSearchInput()}
          {this.renderSearchTypeToggle()}
          {this.props.tags.length > 0 && this.renderProductSearchTags()}
        </div>
        {this.renderSortFilter()}
        <div className="rui search-modal-results-container">
          {this.props.products.length > 0 && <ProductGridContainer products={this.props.products} unmountMe={this.props.unmountMe} isSearch={true} />}
          {this.props.accounts.length > 0 && (
            <div className="data-table">
              <div className="table-responsive">
                <SortableTableLegacy data={this.props.accounts} columns={accountsTable()} onRowClick={this.props.handleAccountClick} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchModal;
