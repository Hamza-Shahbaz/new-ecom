import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../../../assets/images/loader.gif";
import { amoutRateConversion } from "../../../../utils/Helper";
import { GET_CURRENT_COUPONS } from "../../../../redux/constant/constants";

const tableHeads = [
  { name: "Discount", className: "date" },
  { name: "Code", className: "status" },
];

const CouponsAndDealsModal = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const handleClose = () => setShowModal(!showModal);
  const loginData = useSelector((state) => state.AuthReducerData?.loginUser);
  const todayCoupons = useSelector(
    (state) => state.siteSettingReducerData?.todayCoupons
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!todayCoupons || todayCoupons?.length < 1) {
      dispatch({ type: GET_CURRENT_COUPONS, payload: setLoading });
    }
  }, []);

  return (
    <>
      {loginData?.token && todayCoupons?.length > 0 && (
        <Modal show={showModal} onHide={handleClose}>
          <div
            className="modal-md model-sec"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="modal-content">
              <div className="modal-body">
                <div className="row align-items-center">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="user-account">
                      <div className="account-body">
                        {!loading ? (
                          <div className="order-history voucher-details">
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="recent-order">
                                  <div className="top-heading">
                                    <span>COUPON DETAILS</span>
                                    <button
                                      onClick={(e) => setShowModal(false)}
                                      className="btn-close"
                                    ></button>
                                  </div>
                                  <div className="voucher-tabs">
                                    <div className="tab-content">
                                      <div
                                        className="tab-pane fade active show"
                                        aria-labelledby="availableVoucher-tab"
                                      >
                                        <div className="order-titles d-lg-flex d-none">
                                          {tableHeads.map((item) => (
                                            <div
                                              className={`d-flex justify-content-center ${item.className}`}
                                              key={item.name + "tableHead"}
                                            >
                                              <span
                                                className="text-capitalize"
                                                style={{
                                                  marginRight:
                                                    item.name === "Code"
                                                      ? "50px"
                                                      : "0px",
                                                }}
                                              >
                                                {item.name}
                                              </span>
                                            </div>
                                          ))}
                                        </div>

                                        {todayCoupons?.length > 0 ? (
                                          todayCoupons
                                            ?.filter(
                                              (item) => !item.used_coupon_id
                                            )
                                            .map((item) => (
                                              <CouponItem
                                                key={item?.coupon_id}
                                                item={item}
                                              />
                                            ))
                                        ) : (
                                          <div className="container justify-content-center mt-4">
                                            <div className="d-flex justify-content-center my-4 mb-2">
                                              <p className="reviewTextStyle">
                                                No available Coupons yet!
                                              </p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CouponsAndDealsModal;

function CouponItem({ item }) {
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;

  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";
  const [isMediumOrAbove, setIsMediumOrAbove] = useState(
    window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrAbove(window.innerWidth >= 1023);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="order-info">
      <div className="date">
        <span className="d-lg-none">Discount: </span>
        <span className="d-flex justify-content-center">
          {item.type == "percentage"
            ? item.value + "%"
            : amoutRateConversion(item.value || 0, currencyRate, currencyCode)}
        </span>
      </div>
      <div className="date">
        <span className="d-lg-none">Code: </span>
        <span
          className="d-flex justify-content-center"
          style={isMediumOrAbove ? { marginRight: "50px" } : {}}
        >
          {item.code_number || ""}
        </span>
      </div>
    </div>
  );
}
