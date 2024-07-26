import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_ADDRESS_SUCCESS } from "../../../redux/constant/constants";
import loader from "../../../assets/images/loader-new.gif";
import { MyToast, toast } from "../../../components/Toast/MyToast";
import {
  handleCheckoutPath,
  handleGetAddressData,
  handleGlobalId,
  handleIconId,
  handlePath,
  handleSelectedAddressId,
  handleSetAddAddress,
} from "../../../redux/actions/AuthAction";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { saveAddress } from "../../../redux/actions/OrderAction";
import ShippingOptionsForm from "./ShippingOptionsForm";
import Modal from "react-bootstrap/Modal";
import CustomLoader from "../../../components/Toast/CustomLoader";

const BillingForm = ({
  setActiveSection,
  setAllowNavigation,
  location,
  setIsApiLoading,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.AuthReducerData?.loginUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnselected, setIsUnselected] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(false);

  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);

  const selectedOptions = useSelector(
    (state) => state?.handleCartItem?.selectedShippingOptions
  );

  const addressesData = useSelector(
    (state) => state.addressesReducerData?.addressesData
  );

  const templates = useSelector(
    (state) => state?.handleCartItem?.shippingTemplates
  );

  const allAddresses = addressesData?.addresses || [];

  useEffect(() => {
    if (loginData?.token && allAddresses?.length === 0) {
      dispatch(
        handleGetAddressData(loginData?.token, setLoading, dispatch, navigate)
      );
    }
  }, [loginData?.token]);

  useEffect(() => {
    if (!loginData?.token) {
      navigate("/login");
    }
  }, [loginData?.token]);

  // useEffect(() => {
  //   if (loginData?.token) {
  //     dispatch(
  //       handleGetAddressData(loginData?.token, setLoading, dispatch, navigate)
  //     );
  //   }
  // }, [loginData?.token]);

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [confirmedAddressId, setConfirmedAddressId] = useState("");
  const [selectedBillingAddress, setSelectedBillingAddress] = useState("");
  const [confirmedBillingAddressId, setConfirmedBillingAddressId] =
    useState("");

  const [showBillingAdrress, setShowBillingAddress] = useState(false);

  useEffect(() => {
    if (allAddresses) {
      setSelectedAddressId(allAddresses?.[0]?.address_id);
      setConfirmedAddressId(allAddresses?.[0]?.address_id);
    }
  }, [addressesData]);

  const handleSubmit = () => {
    if (allAddresses?.length < 1) {
      toast.clearWaitingQueue();
      MyToast(
        "Please add address in account settings",
        "error",
        "rgba(217,92,92,.95)"
      );
      return;
    }
    const address = {
      shipping_address_id: confirmedAddressId,
      billing_address_id: confirmedBillingAddressId || confirmedAddressId,
    };

    dispatch(
      saveAddress(
        allAddresses.filter((item) => item.address_id === confirmedAddressId)[0]
      )
    );
    dispatch({ type: ADD_ADDRESS_SUCCESS, payload: address });
    setAllowNavigation(true);
    setActiveSection("Payment");
  };

  return (
    <>
      {showModal && (
        <>
          <Modal show={showModal} centered style={{ backgroundColor: "transparent" }} dialogClassName="modal-dialog-centered modal-transparent">
            <div
              className="modal-md model-sec"
              style={{ backgroundColor: "transparent" }}
            >
                  <div className="row align-items-center justify-content-center">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div style={{background:"transparent !important"}}>
                        <div className="container mt-3">
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
                      </div>
                    </div>
                  </div>
            </div>
          </Modal>
        </>
      )}
      <div className="accordion" id="accordionExample">
        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Choose your address
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="radio-btn">
                    {!loading && addressesData ? (
                      allAddresses?.length ? (
                        allAddresses.map((item) => {
                          return (
                            <div
                              className="mb-4 w-100"
                              key={`${item.address_id}_shippingAddress`}
                            >
                              <div className="card">
                                <div className="card-body">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="shippingAddress"
                                      checked={
                                        item.address_id === selectedAddressId
                                      }
                                      onChange={() => {
                                        setSelectedAddressId(item.address_id);
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      style={{ wordBreak: "break-word" }}
                                    >
                                      <strong>{item?.name || ""}</strong>
                                      <br />
                                      {`${item.street_address}, ${item.city}, ${item.state}, ${item.country}`}
                                      <br />
                                    </label>

                                    <div
                                      style={{
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#219ebc",
                                        width: "100px",
                                      }}
                                      id="edit-address-id"
                                      className="pt-1"
                                      onClick={(event) => {
                                        const addressId =
                                          event.currentTarget.id;
                                        if (loginData?.token) {
                                          navigate("/my-account");
                                          dispatch(handleGlobalId(addressId));
                                          dispatch(
                                            handleIconId("v-pills-address")
                                          );
                                          dispatch(handleSetAddAddress(true));
                                          dispatch(
                                            handlePath(location || "/checkout")
                                          );
                                          dispatch(
                                            handleCheckoutPath(
                                              location || "/checkout"
                                            )
                                          );

                                          dispatch(
                                            handleSelectedAddressId(
                                              item?.address_id
                                            )
                                          );
                                        } else {
                                          navigate("/login");
                                        }
                                      }}
                                    >
                                      Edit Address
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                            No Addresses found yet!
                          </p>
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

                  <div
                    style={{
                      cursor: "pointer",
                      color: "#219ebc",
                    }}
                    id="edit-address-id"
                    className="new-address d-flex align-items-center justify-content-between"
                    onClick={(event) => {
                      const addressId = event.currentTarget.id;
                      if (loginData?.token) {
                        navigate("/my-account");
                        dispatch(handleGlobalId(addressId));
                        dispatch(handleIconId("v-pills-address"));
                        dispatch(handleSetAddAddress(true));
                        dispatch(handleSelectedAddressId(null));
                        dispatch(handlePath(location || "/my-account"));
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    <div className="d-flex align-items-start" style={{
                      minWidth:"120px"
                    }}>
                      <AiOutlinePlusCircle
                        size={25}
                        style={{ marginRight: "5px" }}
                      />
                      Add new address
                    </div>
                    <button
                    className="btn btn-theme"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setConfirmedAddressId(selectedAddressId);
                      }}
                      style={{
                        color : selectedAddressId != confirmedAddressId ? "red" : "",
                        width : 'auto',
                        cursor:"pointer"
                      }}
                    >
                      Use Selected Address
                    </button>
                  </div>
                  <div></div>
                  <hr style={{ color: "#e4e7e9" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={!showBillingAdrress}
                onChange={(e) => {
                  setShowBillingAddress(!showBillingAdrress);
                  if (!selectedBillingAddress) {
                    setSelectedBillingAddress(selectedAddressId);
                    setConfirmedBillingAddressId(selectedAddressId);
                  }
                }}
              />
              <label className="form-check-label">
                Use Same Address for Billing
              </label>
            </div>
          </div>
          {showBillingAdrress && (
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Choose a billing address
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <h2>Your Address</h2>
                    <div className="radio-btn">
                      {allAddresses?.length ? (
                        allAddresses.map((item) => {
                          return (
                            <div
                              className="mb-4 w-100"
                              key={`${item.address_id}_shippingAddress`}
                            >
                              <div className="card">
                                <div className="card-body">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="billingAddress"
                                      checked={
                                        item.address_id ===
                                        selectedBillingAddress
                                      }
                                      onChange={() => {
                                        setSelectedBillingAddress(
                                          item.address_id
                                        );
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      style={{ wordBreak: "break-word" }}
                                    >
                                      <strong>{item?.name || ""}</strong>
                                      <br />
                                      {`${item.street_address}, ${item.city}, ${item.state}, ${item.country}`}
                                      <br />
                                    </label>

                                    <div
                                      style={{
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#219ebc",
                                        width: "100px",
                                      }}
                                      id="edit-address-id"
                                      className="pt-1"
                                      onClick={(event) => {
                                        const addressId =
                                          event.currentTarget.id;
                                        if (loginData?.token) {
                                          navigate("/my-account");
                                          dispatch(handleGlobalId(addressId));
                                          dispatch(
                                            handleIconId("v-pills-address")
                                          );
                                          dispatch(handleSetAddAddress(true));
                                          dispatch(
                                            handlePath(location || "/checkout")
                                          );

                                          dispatch(
                                            handleSelectedAddressId(
                                              item?.address_id
                                            )
                                          );
                                        } else {
                                          navigate("/login");
                                        }
                                      }}
                                    >
                                      Edit Address
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                            No Addresses found yet!
                          </p>
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                        color: "#219ebc",
                      }}
                      id="edit-address-id"
                      className="new-address d-flex align-items-center justify-content-between"
                      onClick={(event) => {
                        const addressId = event.currentTarget.id;
                        if (loginData?.token) {
                          navigate("/my-account");
                          dispatch(handleGlobalId(addressId));
                          dispatch(handleIconId("v-pills-address"));
                          dispatch(handleSetAddAddress(true));
                          dispatch(handleSelectedAddressId(null));
                          dispatch(handlePath(location || "/my-account"));
                        } else {
                          navigate("/login");
                        }
                      }}
                    >
                      <div className="d-flex align-items-start">
                        <AiOutlinePlusCircle
                          size={25}
                          style={{ marginRight: "5px" }}
                        />
                        Add new address
                      </div>
                      <button
                      className="btn btn-theme"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setConfirmedBillingAddressId(selectedBillingAddress);
                        }}
                        style={{
                          color : selectedBillingAddress != confirmedBillingAddressId ? "red" : "",
                          width : 'auto',
                          cursor:"pointer"
                        }}
                      >
                        Use Selected Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <ShippingOptionsForm
          shippingAddressId={confirmedAddressId}
          setIsApiLoading={setShowModal}
        />
        <div className="col-md-12">
          <div className="mb-3">
            <button
              className="btn btn-theme w-100"
              disabled={isLoading || templates.some((item) => Object.keys(item.shipping_options || {}).length < 1 )}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <CustomLoader size={10} color={"#ffb703"} />
              ) :  templates.some((item) => Object.keys(item.shipping_options || {}).length < 1 ) ? <p>This address is not available</p> : (
                <>Confirm</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingForm;
