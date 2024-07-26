import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { amoutRateConversion } from "../../../utils/Helper";
import loader from "../../../assets/images/loader.gif";
import CartTotal from "../../../components/CartTotal/CartTotal";
import { BaseUrl, EndPoints } from "../../../utils/Api";
import {
  CLEAR_COUPON,
  FETCH_COUPON_FAILURE,
  FETCH_COUPON_SUCCESS,
  USER_AUTH_ERROR,
} from "../../../redux/constant/constants";
import TextShortener from "../../../components/DynamicText/TextShortner";
import { MyToast, toast } from "../../../components/Toast/MyToast";

const CheckoutCart = ({ activeSection, setActiveSection, allowNavigation }) => {
  const isAddress = activeSection === "Address";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [couponInput, setCouponInput] = useState("");
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
  const couponData = useSelector(
    (state) => state?.OrderReducerData?.couponData
  );
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  const selectedOptions = useSelector(
    (state) => state?.handleCartItem?.selectedShippingOptions
  );

  const shippingAmount = useSelector(
    (state) => state?.handleCartItem?.shippingAmount
  );

  const templates = useSelector(
    (state) => state?.handleCartItem?.shippingTemplates
  );

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

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  const handleCouponApplied = () => {
    async function getCouponData() {
      try {
        setIsLoading(true);

        const myHeaders = new Headers();
        myHeaders.append("Authentication", loginData?.token);

        const response = await fetch(
          `${BaseUrl}${EndPoints.coupon}${couponInput}`,
          {
            headers: myHeaders,
          }
        );

        const result = await response.json();

        if (result.status) {
          dispatch({ type: FETCH_COUPON_SUCCESS, payload: result.data });
          setCouponInput("");
        } else if (result?.status == "401" || result?.status == "403") {
          dispatch({ type: USER_AUTH_ERROR, navigate });
        } else {
          toast.clearWaitingQueue();
          MyToast(result.message, "error", "rgba(217,92,92,.95)");
          dispatch({ type: FETCH_COUPON_FAILURE });
        }
      } catch (error) {
        toast.clearWaitingQueue();
        MyToast(error.message, "error", "rgba(217,92,92,.95)");
        console.error("Failed to apply coupon:", error);
        dispatch({ type: FETCH_COUPON_FAILURE });
      } finally {
        setIsLoading(false);
      }
    }
    if (!loginData?.token) {
      navigate("/login");
    }
    getCouponData();
  };

  const handleRemoveCoupon = () => {
    dispatch({ type: CLEAR_COUPON });
  };

  return (
    <div className="col-xl-4 col-lg-4 col-md-5 sticky-md-top">
      <div className="order-breadcrumbs">
        <Link
          onClick={(e) => {
            e.preventDefault();
            if (allowNavigation) {
              setActiveSection("Address");
            }
          }}
          className={isAddress ? "active" : ""}
        >
          Address
        </Link>
        <Link
          onClick={(e) => {
            e.preventDefault();
            if (allowNavigation) {
              setActiveSection("Payment");
            }
          }}
          className={isAddress ? "" : "active"}
        >
          Payment
        </Link>
      </div>

      {activeSection === "Payment" && (
        <div className="accordion mb-3" id="accordionExample">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                    style={{ background: "none" }}
                  >
                    Add Coupon Code
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    className="coupon-code"
                    style={{ marginTop: "0px", margin: "none" }}
                  >
                    {!couponData?.coupon_id && (
                      <form
                        className="needs-validation"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Coupon"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                          />
                        </div>
                        <div className="mb-0">
                          <button
                            disabled={!couponInput || isLoading}
                            onClick={handleCouponApplied}
                            className="btn btn-theme"
                          >
                            Apply Coupon
                          </button>
                        </div>
                      </form>
                    )}
                    {couponData?.coupon_id && (
                      <>
                        <h6>
                          {couponData.coupon_code}{" "}
                          {couponData?.type === "percentage" ? (
                            <h6>{couponData?.price}%</h6>
                          ) : (
                            <h6>
                              {amoutRateConversion(
                                couponData?.price,
                                currencyRate,
                                currencyCode
                              )}
                            </h6>
                          )}
                        </h6>
                        <div className="mb-0">
                          <button
                            onClick={handleRemoveCoupon}
                            className="btn btn-theme"
                          >
                            Remove Coupon
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="order-summary">
        <div className="heading">
          <h3>Order Summary</h3>
        </div>
        {activeSection === "Payment" && (
          <div style={{ maxHeight: "600px", overflow: "scroll" }}>
            {cartData.length > 0 &&
              cartData.map((item) => (
                <div
                  className="cart-product"
                  key={`${item.product_id}-${item?.variant_combo_id}`}
                >
                  {/* <img src={item.image_path} alt="" /> */}
                  <TextShortener
                    text={item?.product_name}
                    textLimit={15}
                    component="img"
                    tooltipClassname="custom-tooltip-class"
                    imgSrc={item?.image_path || dummmyImage}
                    onError={handleImageError}
                    className=""
                    parentClassName=""
                  />
                  <div className="m-2">
                    <TextShortener
                      component={""}
                      text={
                        item.product_name +
                        (item.variant_name_combo
                          ? `( ${item.variant_name_combo} )`
                          : "")
                      }
                      textLimit={300}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
        <CartTotal
          discount={totalDiscount}
          subTotal={totalPrice}
          shipping={shippingAmount}
        />
      </div>
    </div>
  );
};

export default CheckoutCart;
