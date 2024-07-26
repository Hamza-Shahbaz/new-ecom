import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import cartImage from "../../assets/images/cart.png";
import heartImage from "../../assets/images/heart-icon.png";
import stackImage from "../../assets/images/lucide.png";
import { useDispatch, useSelector } from "react-redux";
import { amoutRateConversion } from "../../utils/Helper";
import TextShortener from "../DynamicText/TextShortner";
import {
  ADD_TO_CART,
  DELETE_FAVORITE_PRODUCT,
  POST_FAVORITE_PRODUCT,
} from "../../redux/constant/constants";
import { removeFromCart } from "../../redux/actions/CategoryActions";
import { MyToast, toast } from "../Toast/MyToast";
import dummmyImage from "../../assets/images/no-image1.png";
import Modal from "react-bootstrap/Modal";

const ProductCard = ({ productInfo, isListView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFavoriteProcessing, setIsFavoriteProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";
  const newOriginalPrice = amoutRateConversion(
    productInfo?.price,
    currencyRate,
    currencyCode
  );

  const favourites = useSelector((state) => state?.handleCartItem?.favorites);
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);

  const isCarted = cartData.some(
    (item) => item.product_id === productInfo.product_id
  );
  const isFavorite = favourites.some(
    (item) => item.product_id === productInfo.product_id
  );

  const handleTitleClick = () => {
    navigate(`/product/${productInfo?.product_slug}`);
  };

  const newSalePrice = amoutRateConversion(
    productInfo?.sale_price,
    currencyRate,
    currencyCode
  );

  const handleCart = () => {
    if (isCarted) {
      dispatch(removeFromCart(productInfo.product_id));
    } else {
      if (productInfo.product_quantity < 1) {
        toast.clearWaitingQueue();
        MyToast(`Product is out of stock`, "error", "rgba(217,92,92,.95)");
        return;
      }
      dispatch({
        type: ADD_TO_CART,
        payload: productInfo,
        stock: productInfo.product_quantity,
        quantity: 1,
      });
    }
  };

  const handleFavorite = () => {
    if (isFavoriteProcessing) {
      return;
    }
    if (!loginData?.token) {
      setShowModal(true); // Show modal if the user is not logged in
      return;
    }
    if (isFavorite) {
      dispatch({
        type: DELETE_FAVORITE_PRODUCT,
        payload: productInfo,
        setIsLoading: setIsFavoriteProcessing,
        navigate
      });
    } else {
      dispatch({
        type: POST_FAVORITE_PRODUCT,
        payload: productInfo,
        setIsLoading: setIsFavoriteProcessing,
      });
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  const isOnSale =
    productInfo?.price &&
    productInfo?.sale_price &&
    productInfo?.price !== productInfo?.sale_price;

  const isFeatured = !!(productInfo?.is_featured && productInfo?.is_featured);

  const lessStock =
    productInfo?.product_quantity && productInfo?.product_quantity >= 0;

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
                              state={"/my-cart"}
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
        className={`product-card ${
          isListView ? "d-flex" : ""
        }`}
        style={{ minHeight: isListView ? "" : "410px" }}
      >
        <div
          className="d-flex justify-content-between"
          style={{ position: "relative" }}
        >
          {isOnSale && (
            <div
              style={{
                backgroundColor: "#ffb703",
                position: "absolute",
                left: 0,
                padding: "3px",
                paddingLeft: "10px",
                paddingRight: "10px",
                zIndex: 1000
              }}
            >
              <p
                className="mb-0 sale-tag"
                style={{
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "600",
                  textAlign: "center",
                  padding: "4px",
                  width: "50px",
                }}
              >
                Sale
              </p>
            </div>
          )}

          {isFeatured === true && (
            <div
              style={{
                backgroundColor: "#ffb703",
                padding: "3px",
                paddingLeft: "10px",
                paddingRight: "10px",
                position: "absolute",
                left: isListView ? 120 : "auto",
                right: isListView ? "auto" : 0,
                zIndex: 1000
              }}
            >
              <p
                className="mb-0 sale-tag"
                style={{
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "600",
                  textAlign: "center",
                  padding: "4px",
                  width: "80px",
                }}
              >
                Featured
              </p>
            </div>
          )}
        </div>
        <div
          className={`product-img ${isListView ? "col-4" : ""}`}
          // style={{ paddingTop: "40px" }}
        >
          <Link to={`/product/${productInfo?.product_slug}`}>
          {/* <TextShortener
            text={productInfo?.product_name}
            textLimit={15}
            component="img"
            tooltipClassname="custom-tooltip-class"
            imgSrc={productInfo?.image_path || dummmyImage}
            onError={handleImageError}
            className="image-fixer"
            parentClassName=""
          /> */}
            <img
              src={productInfo?.image_path || dummmyImage}
              onError={handleImageError}
              alt={productInfo?.product_name}
            />
          </Link>
        </div>
        <div className={`desc bg-white ${isListView ? "col-8" : ""}`}>
          <div
            className={`${
              isListView
                ? "d-flex justify-content-between align-items-center"
                : "d-flex justify-content-between align-items-center"
            }`}
          >
            <div className="mb-0">
              <StarRating rating={productInfo.product_rating} />
              <span>{productInfo?.product_rating.toFixed(1)}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              {productInfo.variant_combo_id === 0 ? (
                <>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {isCarted ? (
                      <i
                        className={"fa-solid fa-cart-shopping"}
                        onClick={handleCart}
                      />
                    ) : (
                      <img src={cartImage} onClick={handleCart} />
                    )}
                  </Link>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {isFavorite ? (
                      <i
                        className={`fa-solid fa-heart `}
                        onClick={handleFavorite}
                      />
                    ) : (
                      <img
                        src={heartImage}
                        alt="Favorite"
                        onClick={handleFavorite}
                      />
                    )}
                  </Link>
                </>
              ) : (
                <Link to={`/product/${productInfo?.product_slug}`}>
                  <img src={stackImage} alt="Variants" />
                </Link>
              )}
            </div>
          </div>
          <span className="price">
            {newSalePrice + " "}
            {productInfo?.price &&
              productInfo?.sale_price &&
              productInfo?.price !== productInfo?.sale_price && (
                <del>{newOriginalPrice}</del>
              )}
          </span>
          <div
            onClick={handleTitleClick}
            style={{
              cursor: "pointer",
              minHeight: "45px",
              maxWidth: isListView ? "420px" : "auto",
            }}
          >
            <TextShortener
              text={productInfo?.product_name}
              textLimit={isListView ? 120 : 50}
              component={"p"}
              className={""}
              tooltipStyle={{
                color: "white",
                fontSize: "14px",
                fontWeight: 400,
              }}
            />
          </div>

          <p>
            Availability:
            {!lessStock ? (
              <span className="colorRed"> Out of Stock</span>
            ) : (
              <span className="colorGreen"> In Stock</span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

const MemoizedCard = React.memo(ProductCard);

export default MemoizedCard;
