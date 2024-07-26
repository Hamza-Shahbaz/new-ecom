import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetAddressData,
  handlePath,
  handleRemoveAddressData,
  handleSelectedAddressId,
  handleSetAddAddress,
} from "../../../../redux/actions/AuthAction";
import { Link, useNavigate } from "react-router-dom";
import ShippingAddressForm from "../Settings/ShippingAddressForm";
import AddressItem from "./AddressItem";
import loader from "../../../../assets/images/loader.gif";

function CardnAddress({ location }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [removeDataloading, setremoveDataloading] = useState({});

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  const statusResponse = useSelector(
    (state) => state.addressesReducerData.status
  );

  const addressesData = useSelector(
    (state) => state.addressesReducerData?.addressesData
  );

  const userAddress = addressesData?.addresses || {};
  // console.clear();

  const status = useSelector((state) => state.addressesReducerData?.status);
  const path = useSelector((state) => state.addressesReducerData?.pathCheckout);
  const pathDashboard = useSelector(
    (state) => state.addressesReducerData?.pathDashboard
  );

  useEffect(() => {
    if (status) {
      if (pathDashboard !== "/my-account") {
        dispatch(handleSetAddAddress(false));
      }
    } else if (status) {
      if (pathDashboard === "/my-account") {
        dispatch(handleSetAddAddress(false));
      }
    }
  }, [pathDashboard]);

  useEffect(() => {
    if (status && path !== "/checkout") {
      dispatch(handleSetAddAddress(false));
    } else if (!status && path === "/checkout") {
      dispatch(handleSetAddAddress(true));
    } else if (status && path === "/checkout") {
      dispatch(handleSetAddAddress(false));
    }
  }, [path, dispatch]);

  // useEffect(() => {
  //   if (status) {
  //     if (path !== "/checkout" || pathDashboard !== "/my-account") {
  //       dispatch(handleSetAddAddress(false));
  //     } else {
  //       dispatch(handleSetAddAddress(false));
  //     }
  //   } else {
  //     if (path === "/checkout" || pathDashboard === "/my-account") {
  //       dispatch(handleSetAddAddress(true));
  //     }
  //   }
  // }, [path, pathDashboard, dispatch]);

  useEffect(() => {
    if (loginData?.token && Object.keys(userAddress)?.length === 0) {
      dispatch(
        handleGetAddressData(loginData?.token, setLoading, dispatch, navigate)
      );
    }
  }, [loginData?.token]);

  const handleRemoveAddress = (id) => {
    if (loginData?.token) {
      const setRemoveLoading = (isLoading) => {
        setremoveDataloading((prev) => ({ ...prev, [id]: isLoading }));
      };
      dispatch(
        handleRemoveAddressData(
          loginData?.token,
          id,
          setRemoveLoading,
          dispatch,
          navigate,
          setLoading
        )
      );
    }
  };

  return (
    <div className="card-address">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          {!statusResponse ? (
            <div className="payment-sec">
              <div className="top-heading">
                <span>Your Addresses</span>
                <Link
                  onClick={() => {
                    // setAddAddress(true);
                    dispatch(handleSetAddAddress(true));
                    // setSelectedAddressId(null);
                    dispatch(handleSelectedAddressId(null));
                    dispatch(handlePath(location || "/my-account"));
                  }}
                >
                  Add New Address <i className="fa fa-angle-right ms-1" />
                </Link>
              </div>

              <div className="row mt-3 ">
                {!loading && addressesData ? (
                  userAddress?.length ? (
                    userAddress.map((item) => {
                      if (!item) return null;
                      return (
                        <AddressItem
                          key={item?.address_id}
                          username={item?.name || ""}
                          address={`${item?.street_address}, ${item?.city}, ${item?.state}, ${item?.country}`}
                          phone={item?.phone_number || ""}
                          // addAddress={statusResponse}
                          // setAddAddress={setAddAddress}
                          removeDataloading={
                            removeDataloading[item?.address_id]
                          }
                          onClickremoveAddress={() =>
                            handleRemoveAddress(item?.address_id)
                          }
                          onClickEditAddress={() => {
                            dispatch(handleSetAddAddress(true));
                            dispatch(handleSelectedAddressId(item?.address_id));
                            dispatch(handlePath(location || "/my-account"));
                            // setSelectedAddressId(item?.address_id);
                          }}
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
                      <p className="reviewTextStyle">No Addresses found yet!</p>
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
          ) : (
            <div className="payment-sec">
              <div className="col-xl-12 col-lg-12 col-md-12 mt-2">
                <ShippingAddressForm />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardnAddress;
