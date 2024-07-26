import React, { useState } from "react";
import StarRating from "../../../components/StarRating/StarRating";
import minusImage from "../../../assets/images/minus.png";
import plusImage from "../../../assets/images/plus.png";
import whishlistImage from "../../../assets/images/wishlist.png";
import gauranteeImage from "../../../assets/images/payment.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { amoutRateConversion, getVariantsArray } from "../../../utils/Helper";
import VariantItem from "./VariantItem";
import {
  ADD_QUANTITY,
  ADD_TO_CART,
  DELETE_FAVORITE_PRODUCT,
  POST_FAVORITE_PRODUCT,
} from "../../../redux/constant/constants";
import { MyToast, toast } from "../../../components/Toast/MyToast";
import Modal from "react-bootstrap/Modal";

const ProductInfo = ({
  transformedData,
  selectedVariant,
  setSelectedVariants,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favoriteSetting, setFavoriteSetting] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";
  const favourites = useSelector((state) => state?.handleCartItem?.favorites);
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  let variants = [];
  if (transformedData?.has_variants_selected) {
    variants = getVariantsArray(transformedData?.variant_types);
  }
  const isVariant = transformedData.has_variants_selected === 1;

  let currentVariant = {};
  if (isVariant) {
    currentVariant =
      transformedData?.variant_combo_reference?.[
        selectedVariant.join(",")
      ];
  }
  const handleAddToCart = (quantity) => {
    const cartItem = transformProductInToCartItem(
      transformedData,
      isVariant,
      currentVariant
    );
    if (isCarted) {
      if (isCarted.quantity + selectedQuantity > isCarted.stock) {
        toast.clearWaitingQueue();
        MyToast(
          `Current available stock is ${isCarted.stock}, please reduce ${
            isCarted.quantity + selectedQuantity - isCarted.stock
          }`,
          "error",
          "rgba(217,92,92,.95)"
        );
        return;
      }
      dispatch({
        type: ADD_QUANTITY,
        payload: cartItem,
        quantity: selectedQuantity,
      });
    } else {
      if (cartItem.stock < selectedQuantity) {
        toast.clearWaitingQueue();
        MyToast(
          `Current available stock is ${cartItem.stock}, please reduce ${
            selectedQuantity - cartItem.stock
          }`,
          "error",
          "rgba(217,92,92,.95)"
        );
        return;
      }
      dispatch({
        type: ADD_TO_CART,
        payload: cartItem,
        stock: cartItem?.product_quantity,
        quantity: selectedQuantity,
      });
    }
    MyToast("item added to cart successfully", "success" , "rgba(91,189,114,.95)");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate("/my-cart");
    }, 400);
  };

  const handleAddToWishList = () => {
    if (favoriteSetting) {
      return;
    }
    if (!loginData?.token) {
      setShowModal(true); // Show modal if the user is not logged in
      return;
    }
    const cartItem = transformProductInToCartItem(
      transformedData,
      isVariant,
      currentVariant
    );
    if (isFavorite) {
      dispatch({
        type: DELETE_FAVORITE_PRODUCT,
        payload: cartItem,
        setIsLoading: setFavoriteSetting,
        navigate
      });
    } else {
      dispatch({
        type: POST_FAVORITE_PRODUCT,
        payload: cartItem,
        setIsLoading: setFavoriteSetting,
      });
    }
  };

  const inStock =
    (isVariant && currentVariant?.product_quantity > 0) ||
    (!isVariant && transformedData?.offer_data?.[0].product_quantity > 0);

  const isCarted = cartData.find((item) => {
    if (isVariant) {
      if (
        transformedData?.product_head?.[0].product_id === item.product_id &&
        currentVariant.variant_combo_id === item.variant_combo_id
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return item.product_id === transformedData?.product_head?.[0].product_id;
    }
  });

  const isFavorite = favourites.find((item) => {
    if (isVariant) {
      return (
        item.product_id === transformedData?.product_head?.[0].product_id &&
        currentVariant.variant_combo_id === item.variant_combo_id
      );
    } else {
      return item.product_id === transformedData?.product_head?.[0].product_id;
    }
  });

  const handleClose = () => setShowModal(!showModal);

  return (
    <>
      {showModal && (
        <>
          <Modal show={showModal} onHide={handleClose}>
            <div
              className="modal-md model-sec"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row align-items-center">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="model-discount">
                        <div className="d-block text-center align-items-center">
                          <span>Please Login or Create Account</span>
                          <button
                            onClick={(e) => setShowModal(false)}
                            className="btn-close"
                          ></button>
                        </div>
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <Link
                              className="btn btn-theme mt-2 w-100"
                              to={"/login"}
                              state={
                                "/product/" +
                                transformedData?.product_head?.[0]?.product_slug
                              }
                            >
                              LOGIN
                            </Link>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <Link
                              className="btn btn-theme-yellow mt-2 w-100"
                              to={"/login"}
                              state={"signup"}
                            >
                              SIGN UP
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
      <div
        key={
          "product-details-" +
          currentVariant +
          " " +
          transformedData?.product_head?.[0].product_id
        }
        className="detail-right"
      >
        <div
          key={"product-info-ratings"}
          className="d-md-flex align-items-center gap-3"
        >
          <div className="rating">
            <StarRating
              rating={transformedData?.product_head?.[0].product_rating || 0}
            />
          </div>
          <span>{`${
            transformedData?.product_head?.[0].product_rating || 0
          } star rating`}</span>
          <small>
            {"("}
            {transformedData?.product_head?.[0].no_of_reviews} User feedback
            {")"}
          </small>
        </div>
        <h1>{transformedData?.product_head?.[0].product_name}</h1>
        <div key={"product-info-stock"} className="stock-detail">
          <div className="mb-0">
            <p>
              Sku:
              <span>
                {" "}
                {isVariant
                  ? currentVariant?.seller_sku
                  : transformedData?.offer_data?.[0].seller_sku}
              </span>
            </p>
            <p>
              Brand:
              <span> {transformedData?.product_head?.[0].brand_name}</span>
            </p>
          </div>
          <div className="mb-0">
            <p>
              Availability:
              {!inStock ? (
                <span className="red"> Out of Stock</span>
              ) : (
                <span className="green"> In Stock</span>
              )}
            </p>
            <p>
              Category:
              <span> {transformedData?.product_head?.[0].category_title}</span>
            </p>
          </div>
        </div>
        <div key={"product-info-price"} className="product-price">
          <span>
            {isVariant
              ? amoutRateConversion(
                  currentVariant?.sale_price,
                  currencyRate,
                  currencyCode
                )
              : amoutRateConversion(
                  transformedData?.offer_data?.[0].sale_price,
                  currencyRate,
                  currencyCode
                ) + " "}
            {isVariant &&
              currentVariant?.sale_price !== currentVariant?.price && (
                <del>
                  {amoutRateConversion(
                    currentVariant?.price,
                    currencyRate,
                    currencyCode
                  )}
                </del>
              )}
            {!isVariant &&
              transformedData?.offer_data?.[0].sale_price !==
                transformedData?.offer_data?.[0].price && (
                <del>
                  {amoutRateConversion(
                    transformedData?.offer_data?.[0].price,
                    currencyRate,
                    currencyCode
                  )}
                </del>
              )}
          </span>
          {isVariant &&
            currentVariant?.sale_price !== currentVariant?.price && (
              <span className="discount">{currentVariant?.discount} OFF</span>
            )}
          {!isVariant &&
            transformedData?.offer_data?.[0].sale_price !==
              transformedData?.offer_data?.[0].price && (
              <span className="discount">
                {transformedData?.offer_data?.[0].discount} OFF
              </span>
            )}
        </div>

        {isVariant &&
          variants.length > 0 &&
          variants.map((variantType, index) => {
            //one variant div contains 2 variant types
            if (index % 2 === 0) {
              return (
                <div key={`variant-div-${index}`} className="variant">
                  <VariantItem
                    key={`variant-item-${index}-${variantType.key}`}
                    variant={variantType}
                    selectedVariant={selectedVariant || {}}
                    setSelectedVariants={setSelectedVariants}
                  />
                  {variants[index + 1] && (
                    <VariantItem
                      key={`variant-item-${index + 1}-${variantType.key}`}
                      variant={variants[index + 1]}
                      selectedVariant={selectedVariant || {}}
                      setSelectedVariants={setSelectedVariants}
                    />
                  )}
                </div>
              );
            }
          })}

        <div key={"product-info-cart"} className="add-cart">
          <div className="quantity">
            <span
              className={`minus ${selectedQuantity < 2 ? "disabled" : ""}`}
              onClick={(e) => setSelectedQuantity(selectedQuantity - 1 || 1)}
            >
              <img src={minusImage}></img>
            </span>
            <input
              type="number"
              className="count"
              disabled={true}
              value={selectedQuantity}
            />
            <span
              className="plus"
              onClick={(e) => setSelectedQuantity(selectedQuantity + 1)}
            >
              <img src={plusImage}></img>
            </span>
          </div>
          <div className="add-button">
            <Link
              to={"/my-cart"}
              className={`btn add-to-cart ${inStock ? "" : "disabled"}`}
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(selectedQuantity);
              }}
            >
              Add To Cart
              <i className="fa fa-shopping-cart ms-2" />
            </Link>
          </div>
          <div className="buy-button">
            <button
              className={`btn buy-now ${inStock ? "" : "disabled"}`}
              type="button"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div key={"product-info-wishlist"} className="wishlist">
          <div
            className="add-wishlist"
            style={{ cursor: "pointer" }}
            onClick={handleAddToWishList}
          >
            {isFavorite ? (
              <i className="fa-solid fa-heart" />
            ) : (
              <img src={whishlistImage} alt="wishlist" />
            )}
            <span>
              {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            </span>
          </div>
          <div className="share-product">
            Share Product:
            <a
              href={siteSettingsData?.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href={siteSettingsData?.x_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <div key={"product-info-guarantee"} className="guarantee">
          <span>100% Guarantee Safe Checkout</span>
          <img src={gauranteeImage} alt="" />
        </div>
      </div>
    </>
  );
};

export default ProductInfo;

const transformProductInToCartItem = (data, isVariant, variantInfo) => {
  if (isVariant) {
    return {
      product_id: data?.product_head?.[0]?.product_id,
      product_name: data?.product_head?.[0]?.product_name,
      brand_name: data?.product_head?.[0]?.brand_name,
      created_at: data?.product_head?.[0]?.created_at,
      image_id: data?.product_images?.[0]?.image_id,
      price: variantInfo.price,
      product_quantity: variantInfo.product_quantity,
      discount: variantInfo.discount,
      amount_saved: variantInfo.amount_saved,
      sale_price: variantInfo.sale_price,
      sale_start_date: variantInfo.sale_start_date,
      sale_end_date: variantInfo.sale_end_date,
      variant_combo_id: variantInfo.variant_combo_id,
      product_rating: data?.product_head?.[0]?.product_rating,
      no_of_reviews: data?.product_head?.[0]?.no_of_reviews,
      image_path:
        data?.product_images?.[variantInfo.variant_combo_id]?.[0]?.image_path,
      stock: variantInfo.product_quantity,
      variant_name_combo: variantInfo.variant_name_combo,
      product_slug: data?.product_head?.[0]?.product_slug,
    };
  }
  return {
    product_id: data?.product_head?.[0]?.product_id,
    product_name: data?.product_head?.[0]?.product_name,
    brand_name: data?.product_head?.[0]?.brand_name,
    created_at: data?.product_head?.[0]?.created_at,
    image_id: data?.product_images?.[0]?.image_id,
    price: data?.offer_data?.[0].price,
    product_quantity: data?.offer_data?.[0].product_quantity,
    discount: data?.offer_data?.[0].discount,
    amount_saved: data?.offer_data?.[0].amount_saved,
    sale_price: data?.offer_data?.[0].sale_price,
    sale_start_date: data?.offer_data?.[0].sale_start_date,
    sale_end_date: data?.offer_data?.[0].sale_end_date,
    variant_combo_id: data?.offer_data?.[0].variant_combo_id,
    product_rating: data?.product_head?.[0]?.product_rating,
    no_of_reviews: data?.product_head?.[0]?.no_of_reviews,
    image_path: data?.product_images?.[0]?.image_path,
    stock: data?.offer_data?.[0].product_quantity,
    product_slug: data?.product_head?.[0]?.product_slug,
  };
};
