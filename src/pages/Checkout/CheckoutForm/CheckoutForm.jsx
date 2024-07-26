import React, { useEffect, useState } from "react";
import BillingForm from "./BillingForm";
import PaymentForm from "./PaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { cartForApi } from "../../../utils/Helper";
import { useLocation, useNavigate } from "react-router-dom";
import { CartUpdatingHandler } from "../../../redux/actions/AuthAction";
import loader from "../../../assets/images/loader.gif";
import ShippingOptionsForm from "./ShippingOptionsForm";

const CheckoutForm = ({
  activeSection,
  setActiveSection,
  setAllowNavigation,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  const [isLoading, setIsLoading] = useState(true);
  const [apiLoading, setIsApiLoading] = useState(true);

  const cartForApiData = cartForApi(cartData);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    dispatch(
      CartUpdatingHandler(
        null,
        cartForApiData,
        setIsLoading,
        dispatch,
        navigate
      )
    );
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsApiLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  const location = useLocation();

  return (
    <div className="col-xl-8 col-lg-8 col-md-7">
      <div className="checkout-form" onChange={() => {}}>
        {!apiLoading &&
          (activeSection !== "Payment" ? (
            <>
              <BillingForm
                setActiveSection={setActiveSection}
                setAllowNavigation={setAllowNavigation}
                location={location?.pathname}
                setIsApiLoading={setIsApiLoading}
              />
            </>
          ) : (
            <PaymentForm />
          ))}

        {apiLoading && (
          <div className="container mt-3">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center ">
                <img src={loader} style={{ width: "100px" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
