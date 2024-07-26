import React from "react";
import { symbolAmount } from "../../utils/Helper";

const OrderCartTotal = ({
  sub_total,
  discount,
  coupon_amount,
  net_total,
  order_serial_no,
  payment_method,
  created_at,
  currencyCode,
  net_shipping
}) => {
  const renderValue = (value) => {
    if (!currencyCode) {
      return value;
    }
    if (!value) {
      return symbolAmount(parseInt(0).toFixed(2), currencyCode);
    }
    return symbolAmount(value.toFixed(2), currencyCode);
  };

  const dateObject = new Date(created_at);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Order ID</p>
        <span>{order_serial_no}</span>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Time Order</p>
        <span>{formattedDate}</span>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Payment Method</p>
        <span>{payment_method}</span>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Sub-total</p>
        <span>{renderValue(sub_total)}</span>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Discount</p>
        <span>{renderValue(discount)}</span>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Coupon Amount</p>
        <span>{renderValue(coupon_amount)}</span>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <p>Shipping Charges</p>
        <span>{renderValue(net_shipping)}</span>
      </div>

      <hr />

      <div className="d-flex align-items-center justify-content-between mt-3">
        <p>Total</p>
        <span>{renderValue(net_total)}</span>
      </div>
    </>
  );
};

export default OrderCartTotal;
