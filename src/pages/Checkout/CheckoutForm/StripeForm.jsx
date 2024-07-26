import React, { useState } from "react";

import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseUrl, EndPoints } from "../../../utils/Api";
import { storeOrderRequest } from "../../../redux/actions/OrderAction";
import { MyToast, toast } from "../../../components/Toast/MyToast";
import { amoutRateConversion } from "../../../utils/Helper";
import CustomLoader from "../../../components/Toast/CustomLoader";
import { USER_AUTH_ERROR } from "../../../redux/constant/constants";

const StripeForm = ({ stripePromise }) => {
  const [secretKey, setSecretKey] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const couponData = useSelector((state) => state.OrderReducerData.couponData);
  const addressIdForNewlyFeildDataFromApiResponse = useSelector(
    (state) => state.OrderReducerData.addressData
  );

  const templates = useSelector(
    (state) => state?.handleCartItem?.shippingTemplates
  );

  const currency_id = useSelector(
    (state) => state.siteSettingReducerData?.currentCurrency?.currency_id
  );

  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);

  const selectedOptions = useSelector(
    (state) => state?.handleCartItem?.selectedShippingOptions
  );

  const countryCode = useSelector(
    (state) => state.OrderReducerData.addressDataFeilds?.country_code
  );

  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  const options = {
    mode: "payment",
    currency: currencyCode.toLowerCase(),
    amount: 1099,
  };

  const couponId = couponData && couponData.coupon_id;

  const billingId =
    addressIdForNewlyFeildDataFromApiResponse?.billing_address_id ||
    loginData.address_id;
  const shippingId =
    addressIdForNewlyFeildDataFromApiResponse.shipping_address_id ||
    loginData.address_id; //ahzam

  const handleProceedPayment = async () => {
    if (billingId) {
      try {
        let allItems = {};
        for (let i = 0; i < templates.length; i++) {
          let tempSelectedTemplateId = 0;
          let shippingOptions = Object.keys(templates[i].shipping_options);
          let hasAnyTemplateSelected = shippingOptions.some(
            (item) =>
              templates[i].shipping_options?.[item].selected_option === true
          );
          if (hasAnyTemplateSelected) {
            tempSelectedTemplateId = shippingOptions.filter((item) => {
              return (
                templates[i].shipping_options?.[item].selected_option === true
              );
            })[0];
          } else {
            tempSelectedTemplateId = shippingOptions[0];
          }
          for (let j = 0; j < templates[i]?.products.length; j++) {
            let currentProduct = templates[i]?.products[j];
            allItems[
              `${currentProduct.product_id}-${currentProduct.variant_combo_id}`
            ] = {
              quantity: currentProduct.quantity,
              shipping_template_option_id: tempSelectedTemplateId,
              price : currentProduct.sale_price
            };
          }
        }
        const response = await fetch(`${BaseUrl}${EndPoints.store_order}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: loginData.token,
          },
          body: JSON.stringify({
            payment_method: "card",
            shipping_address_id: shippingId,
            billing_address_id: billingId,
            coupon_id: couponId,
            card_data: null,
            payment_intent: secretKey,
            currency_id,
            product_shipping_options: allItems,
          }),
        });
        const data = await response.json();

        if (data.status && data.data.clientSecret) {
          setSecretKey(data.data.clientSecret);
        }
        else if (data?.status == "401" || data?.status == "403") {
          dispatch({type : USER_AUTH_ERROR, navigate})
        }

        return data;
      } catch (error) {
        // console.error("Frontend Error: handleProceedPayment Method ", error);
        MyToast(error?.message, "error", "rgba(217,92,92,.95)");
        toast.clearWaitingQueue();
      }
    }
  };

  const handlePaymentSuccess = async (clientSecret, setPaymentLoading) => {
    if (billingId) {
      let allItems = {};
        for (let i = 0; i < templates.length; i++) {
          let tempSelectedTemplateId = 0;
          let shippingOptions = Object.keys(templates[i].shipping_options);
          let hasAnyTemplateSelected = shippingOptions.some(
            (item) =>
              templates[i].shipping_options?.[item].selected_option === true
          );
          if (hasAnyTemplateSelected) {
            tempSelectedTemplateId = shippingOptions.filter((item) => {
              return (
                templates[i].shipping_options?.[item].selected_option === true
              );
            })[0];
          } else {
            tempSelectedTemplateId = shippingOptions[0];
          }
          for (let j = 0; j < templates[i]?.products.length; j++) {
            let currentProduct = templates[i]?.products[j];
            allItems[
              `${currentProduct.product_id}-${currentProduct.variant_combo_id}`
            ] = {
              quantity: currentProduct.quantity,
              shipping_template_option_id: tempSelectedTemplateId,
              price : currentProduct.sale_price
            };
          }
        }
      dispatch(
        storeOrderRequest(
          loginData?.token,
          shippingId,
          billingId,
          couponId,
          currency_id,
          navigate,
          dispatch,
          clientSecret,
          setPaymentLoading,
          setSecretKey,
          allItems,
        )
      );
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        handleSecretKey={handleProceedPayment}
        handlePaymentSuccess={handlePaymentSuccess}
        countryCode={countryCode}
      />
    </Elements>
  );
};

export default StripeForm;

function CheckoutForm({ handleSecretKey, handlePaymentSuccess, countryCode }) {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const finalTotal = useSelector((state) => state?.handleCartItem?.finalTotal);

  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  const maxAmount = siteSettingsData.order_max_amount;
  const minAmount = siteSettingsData.order_min_amount;

  const payMoney = async (e) => {
    e.preventDefault();
    elements.submit();

    if (finalTotal > maxAmount) {
      toast.clearWaitingQueue();
      MyToast(
        `Max order limit is ${amoutRateConversion(
          maxAmount,
          currencyRate,
          currencyCode
        )}`,
        "error",
        "rgba(217,92,92,.95)"
      );
      return;
    }

    if (finalTotal < minAmount) {
      toast.clearWaitingQueue();
      MyToast(
        `Minimum order limit is ${amoutRateConversion(
          minAmount,
          currencyRate,
          currencyCode
        )}`,
        "error",
        "rgba(217,92,92,.95)"
      );
      return;
    }

    setPaymentLoading(true);
    setLoading(true);

    try {
      let response = await handleSecretKey();
      let clientSecret = null;
      if (response.status && response.data?.clientSecret) {
        clientSecret = response.data.clientSecret;
      } else {
        setLoading(false);

        setPaymentLoading(false);
        toast.clearWaitingQueue();
        MyToast(response.message, "error", "rgba(217,92,92,.95)");
        throw new Error(response.message);
      }

      let options = {
        elements,
        clientSecret,
        redirect: "if_required",
        confirmParams: {
          return_url: "https://google.com",
          payment_method_data: {
            billing_details: { address: { country: countryCode } },
          },
        },
      };

      let paymentResult = await stripe.confirmPayment(options);

      if (paymentResult.error) {
        setLoading(false);
        setPaymentLoading(false);
        toast.clearWaitingQueue();
        MyToast(paymentResult.error.message, "error", "rgba(217,92,92,.95)");
        throw new Error(paymentResult.error.message);
      }
      handlePaymentSuccess(clientSecret, setPaymentLoading);
    } catch (error) {
      setPaymentLoading(false);
      setLoading(false);
      if (error == "Error") {
        toast.clearWaitingQueue();
        MyToast(
          "Error processing payment. Please try again later.",
          "error",
          "rgba(217,92,92,.95)"
        );
      } else {
        toast.clearWaitingQueue();
        MyToast(error, "error", "rgba(217,92,92,.95)");
      }
    }
  };

  return (
    <form className="needs-validation border-t-0" onSubmit={payMoney}>
      <div className="payment-option border-t-0">
        <div>
          <div className="row">
            <PaymentElement
              className="form-control"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                    fontWeight: "bold", // Set font weight to bold
                  },
                },
                fields: {
                  billingDetails: { address: { country: "never" } },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="mb-0">
          <button
            className="btn btn-theme-yellow w-100 mt-3"
            disabled={isPaymentLoading}
          >
            {loading ? (
              <CustomLoader
                size={10}
                // className={"loaderStyle pb-3"}
                color={"#219ebc"}
              />
            ) : (
              <>
                PLACE ORDER
                <i className="fa fa-angle-right ms-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
