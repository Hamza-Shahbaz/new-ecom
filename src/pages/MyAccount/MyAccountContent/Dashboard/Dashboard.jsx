import React, { useEffect, useState } from "react";
import cardImage1 from "../../../../assets/images/CardImage1.png";
import cardImage2 from "../../../../assets/images/CardImage2.png";
import { Link, useNavigate } from "react-router-dom";
import { handleIconId } from "../../../../redux/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import { fetchOrderStatusRequest } from "../../../../redux/actions/OrderAction";
import { symbolAmount } from "../../../../utils/Helper";
import loader from "../../../../assets/images/loader.gif";
import OrderHistoryItem from "../OrderHistory/OrderHistoryItem";

function Dashboard({location}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  const dashboardData = useSelector(
    (state) => state.dashboardReducerData?.dashboardData
  );

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "pending" || "Pending":
        return "#219ebc";
      case "unshipped" || "Unshipped":
        return "#fa8232";
      case "shipped" || "Shipped":
        return "#2db224";
      case "canceled" || "Canceled":
        return "#ee5858";
      default:
        return null;
    }
  };

  function orderDetailHandler(id) {
    navigate("/order-history-detail", {
      state: { id: id },
    });
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="account-inner">
      <span>
        Hello,{" "}
        {(loginData &&
          loginData?.first_name + " " + (loginData?.last_name || "")) ||
          ""}
      </span>
      <p>
        From your Account dashboard you can easily manage your {"  "}
        <Link
          onClick={() => {
            dispatch(handleIconId("v-pills-address"));
          }}
        >
         Addresses
        </Link>{" "}
        and edit your{" "}
        <Link
          onClick={() => {
            dispatch(handleIconId("v-pills-password"));
          }}
        >
          Password
        </Link>{" "}
        and{" "}
        <Link
          onClick={() => {
            dispatch(handleIconId("v-pills-settings"));
          }}
        >
          Account Details
        </Link>
        .
      </p>
      <div className="row">
        <div className="col-xl-4 col-lg-6 col-md-12">
          <div className="account-info">
            <UserInfo infoHeading={"ACCOUNT INFO"} type={"Account Info"} />
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12">
          <div className="billing-info">
            <UserInfo infoHeading={"ADDRESS"} type={"Billing Info"} location={location}/>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12">
          <div className="order-count mb-2">
            <UserInfo type={"Order Data"} />
          </div>
        </div>
      </div>

      <div className="order-history">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="recent-order">
              <div className="top-heading">
                <span>RECENT ORDER</span>
                {/* <div className="mb-0">
                  <button
                    className="btn btn-theme-yellow"
                    disabled={loading}
                    onClick={() => {
                      dispatch(
                        fetchOrderStatusRequest(
                          loginData?.token,
                          setLoading,
                          dispatch,
                          navigate
                        )
                      );
                    }}
                  >
                    Refresh{" "}
                    {loading ? (
                      <i className="fas fa-sync-alt fa-spin"></i>
                    ) : (
                      <i className="fas fa-sync-alt"></i>
                    )}
                  </button>
                </div> */}
              </div>
              <div className="order-titles d-lg-flex d-none">
                <div className="orderid">
                  <span>Order ID</span>
                </div>
                <div className="status">
                  <span>Status</span>
                </div>
                <div className="date">
                  <span>Date</span>
                </div>
                <div className="total">
                  <span>Total</span>
                </div>
                <div className="action">
                  <span>Action</span>
                </div>
              </div>

              {dashboardData ? (
                dashboardData?.recent_orders?.length ? (
                  Object.values(dashboardData?.recent_orders).map((item) => {
                    if (!item) return null;
                    return (
                      <OrderHistoryItem
                        key={item?.order_id}
                        orderId={item?.order_serial_no}
                        orderStatus={item?.order_status_title}
                        orderDate={item?.created_at}
                        color={getOrderStatusColor(item?.order_status_title)}
                        orderTotal={symbolAmount(
                          item?.net_total,
                          item?.currency_iso_code
                        )}
                        onOrderDetailClick={() =>
                          orderDetailHandler(item?.order_id)
                        }
                      />
                    );
                  })
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <p className="reviewTextStyle">No Recent Order yet</p>
                  </div>
                )
              ) : (
                <div className="container mt-3">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center">
                      <img
                        src={loader}
                        alt="Loading Related Products"
                        style={{ width: "100px" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
