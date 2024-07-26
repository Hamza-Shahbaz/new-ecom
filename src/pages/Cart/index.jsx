import React, { useEffect, useState } from "react";
import emptyCart from "../../assets/images/EmptyCart.jpg";
import removeImage from "../../assets/images/cross.png";
import {
  amoutRateConversion,
  symbolAmount,
  valueRateConversion,
} from "../../utils/Helper";
import { useDispatch, useSelector } from "react-redux";
import minusImage from "../../assets/images/minus.png";
import plusImage from "../../assets/images/plus.png";
import { Link, useNavigate } from "react-router-dom";
import CartTotal from "../../components/CartTotal/CartTotal";
import {
  ADD_QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_QUANTITY,
} from "../../redux/constant/constants";
import Modal from "react-bootstrap/Modal";
import dummmyImage from "../../assets/images/no-image1.png";
import TextShortener from "../../components/DynamicText/TextShortner";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const handleAddItem = (cartItem) => {
    dispatch({ type: ADD_QUANTITY, payload: cartItem, quantity: 1 });
  };

  const handleReduceAmount = (cartItem) => {
    if (cartItem.quantity < 2) {
      return;
    }
    dispatch({ type: REMOVE_QUANTITY, payload: cartItem });
  };

  const handleRemoveItem = (cartItem) => {
    dispatch({ type: REMOVE_FROM_CART, payload: cartItem });
  };

  const totalPrice = cartData.reduce((acc, item) => {
    acc += item.quantity * item.price;
    return acc;
  }, 0);
  const totalDiscount = cartData.reduce((acc, item) => {
    if (!item.amount_saved) {
      return acc;
    }
    acc += item.amount_saved * item.quantity;
    return acc;
  }, 0);

  const onClickCheckout = () => {
    if (!loginData?.token) {
      setShowModal(true); // Show modal if the user is not logged in
    } else {
      navigate("/checkout");
    }
  };

  const handleClose = () => setShowModal(!showModal);

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

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
      <section className="cart">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-6">
              <div className="cart-sec">
                <div className="cart-heading">
                  <h1>Shopping Cart</h1>
                </div>

                {cartData?.length ? (
                  <div className="cart-title d-xl-flex d-none">
                    <div className="products">
                      <span>Products</span>
                    </div>
                    <div className="price">
                      <span>Price</span>
                    </div>
                    <div className="quantity">
                      <span>Quantity</span>
                    </div>
                    <div className="sub-total">
                      <span>Total</span>
                    </div>
                  </div>
                ) : null}

                {cartData?.length ? (
                  cartData?.map((item) => (
                    <div
                      className="cart-info"
                      key={`${item.product_id}-${item?.variant_combo_id}`}
                    >
                      <div className="product-info">
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveItem(item);
                          }}
                        >
                          <img src={removeImage} alt="Remove from cart" />
                        </Link>
                        {/* <img
                          src={item.image_path || dummmyImage}
                          onError={handleImageError}
                        /> */}
                        <TextShortener
                          text={item.product_name}
                          textLimit={18}
                          component="img"
                          tooltipClassname="custom-tooltip-class"
                          imgSrc={item.image_path || dummmyImage}
                          onError={handleImageError}
                          className=""
                          parentClassName="product-info"
                        />
                        <p
                          onClick={(e) =>
                            navigate("/product/" + item.product_slug)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {item.product_name +
                            (item.variant_name_combo
                              ? `( ${item.variant_name_combo} )`
                              : "")}
                        </p>
                      </div>
                      <div className="price-info">
                        <span className="d-lg-none">Price:</span>
                        {item.price !== item.sale_price && (
                          <del>
                            {amoutRateConversion(
                              item.price,
                              currencyRate,
                              currencyCode
                            )}
                          </del>
                        )}
                        <span>
                          {" " +
                            amoutRateConversion(
                              item.sale_price,
                              currencyRate,
                              currencyCode
                            )}
                        </span>
                      </div>
                      <div className="product-quantity">
                        <span
                          className={`minus ${
                            item.quantity < 2 ? "disabled" : ""
                          }`}
                          onClick={(e) => handleReduceAmount(item)}
                        >
                          <img src={minusImage} alt="Decrease quantity" />
                        </span>
                        <input
                          type="number"
                          className="count"
                          name="qty"
                          value={item.quantity}
                          disabled
                        />
                        <span
                          className="plus"
                          onClick={(e) => handleAddItem(item)}
                        >
                          <img src={plusImage} alt="Increase quantity" />
                        </span>
                      </div>
                      <div className="product-sub-total">
                        <span className="d-lg-none">Sub Total: </span>
                        <span>
                          {valueRateConversion(
                            item.quantity * item.sale_price,
                            currencyRate
                          )}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="container justify-content-center mt-4">
                    <div className="d-flex justify-content-center ">
                      <img
                        src={emptyCart}
                        style={{ width: "380px", height: "400px" }}
                      />
                    </div>
                  </div>
                )}

                {cartData?.length ? (
                  <div className="cart-footer">
                    <Link to={-1} className="btn btn-theme-outline mb-2 mt-2">
                      <i className="fa fa-angle-left me-2" />
                      RETURN TO SHOP
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="cart-total">
                <div className="cart-heading">
                  <h2>Cart Summary</h2>
                </div>
                <CartTotal
                  subTotal={totalPrice}
                  discount={totalDiscount}
                  checkoutHandler={onClickCheckout}
                />
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <Link
                    to={"/checkout"}
                    onClick={(e) => {
                      e.preventDefault();
                      onClickCheckout();
                    }}
                    className={`btn btn-theme-yellow w-100 ${
                      isLoading ? "disabled" : ""
                    }`}
                    disabled={isLoading}
                  >
                    PROCEED TO CHECKOUT
                    <i className="fa fa-angle-right ms-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
