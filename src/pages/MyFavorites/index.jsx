import React, { useState } from "react";
import emptyWishlist from "../../assets/images/EmptyWishlist.png";
import removeImage from "../../assets/images/cross.png";
import { amoutRateConversion, symbolAmount } from "../../utils/Helper";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ADD_QUANTITY,
  ADD_TO_CART,
  DELETE_FAVORITE_PRODUCT,
} from "../../redux/constant/constants";
import dummmyImage from "../../assets/images/no-image1.png";

const MyFavorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleRemoveFromWishlist = (item) => {
    if (isLoading) {
      return;
    }
    dispatch({
      type: DELETE_FAVORITE_PRODUCT,
      payload: item,
      setIsLoading: setIsLoading,
      navigate
    });
  };

  const handleAddToCart = (item) => {
    if (isLoading) {
      return;
    }
    if (isCarted(item)) {
      return 
    } else {
      dispatch({
        type: ADD_TO_CART,
        payload: item,
        stock: item.product_quantity,
        quantity: 1,
      });
    }
    dispatch({
      type: DELETE_FAVORITE_PRODUCT,
      payload: item,
      setIsLoading: setIsLoading,
      navigate
    });
    navigate("/my-cart");
  };

  const isCarted = (favItem) => {
    return cartData.some((item) => {
      if (favItem.variant_combo_id) {
        return (
          favItem.product_id === item.product_id &&
          favItem.variant_combo_id === item.variant_combo_id
        );
      } else {
        return favItem.product_id === item.product_id;
      }
    });
  };

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  return (
    <section className="wishlist-page">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="wishlist-sec">
              <div className="wishlist-heading">
                <h1>Wishlist</h1>
              </div>

              {favourites && favourites?.length ? (
                <div className="wishlist-title d-xl-flex d-none">
                  <div className="products">
                    <span>Products</span>
                  </div>
                  <div className="price">
                    <span>Price</span>
                  </div>
                  <div className="stock-status">
                    <span>Stock Status</span>
                  </div>
                  <div className="action">
                    <span>Actions</span>
                  </div>
                </div>
              ) : null}

              {favourites && favourites.length ? (
                favourites.map((favItem) => {
                  return (
                    <div
                      key={
                        favItem.product_name +
                        favItem.product_id +
                        favItem.variant_name_combo
                      }
                      className="wishlist-info"
                    >
                      <div className="product-info">
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveFromWishlist(favItem);
                          }}
                        >
                          <img src={removeImage} alt="" />
                        </Link>
                        <img
                          src={favItem.image_path || dummmyImage}
                          onError={handleImageError}
                        />
                        <p
                          onClick={(e) =>
                            navigate("/product/" + favItem.product_slug)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {favItem.product_name +
                            (favItem.variant_name_combo
                              ? `(${favItem.variant_name_combo})`
                              : "")}
                        </p>
                      </div>
                      <div className="price-info">
                        <span className="d-lg-none">Price:</span>
                        <span>
                          {favItem.price !== favItem.sale_price && (
                            <del className="px-2">
                              {amoutRateConversion(
                                favItem.price,
                                currencyRate,
                                currencyCode
                              )}
                            </del>
                          )}
                          {amoutRateConversion(
                            favItem.sale_price,
                            currencyRate,
                            currencyCode
                          )}
                        </span>
                      </div>
                      <div className="stock-status">
                        <span className="d-lg-none">Stock Status:</span>
                        <span
                          className={
                            favItem.product_quantity < 1 ? "red" : "green"
                          }
                        >
                          {favItem.product_quantity < 1
                            ? "Out Of Stock"
                            : "In Stock"}
                        </span>
                      </div>
                      <div className="action">
                        <Link
                          to={"/my-cart"}
                          className={`btn btn-theme-yellow ${
                            favItem.product_quantity < 1 ? "disabled" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(favItem);
                          }}
                        >
                          {isCarted(favItem)
                            ? "Already in Cart"
                            : "Add To Cart"}
                          <i className="fa fa-shopping-cart ms-2" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="container justify-content-center mt-4">
                  <div className="d-flex justify-content-center ">
                    <img
                      src={emptyWishlist}
                      style={{ width: "350px", height: "350px" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyFavorites;
