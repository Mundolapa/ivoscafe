import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react"; // <-- added useEffect
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRatingDecimal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { useTranslation} from "react-i18next";

const ProductDescriptionInfo = ({
                                  product,
                                  discountedPrice,
                                  currency,
                                  finalDiscountedPrice,
                                  finalProductPrice,
                                  cartItems,
                                  wishlistItem,
                                  compareItem,
                                }) => {
  const dispatch = useDispatch();

  // Initial state
  const [selectedProduct, setSelectedProduct] = useState({
    attribute: product.attributes && product.attributes[0] ? product.attributes[0].name : null,
    variation: product.attributes && product.attributes[0] && product.attributes[0].variations[0] ? product.attributes[0].variations[0].value : null,
  });

  let initialStock = product.stock;
  if (product.attributes && product.attributes[0] && product.attributes[0].variations[0]) {
    initialStock = product.attributes[0].variations[0].stock;
  }

  const [productStock, setProductStock] = useState(initialStock);
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
      cartItems,
      product,
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (product.attributes && selectedProduct.attribute) {
      const attribute = product.attributes.find(attr => attr.name === selectedProduct.attribute);
      if (attribute && attribute.variations[0]) {
        setProductStock(attribute.variations[0].stock);
        setQuantityCount(1); // reset quantity count to 1 when a new attribute is selected
      }
    }
  }, [selectedProduct.attribute, product.attributes]);


  return (
    <div className="product-details-content ml-70">
      <h2>{product.title}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            <span className="old">
              {currency.currencySymbol + finalProductPrice}
            </span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalProductPrice} </span>
        )}
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={parseFloat(product.rating)} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product.short_description}</p>
      </div>

      {product.attributes ? (
          <div className="pro-details-attr-variations">
            {product.attributes.map((attr, attrKey) => (
                <div className="pro-details-attr-wrap" key={attrKey}>
                  <span>{attr.name}</span>
                  <div className={`pro-details-attr-content`}>
                    <label className={'pro-details-attr-content--single blue'} key={attrKey}>
                      <input
                          type="radio"
                          value={attr.name}
                          name="attribute"
                          checked={attr.name === selectedProduct.attribute}
                          onChange={() => {
                            setSelectedProduct({
                              ...selectedProduct,
                              attribute: attr.name,
                              variation: attr.variations[0].value,
                            });
                          }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
            ))}
            {product.attributes
                .filter((attr) => attr.name === selectedProduct.attribute)
                .map((attr) => (
                    <div className={`pro-details-variations`} key={attr.name}>
                      <span>{t('shop_grid_item_options')}</span>
                      <div className={`pro-details-variations-content ${attr.name}`}>
                        {attr.variations.map((variation, variationKey) => (
                            <label
                                className={`pro-details-variations-content--single ${attr.name}`}
                                key={variationKey}
                            >
                              <input
                                  type="radio"
                                  value={variation.value}
                                  name={attr.name}
                                  checked={
                                    variation.value === selectedProduct.variation ? "checked" : ""
                                  }
                                  onChange={() => {
                                    setSelectedProduct({
                                      ...selectedProduct,
                                      variation: variation.value,
                                    });
                                    setProductStock(variation.stock);
                                    setQuantityCount(1);
                                  }}
                              />
                              <span className="variations-name">{variation.value}</span>
                            </label>
                        ))}
                      </div>
                    </div>
                ))}
          </div>
      ) : (
        ""
      )}
      {product.affiliate_link ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliate_link}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t('shop_grid_buy_now')}
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
                <button
                    onClick={() =>
                        dispatch(addToCart({
                          ...product,
                          quantity: quantityCount,
                          // selectedAttribute: selectedProduct.attribute,
                          // selectedVariation: selectedProduct.variation,
                          selectedAttribute: selectedProduct.attribute ? selectedProduct.attribute : product.selectedAttribute ? product.selectedAttribute : null,
                          selectedVariation: selectedProduct.variation ? selectedProduct.variation: product.selectedVariation ? product.selectedVariation : null
                        }))
                    }
                    disabled={productCartQty >= productStock}
                >

                {" "}
                {t('shop_grid_add_to_cart')}{" "}
              </button>
            ) : (
              <button disabled>{t('shop_grid_out_of_stock')}</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? t('shop_grid_added_to_wishlist')
                  : t('shop_grid_add_to_wishlist')
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? t('shop_grid_added_to_compare')
                  : t('shop_grid_add_to_compare')
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div>
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>{t('shop_grid_categories')} :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/products"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.keywords ? (
        <div className="pro-details-meta">
          <span>{t('shop_grid_keywords')} :</span>
          <ul>
            {product.keywords.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/products"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({})
};

export default ProductDescriptionInfo;
