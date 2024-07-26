import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderDetailsRequest } from "../../redux/actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../assets/images/loader.gif";
import OrderDetailItem from "./OrderDetailItem";
import { symbolAmount } from "../../utils/Helper";
import OrderCartTotal from "./OrderCartTotal";
import { TbArrowBackUp } from "react-icons/tb";
import { handleGlobalId, handleIconId } from "../../redux/actions/AuthAction";

function OrderHistoryDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = Number(location?.state?.id);
  const [loading, setLoading] = useState(false);
  const orderDetails = useSelector(
    (state) => state.OrderReducerData.orderDetails
  );
  const loginData = useSelector((state) => state.AuthReducerData?.loginUser);

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId]);

  useEffect(() => {
    if (loginData?.token) {
      dispatch(getOrderDetailsRequest(loginData?.token, orderId, setLoading, navigate));
    }
  }, [orderId, loginData?.token]);

  const orderInvoiceData =
    orderDetails &&
    orderDetails?.order_head_data &&
    orderDetails?.order_head_data?.head;

  const orderProducts = orderDetails && orderDetails?.products_data;

  let currencyCode;

  if (orderProducts) {
    currencyCode = Object.values(orderProducts)[0].currency_iso_code;
  }

  if (orderInvoiceData) {
    orderInvoiceData.currencyCode = currencyCode;
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const handleTotal = (order) => {
    let total;
    if (order?.price === order?.sale_price) {
      total = order?.product_quantity * order?.price;
    } else {
      total = order?.product_quantity * order?.sale_price;
    }
    return total.toFixed(2);
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-6">
            <div className="cart-sec">
              <div className="cart-heading d-flex align-items-center">
                <div
                  className="back-arrow"
                  style={{ cursor: "pointer", paddingRight: "8px" }}
                  id="back"
                  onClick={(event) => {
                    const addressId = event.currentTarget.id;
                    navigate("/my-account");
                    dispatch(handleGlobalId(addressId));
                    dispatch(handleIconId("v-pills-order"));
                  }}
                >
                  <TbArrowBackUp
                    color="#219ebc"
                    size={25}
                    // onClick={() => {
                    //   navigate("/my-account");
                    // }}
                  />
                </div>
                <h1>Order Details</h1>
              </div>
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

              {loading ? (
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center ">
                      <img
                        src={loader}
                        alt="Loading Related Products"
                        style={{ maxWidth: "100px" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {orderProducts &&
                    Object.values(orderProducts).map((order) => {
                      return (
                        <OrderDetailItem
                          key={`${order.product_id}-${order?.variant_combo_id}`}
                          productName={
                            order?.product_name +
                              (order?.variant_name_combo
                                ? "(" + order?.variant_name_combo + ")"
                                : "") || null
                          }
                          productImage={order?.image_path}
                          totalProduct={symbolAmount(
                            handleTotal(order),
                            order?.currency_iso_code
                          )}
                          productQuantity={order?.product_quantity || null}
                          productDiscount={symbolAmount(
                            order?.sale_price,
                            order?.currency_iso_code
                          )}
                          productPrice={symbolAmount(
                            order?.price,
                            order?.currency_iso_code
                          )}
                        />
                      );
                    })}
                </>
              )}
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="cart-total">
              <div className="cart-heading">
                <h2>Order Summary</h2>
              </div>

              {loading ? (
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center ">
                      <img
                        src={loader}
                        alt="Loading Related Products"
                        style={{ maxWidth: "100px" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // <OrderConfirmationCheckout {...orderInvoiceData} />

                <OrderCartTotal {...orderInvoiceData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderHistoryDetail;
