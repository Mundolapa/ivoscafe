import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import {
  getIndividualCategories,
  getIndividualTags,
  // getIndividualColors,
  // getProductsIndividualSizes,
  setActiveSort
} from "../../helpers/product";

const ShopTopFilter = ({ products, getSortParams }) => {
  const uniqueCategories = getIndividualCategories(products);
  // const uniqueColors = getIndividualColors(products);
  // const uniqueSizes = getProductsIndividualSizes(products);
  const uniqueTags = getIndividualTags(products);
  const { t } = useTranslation();

  return (
    <div className="product-filter-wrapper" id="product-filter-wrapper">
      <div className="product-filter-wrapper__inner">
        <div className="row">
          {/* Product Filter */}
          <div className="col-md-3 col-sm-6 col-xs-12 mb-30">
            <div className="product-filter">
              <h5>{t('shop_grid_categories')}</h5>
              {uniqueCategories ? (
                <ul>
                  {uniqueCategories.map((category, key) => {
                    return (
                      <li key={key}>
                        <button
                          onClick={e => {
                            getSortParams("category", category);
                            setActiveSort(e);
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                  t('shop_grid_no_categories')
              )}
            </div>
          </div>
          {/* Product Filter */}
          <div className="col-md-3 col-sm-6 col-xs-12 mb-30">
            <div className="product-filter product-filter--tag">
              <h5>{t('shop_grid_keywords')}</h5>
              {uniqueTags ? (
                <ul>
                  {uniqueTags.map((keywords, key) => {
                    return (
                      <li key={key}>
                        <button
                          onClick={e => {
                            getSortParams("tag", keywords);
                            setActiveSort(e);
                          }}
                        >
                          {keywords}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                t('shop_grid_no_keywords')
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ShopTopFilter.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array
};

export default ShopTopFilter;
