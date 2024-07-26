import React, { useEffect, useState } from "react";
import OrderHistoryItem from "./OrderHistoryItem";
import { Link, useNavigate } from "react-router-dom";
import { fetchOrderStatusRequest } from "../../../../redux/actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import { symbolAmount } from "../../../../utils/Helper";
import loader from "../../../../assets/images/loader.gif";
import { handleGetWorkQueue } from "../../../../redux/actions/AuthAction";

function OrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const iconID = useSelector((state) => state.tabsId?.id);
  const loginData = useSelector((state) => state.AuthReducerData?.loginUser);
  const orderResponse = useSelector((state) => state.OrderReducerData?.orders);
  const orderData = orderResponse?.data?.order_data || {};
  const orders = orderData && Object.values(orderData);

  const [loading, setLoading] = useState(false);
  const itemsPerPage = orderResponse?.per_page ? orderResponse?.per_page : 0;

  const totalPages = orderResponse?.total
    ? Math.ceil(orderResponse.total / itemsPerPage)
    : 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(Math.min(totalPages, 5));

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    if ( loginData?.token && iconID === "v-pills-order") {
      dispatch(
        fetchOrderStatusRequest(
          loginData?.token,
          currentPage,
          itemsPerPage,
          setLoading,
          dispatch,
          navigate,
          onTop
        )
      );
    }
  }, [loginData?.token, iconID, currentPage]);

  useEffect(() => {
    if (orderResponse?.current_page) {
      setCurrentPage(orderResponse.current_page);
    }
  }, [orderResponse]);

  useEffect(() => {
    if (totalPages) {
      setEndPage(Math.min(totalPages, 5));
    }
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handlePageClick = (pageNumber) => {
    // onTop();
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (startPage > 1) {
      setStartPage(startPage - 1);
      setEndPage(endPage - 1);
    }
  };

  const goToNextPage = () => {
    if (endPage < totalPages) {
      setStartPage(startPage + 1);
      setEndPage(endPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Link
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => handlePageClick(i)}
        >
          {String(i).padStart(2, "0")}
        </Link>
      );
    }
    return pageNumbers;
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "pending":
      case "Pending":
        return "#219ebc";
      case "unshipped":
      case "Unshipped":
        return "#fa8232";
      case "shipped":
      case "Shipped":
        return "#2db224";
      case "canceled":
      case "Canceled":
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

  function handleRefresh() {
    dispatch(
      fetchOrderStatusRequest(
        loginData?.token,
        currentPage,
        itemsPerPage,
        setLoading,
        dispatch,
        navigate,
        onTop
      )
    )
    dispatch(handleGetWorkQueue());
  }

  return (
    <div className="product-sec pt-0">
      <div className="right">
        <div className="order-history">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="recent-order">
                <div className="top-heading">
                  <span>ORDER HISTORY</span>
                  <div className="mb-0">
                    <button
                      className="btn btn-theme-yellow"
                      disabled={loading}
                      onClick={() => {
                        handleRefresh();
                      }}
                    >
                      Refresh{" "}
                      {loading ? (
                        <i className="fas fa-sync-alt fa-spin"></i>
                      ) : (
                        <i className="fas fa-sync-alt"></i>
                      )}
                    </button>
                  </div>
                </div>

                {
                  <>
                    {!loading ? (
                      <>
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

                        {orders?.length ? (
                          orders.map((order) => {
                            return (
                              <OrderHistoryItem
                                key={order?.order_id}
                                orderId={order?.order_serial_no}
                                orderStatus={order?.order_status_title}
                                orderDate={order?.created_at}
                                color={getOrderStatusColor(
                                  order?.order_status_title
                                )}
                                orderTotal={symbolAmount(
                                  order?.net_total,
                                  order?.currency_iso_code
                                )}
                                onOrderDetailClick={() =>
                                  orderDetailHandler(order?.order_id)
                                }
                                cancelId = {order?.order_id}
                                cancelSuccess = {handleRefresh}
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
                            <p className="reviewTextStyle">
                              No Order History yet
                            </p>
                          </div>
                        )}

                        {orderResponse?.total > itemsPerPage && (
                          <div className="pagination justify-content-center mt-5">
                            <div className="page-number">
                              {startPage > 1 && (
                                <Link
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    goToPreviousPage();
                                  }}
                                >
                                  <i className="fa fa-angle-left" />
                                </Link>
                              )}

                              {renderPageNumbers()}

                              {endPage < totalPages && (
                                <Link
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    goToNextPage();
                                  }}
                                >
                                  <i className="fa fa-angle-right" />
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </>
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
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
