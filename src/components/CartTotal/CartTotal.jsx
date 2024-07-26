import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { amoutRateConversion } from "../../utils/Helper";
import {
  CALCULATE_FINAL_TOTAL,
  CLEAR_COUPON,
} from "../../redux/constant/constants";
import { MyToast } from "../../components/Toast/MyToast";

const CartTotal = ({ subTotal, shipping, discount }) => {
  const couponData = useSelector(
    (state) => state?.OrderReducerData?.couponData
  );
  const dispatch = useDispatch();

  const total = (subTotal || 0) + (shipping || 0) - (discount || 0);

  let totalAfterCoupon = 0;
  let couponDiscount = 0;

  if (couponData?.coupon_id) {
    if (couponData.type === "fixed") {
      couponDiscount = couponData.price;
      totalAfterCoupon = total - couponData.price;
    } else {
      couponDiscount = total * (parseFloat(couponData.price) / 100);
      if (couponData.max_value && couponData.max_value > 0) {
        couponDiscount = Math.min(couponDiscount, couponData.max_value);
      }
      totalAfterCoupon = total - couponDiscount;
    }
  }

  useEffect(() => {
    if (
      couponData?.coupon_id &&
      (totalAfterCoupon < 1 ||
        (couponData?.min_value && total < couponData?.min_value))
    ) {
      dispatch({ type: CLEAR_COUPON });
      dispatch({
        type: CALCULATE_FINAL_TOTAL,
        payload: Math.max(subTotal - discount, 0) || 0,
      });
      MyToast(
        `Please add more items to use coupon`,
        "error",
        "rgba(217,92,92,.95)"
      );
    } else if (couponData?.coupon_id) {
      dispatch({
        type: CALCULATE_FINAL_TOTAL,
        payload: Math.max(totalAfterCoupon, 0) || 0,
      });
    } else {
      dispatch({
        type: CALCULATE_FINAL_TOTAL,
        payload: Math.max(subTotal - discount, 0) || 0,
      });
    }
  }, [couponData?.coupon_id, subTotal]);

  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Sub-total</p>
        {
          <span>
            {amoutRateConversion(subTotal || 0, currencyRate, currencyCode)}
          </span>
        }
      </div>
      {
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p>Shipping</p>
          <span>
            {amoutRateConversion(shipping || 0, currencyRate, currencyCode)}
          </span>
        </div>
      }
      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Discount</p>
        <span>
          {amoutRateConversion(discount || 0, currencyRate, currencyCode)}
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
        <p>Total</p>
        <span>
          {amoutRateConversion(total || 0, currencyRate, currencyCode)}
        </span>
      </div>
      {couponData?.coupon_id && (
        <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
          <p>Coupon Discount</p>
          <span>
            {amoutRateConversion(
              couponDiscount || 0,
              currencyRate,
              currencyCode
            )}
          </span>
        </div>
      )}
      {couponData?.coupon_id && (
        <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
          <p>Total After Coupon</p>
          <span>
            {amoutRateConversion(
              totalAfterCoupon || 0,
              currencyRate,
              currencyCode
            )}
          </span>
        </div>
      )}
    </>
  );
};

export default CartTotal;
