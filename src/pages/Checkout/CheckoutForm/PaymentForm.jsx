import React, { useState, useEffect } from "react";
import paypalImage from "../../../assets/images/paypal-icon.png";
import amazonImage from "../../../assets/images/amazon-icon.png";
import debitCardImage from "../../../assets/images/debit-icon.png";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeForm from "./StripeForm";
import CouponsAndDealsModal from "../../../components/Header/CenterHeader/CouponsAndDealsModal/CouponsAndDealsModal";

const paymentOptions = [
  // {
  //   title: "Paypal",
  //   image: paypalImage,
  // },
  // {
  //   title: "Amazon Pay",
  //   image: amazonImage,
  // },
  {
    title: "Debid/Credit Card",
    image: debitCardImage,
  },
];

const PaymentForm = () => {
  const [optionSelected, setOptionSelected] = useState("Debid/Credit Card");
  const navigate = useNavigate()

  const loginData = useSelector((state) => state.AuthReducerData?.loginUser);

  const [showModal, setShowModal] = useState(true)
  const [stripePromise, setStripePromise] = useState("");

  const stripeKey = useSelector(
    (state) =>
      state?.siteSettingReducerData?.siteSettings?.settings?.stripe_publish_key
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    if (stripeKey) {
      setStripePromise(loadStripe(stripeKey));
    }
  }, [stripeKey]);
  if(!loginData?.token) {
    navigate('/login', {state:"/checkout"})
  }

  return (
    <>
          {showModal && <CouponsAndDealsModal showModal={showModal} setShowModal={setShowModal} />}
      <form className="needs-validation" onSubmit={(e) => e.preventDefault}>
        <div className="col-md-12 border-b-0">
          <div className="payment-option border-b-0">
            <div className="payment-heading">
              <h2>Payment Options</h2>
            </div>
            <div className="radio-btn d-flex flex-row justify-content-evenly items-center">
              {paymentOptions.map((item, index) => (
                <div
                  className="d-flex flex-column align-items-center justify-between"
                  key={index}
                >
                  <img src={item.image} alt="paypal" />
                  <span>{item.title}</span>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      onChange={(e) => setOptionSelected(item.title)}
                      checked={optionSelected === item.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      {optionSelected !== "Debid/Credit Card" ? (
        <form className="needs-validation">
          <div className="payment-option">
            <div>
              <h3>{optionSelected}</h3>
            </div>
          </div>
        </form>
      ) : (
        stripePromise && <StripeForm stripePromise={stripePromise} />
      )}
    </>
  );
};

export default PaymentForm;
