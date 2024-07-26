import React, { useEffect, useState } from "react";
import CustomLoader from "../../../../components/Toast/CustomLoader";
import { useForm } from "react-hook-form";
import { handleTrackOrder } from "../../../../redux/actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TrackOrderHead from "./TrackOrderHead";
import OrderActivityItem from "./OrderActivityItem";
import { symbolAmount } from "../../../../utils/Helper";
import TrackProductItem from "./TrackProductItem";
import TrackOrderBottom from "./TrackOrderBottom";
import icon1 from "../../../../assets/images/orderActivityIcon1.png";
import icon2 from "../../../../assets/images/orderActivityIcon2.png";
import icon3 from "../../../../assets/images/orderActivityIcon3.png";
import icon4 from "../../../../assets/images/orderActivityIcon4.png";

function TrackOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  useEffect(() => {
    onSubmit();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const trackOrderdata = useSelector(
    (state) => state.OrderReducerData.trackOrderData
  );

  const orderHistoryData = trackOrderdata?.order_history;

  const orderProductsData = trackOrderdata?.products_data;

  const trackID = watch("orderID");

  const orderID = trackID && trackID?.trim();

  const orderHeadData = trackOrderdata?.order_head_data?.head;

  const onSubmit = (data) => {
    if (loginData?.token && trackID) {
      dispatch(
        handleTrackOrder(
          data.orderID,
          setLoading,
          loginData?.token,
          setShow,
          navigate,
          setValue
        )
      );
    }
  };

  function formatDate(created_at) {
    if (!created_at) return null;
    const date = new Date(created_at);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  }

  const handleTotal = (item) => {
    let total;
    if (item?.price === item?.sale_price) {
      total = item?.product_quantity * item?.price;
    } else {
      total = item?.product_quantity * item?.sale_price;
    }
    return total.toFixed(2);
  };

  const getOrderStatusImage = (status) => {
    switch (status) {
      case 2 || "pending":
        return icon1;
      case 1 || "unshipped":
        return icon2;
      case 3 || "shipped":
        return icon3;
      case 4 || "canceled":
        return icon4;

      default:
        return null;
    }
  };

  return (
    <div className="track-order">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="order-search">
            <span>Track Order</span>
            <p>
              To track your order please enter your order ID in the input field
              below and press the “Track Order” button. this was given to you on
              your receipt and in the confirmation email you should have
              received.
            </p>
            <form
              action="submit"
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-xl-12 col-md-12">
                  <div className="mb-4">
                    <label>
                      Order ID:{" "}
                      <span
                        className="passtextColor"
                        style={{ fontSize: "20px" }}
                      >
                        *
                      </span>
                    </label>

                    <input
                      placeholder="Please Enter Order ID"
                      {...register("orderID", {
                        required: "Order ID is required",
                        validate: {
                          notOnlySpaces: (value) => {
                            return value.trim() !== "" || "Invalid Input";
                          },
                        },
                      })}
                      className="form-control"
                      autoComplete="off"
                    />
                    {errors?.orderID && (
                      <p
                        role="alert"
                        className="mt-1 mx-1"
                        style={{ color: "red", fontWeight: "400" }}
                      >
                        {errors?.orderID?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-xl-12 col-md-12">
                  <div className="mb-4">
                    <p className="mb-0">
                      <i className="fa fa-info-circle me-1" /> Order ID that we
                      sended to your in your email address.
                    </p>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="mb-0">
                    <button
                      type="submit"
                      className="btn btn-theme-yellow w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <CustomLoader
                          size={10}
                          color={"#219ebc"}
                          style={{ marginBottom: "0px", fontSize: "16px" }}
                        />
                      ) : (
                        <>
                          TRACK ORDER <i className="fa fa-angle-right ms-2" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {show && (
            <div className="search-detail ">
              <div className="order-processing-detail ">
                <TrackOrderHead />
              </div>
              <div className="order-activity">
                <span>Order Activity</span>
                {trackOrderdata &&
                  orderHistoryData?.map((item) => {
                    return (
                      <OrderActivityItem
                        key={item?.order_history_id}
                        orderMessage={item?.comments}
                        duration={formatDate(item?.created_at)}
                        image={getOrderStatusImage(item?.order_status_id)}
                      />
                    );
                  })}
              </div>
              <div className="order-product">
                <div className="order-heading">
                  <span>
                    Product{" "}
                    {trackOrderdata &&
                    orderHeadData?.num_of_products !== undefined
                      ? `( ${orderHeadData.num_of_products} )`
                      : null}
                  </span>
                </div>
                <div className="product-title d-xl-flex d-none">
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
                    <span>Sub-Total</span>
                  </div>
                </div>
                {trackOrderdata &&
                  Object.values(orderProductsData).map((item) => {
                    return (
                      <TrackProductItem
                        key={`${item?.product_id}-${item?.variant_combo_id}`}
                        productName={
                          item?.product_name +
                            (item?.variant_combo_id
                              ? "(" + item?.variant_name_combo + ")"
                              : "") || null
                        }
                        productImage={item?.image_path}
                        totalProduct={symbolAmount(
                          handleTotal(item),
                          item?.currency_iso_code
                        )}
                        productQuantity={item?.product_quantity || null}
                        productDiscount={symbolAmount(
                          item?.sale_price,
                          item?.currency_iso_code
                        )}
                        productPrice={symbolAmount(
                          item?.price,
                          item?.currency_iso_code
                        )}
                      />
                    );
                  })}
              </div>
              <div className="order-address">
                <TrackOrderBottom />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
