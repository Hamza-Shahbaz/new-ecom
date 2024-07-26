import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { parseISO, differenceInMinutes } from "date-fns";
import { BaseUrl, EndPoints } from "../../../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import CustomLoader from "../../../../components/Toast/CustomLoader";
import { USER_AUTH_ERROR } from "../../../../redux/constant/constants";
import { MyToast } from "../../../../components/Toast/MyToast";

function OrderHistoryItem({
  orderId,
  orderStatus,
  orderDate,
  orderTotal,
  onOrderDetailClick,
  color,
  cancelId,
  cancelSuccess,
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showLoader, setShowLoader] = useState(false)
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  const loginData = useSelector((state) => state.AuthReducerData?.loginUser);

  // Parse the order date
  const parsedOrderDate = new Date(orderDate);

  // Get the current date in GMT
  const currentDate = new Date((new Date()).toLocaleString(undefined, { timeZone: 'Europe/London' }))

  // Calculate the difference in minutes between the current date and the order date
  const timeDifference = differenceInMinutes(currentDate, parsedOrderDate);

  const handleCancel = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let body = new FormData();
      body.append("order_id", cancelId);
      const myHeaders = new Headers();
      myHeaders.append("Authentication", loginData?.token);
      const response = await fetch(BaseUrl + EndPoints.cancel_order, {
        headers: myHeaders,
        body,
        method: "POST",
      });
      const reponseData = await response.json();
      if (reponseData.status) {
        cancelSuccess();
      }
      else if (reponseData?.status == "401" || reponseData?.status == "403") {
        dispatch({type : USER_AUTH_ERROR, navigate})
      }
    } catch (e) {
      MyToast(e,"error")
      // console.log(e);
    }
  };

  const handleClose = () => {
    setShowModal(false);
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
                          <span>Please confirm cancelation</span>
                          <button
                            onClick={(e) => setShowModal(false)}
                            className="btn-close"
                          ></button>
                        </div>
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <button onClick={(e) => handleCancel(e)} className="btn btn-theme-yellow mt-2 w-100 model-discount-invert-span">
                              {showLoader ? <CustomLoader size={10} color={"#ffffff"} /> : "Cancel order"}
                            </button>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <button onClick={(e) => setShowModal(false)} className="btn btn-theme mt-2 w-100" disabled={showLoader}>
                              Return
                            </button>
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
        className="order-info"
        onClick={(e) => {
          if (!orderStatus.includes("canceled")) {
            onOrderDetailClick();
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <div
          className="orderid"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <span className="d-lg-none">Order ID: </span>
          <span>{orderId}</span>
        </div>
        <div className="status">
          <span className="d-lg-none">Status:</span>
          <span style={{ color: color }}>{orderStatus}</span>
        </div>
        <div className="date">
          <span className="d-lg-none">Date:</span>
          <span>{orderDate}</span>
        </div>
        <div className="total">
          <span className="d-lg-none">Total:</span>
          <span>{orderTotal}</span>
        </div>
        {!orderStatus.includes("canceled") ? (
          <div className="action d-flex flex-row">
            <span className="d-lg-none">Action:</span>
            <span>
              <Link to="/order-history-detail">
                View Details <i className="fa fa-angle-right ms-2" />
              </Link>
              {timeDifference < ((Number(siteSettingsData?.order_max_cancel_time)*60) + 60) && !(orderStatus == "shipped") && (
                <button
                  className="btn cancel"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                >
                  Cancel
                </button>
              )}
            </span>
          </div>
        ) : (
          <div className="action"></div>
        )}
      </div>
    </>
  );
}

export default OrderHistoryItem;
