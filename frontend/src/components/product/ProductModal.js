import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from 'swiper';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./sub-components/ProductRatingDecimal";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { useTranslation } from "react-i18next";

function ProductModal({ product, currency, discountedPrice, finalProductPrice, finalDiscountedPrice, show, onHide, wishlistItem, compareItem }) {
  const { t } = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
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

  useEffect(() => {
    if (product.attributes && selectedProduct.attribute) {
      const attribute = product.attributes.find(attr => attr.name === selectedProduct.attribute);
      if (attribute && attribute.variations[0]) {
        setProductStock(attribute.variations[0].stock);
        setQuantityCount(1); // reset quantity count to 1 when a new attribute is selected
      }
    }
  }, [selectedProduct.attribute, product.attributes]);


  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true
  };

  const onCloseModal = () => {
    setThumbsSwiper(null)
    onHide()
  }

  return (
    <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body">
      <div className="row">
        <div className="col-md-5 col-sm-12 col-xs-12">
          <div className="product-large-image-wrapper">
            <Swiper options={gallerySwiperParams}>
              {product.images &&
                product.images.map((img, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="single-image">
                        <img
                          src={process.env.PUBLIC_URL + img}
                          className="img-fluid"
                          alt="Product"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
          <div className="product-small-image-wrapper mt-15">
            <Swiper options={thumbnailSwiperParams}>
              {product.images &&
                product.images.map((img, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="single-image">
                        <img
                          src={process.env.PUBLIC_URL + img}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
        <div className="col-md-7 col-sm-12 col-xs-12">
          <div className="product-details-content quickview-content">
            <h2>{product.title}</h2>
            <div className="product-details-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>
                    {currency.currencySymbol + finalDiscountedPrice}
                  </span>{" "}
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
                <div className="pro-details-cart btn-hover">
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
                      setQuantityCount(
                        quantityCount > 1 ? quantityCount - 1 : 1
                      )
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
          </div>
        </div>
      </div>
    </div>
  </Modal>
  );
}

ProductModal.propTypes = {
  currency: PropTypes.shape({}),
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.shape({}),
  show: PropTypes.bool,
  wishlistItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({})
};

export default ProductModal;
