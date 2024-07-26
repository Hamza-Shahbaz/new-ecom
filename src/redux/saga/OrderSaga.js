// saga.js
import { put, takeEvery, takeLatest, call, select } from "redux-saga/effects";
import { BaseUrl, EndPoints } from "../../utils/Api";
import {
  ADD_ADDRESS,
  ADD_ADDRESS_SETTING,
  ADD_ADDRESS_SETTING_SUCCESS,
  ADD_PAYMENT_METHOD_REQUEST,
  ADD_QUANTITY_FROM_CHECKOUT,
  FETCH_COUPON_FAILURE,
  FETCH_COUPON_REQUEST,
  FETCH_COUPON_SUCCESS,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDER_DATA_REQUEST,
  FETCH_SHIPPING_OPTIONS,
  FETCH_SHIPPING_OPTIONS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  GET_TRACK_ORDER,
  LOCALLY_ADD_ADDRESS_DATA,
  LOCALLY_EDIT_ADDRESS_DATA,
  ORDER_CONFIRM_FAILURE,
  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_SUCCESS,
  POST_ADDRESS_DATA,
  REMOVE_CARD_REQUEST,
  SET_CART,
  SET_DASHBOARD_DATA,
  SET_POST_ADDRESS_DATA,
  SET_TRACK_ORDER,
  UPDATE_SELECTED_SHIPPING,
  UPDATE_SHIPPING_OPTIONS_SAGA,
  USER_AUTH_ERROR,
} from "../constant/constants";
import {
  activeSectionHandler,
  addAddressError,
  addAddressSuccess,
  addPaymentMethodFailure,
  addPaymentMethodSuccess,
  clearAddressDataHandler,
  clearOrderDataHandler,
  fetchOrderDataFailure,
  fetchOrderDataRequest,
  fetchOrderDataSuccess,
  fetchOrderStatusSuccess,
  getOrderDetailsFailure,
  getOrderDetailsSuccess,
  handleAddPaymentFormVisibility,
  handleClearCoupon,
  handleMergeCardData,
  removeCardFailure,
  removeCardSuccess,
  shipAddressSuccess,
} from "../actions/OrderAction";
import { clearCart } from "../actions/CategoryActions";
// import Swal from "sweetalert2";
import {
  CartUpdatingHandler,
  SigninHandler,
  handleGetAddressData,
  handleGetWorkQueue,
  handleSetAddAddress,
  logoutHandlerAction,
  openModal,
} from "../actions/AuthAction";
import { toast } from "react-toastify";
import { MyToast } from "../../components/Toast/MyToast";

function* fetchOrderDataSaga(action) {
  const headers = {
    Authentication: action.payload,
  };

  try {
    const response = yield fetch(`${BaseUrl}${EndPoints.order_data}`, {
      method: "GET",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });

    const responseData = yield response.json();

    if (responseData.status) {
      let tempCart = responseData?.data?.cart_data || [];
      const newCartInfo = tempCart?.map((item) => {
        item.quantity = item.product_quantity;
        item.product_quantity = item.stock_quantity;
        item.stock = item.stock_quantity;
        return item;
      });
      let prevCart = [
        ...(yield select((state) => state?.handleCartItem?.addToCart)),
      ];
      for (let i = 0; i < newCartInfo.length; i++) {
        let index = prevCart.findIndex(
          (item) =>
            item.product_id === newCartInfo[i].product_id &&
            (item.variant_combo_id || 0) === newCartInfo[i].variant_combo_id
        );
        if (index !== -1) {
          prevCart.splice(index, 1);
        }
        prevCart.push(newCartInfo[i]);
      }
      yield put({ type: SET_CART, payload: prevCart });
      yield put(fetchOrderDataSuccess(responseData.data));
    } else {
    }
  } catch (error) {
    console.error("Something went wrong", error);
    yield put(fetchOrderDataFailure(error));
  }
}

function* fetchShippingOptionsSaga(action) {
  const addressId = action.payload;
  const isLoading = action.isLoading;
  const navigate = action.navigate
  isLoading(true);
  try {
    const token = yield select(
      (state) => state.AuthReducerData.loginUser?.token
    );
    const currency_id = yield select(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_id || 17
    );
    const body = {
      address_id: addressId,
      currency_id,
    };

    const raw = JSON.stringify(body);
    const myHeaders = new Headers();
    myHeaders.append("Authentication", token);
    myHeaders.append("Content-Type", "application/json");
    const response = yield fetch(
      `${BaseUrl}${EndPoints.get_shipping_details_for_address}`,
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
      }
    );
    const responseData = yield response.json();

    if (responseData.status) {
      const templates = Object.values(
        responseData?.data?.shipping_templates_dict || {}
      );
      let tempCart = [];
      templates.forEach((item) => {
        tempCart = tempCart.concat(item?.products || []);
      });
      const newCartInfo = tempCart?.map((item) => {
        item.quantity = item.product_quantity;
        item.product_quantity = item.stock_quantity;
        item.stock = item.stock_quantity;
        return item;
      });
      const shippingAmount = responseData?.data?.order_details?.net_shipping;
      yield put({
        type: FETCH_SHIPPING_OPTIONS_SUCCESS,
        payload: { newCartInfo, templates, shippingAmount },
      });
    }
    else if (
      responseData?.status == "401" ||
      responseData?.status == "403"
    ) {
      yield put({type : USER_AUTH_ERROR, navigate})
    } 
    else {
      if (Object.values(
        responseData?.data?.shipping_templates_dict || {}
      ).length > 0) {
        const templates = Object.values(
          responseData?.data?.shipping_templates_dict || {}
        );
        let tempCart = [];
        templates.forEach((item) => {
          tempCart = tempCart.concat(item?.products || []);
        });
        const newCartInfo = tempCart?.map((item) => {
          item.quantity = item.product_quantity;
          item.product_quantity = item.stock_quantity;
          item.stock = item.stock_quantity;
          return item;
        });
        const shippingAmount = responseData?.data?.order_details?.net_shipping;
        yield put({
          type: FETCH_SHIPPING_OPTIONS_SUCCESS,
          payload: { newCartInfo, templates, shippingAmount },
        });
      }
      MyToast(responseData.message, "error");
    }
  } catch (e) {
    console.error(e);
    MyToast(e, "error");
  } finally {
    isLoading(false);
  }
}

function* updateShippingOptions(action) {
  const addressId = action.payload.addressId;
  const updatedOptions = action.payload.updatedOptions;
  const isLoading = action.payload.setIsApiLoading;
  const navigate = action.navigate
  isLoading(true);
  try {
    const token = yield select(
      (state) => state.AuthReducerData.loginUser?.token
    );
    const currency_id = yield select(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_id || 17
    );
    const body = {
      address_id: addressId,
      currency_id,
      product_shipping_options: updatedOptions,
    };

    const raw = JSON.stringify(body);
    const myHeaders = new Headers();
    myHeaders.append("Authentication", token);
    myHeaders.append("Content-Type", "application/json");
    const response = yield fetch(
      `${BaseUrl}${EndPoints.get_shipping_details_for_address}`,
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
      }
    );
    const responseData = yield response.json();

    if (
      responseData.status
    ) {
      const templates = Object.values(
        responseData?.data?.shipping_templates_dict || {}
      );
      let tempCart = [];
      templates.forEach((item) => {
        tempCart = tempCart.concat(item?.products || []);
      });
      const newCartInfo = tempCart?.map((item) => {
        item.quantity = item.product_quantity;
        item.product_quantity = item.stock_quantity;
        item.stock = item.stock_quantity;
        return item;
      });
      const shippingAmount = responseData?.data?.order_details?.net_shipping;
      yield put({
        type: FETCH_SHIPPING_OPTIONS_SUCCESS,
        payload: { newCartInfo, templates, shippingAmount },
      });
    }
    else if (
      responseData?.status == "401" ||
      responseData?.status == "403"
    ) {
      yield put({type : USER_AUTH_ERROR, navigate})
    } 
    else {
      if (Object.values(
        responseData?.data?.shipping_templates_dict || {}
      ).length > 0) {
        const templates = Object.values(
          responseData?.data?.shipping_templates_dict || {}
        );
        let tempCart = [];
        templates.forEach((item) => {
          tempCart = tempCart.concat(item?.products || []);
        });
        const newCartInfo = tempCart?.map((item) => {
          item.quantity = item.product_quantity;
          item.product_quantity = item.stock_quantity;
          item.stock = item.stock_quantity;
          return item;
        });
        const shippingAmount = responseData?.data?.order_details?.net_shipping;
        yield put({
          type: FETCH_SHIPPING_OPTIONS_SUCCESS,
          payload: { newCartInfo, templates, shippingAmount },
        });
      }
      MyToast(responseData.message, "error");
    }
  } catch (e) {
    MyToast(e, "error");
  } finally {
    isLoading(false);
  }
}

function* addItemInCartAndUpdateShippingOptions(action) {}

function* addAddressSaga(action) {
  const { addressData, token, ShipAddressFeilds } = action.payload;
  const {
    setIsLoading,
    navigate,
    dispatch,
    onActiveSectionChange,
    setAllowNavigation,
  } = action.meta;

  setIsLoading(true);

  try {
    const billingData = {
      ...addressData,
    };

    const shippingData = {
      ...ShipAddressFeilds,
    };

    const payload = {
      billing_address: billingData,
      shipping_address: ShipAddressFeilds?.country_code ? shippingData : null,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: token,
      },
      body: JSON.stringify(payload),
    };

    const url = `${BaseUrl}${EndPoints.register_address}`;

    const newResponse = yield fetch(url, requestOptions);
    const newResponseData = yield newResponse.json();

    if (newResponseData.status) {
      setAllowNavigation(true);
      onActiveSectionChange("Payment");
      // dispatch(fetchOrderDataRequest(token));
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      yield put(addAddressSuccess(newResponseData.data));
      yield put(shipAddressSuccess(newResponseData.data));
    } else if (
      newResponseData?.status == "401" ||
      newResponseData?.status == "403"
    ) {
      yield put({type : USER_AUTH_ERROR, navigate})
    } else {
      toast.clearWaitingQueue();
      MyToast(newResponseData?.message, "error", "rgba(217,92,92,.95)");
    }
  } catch (error) {
    toast.clearWaitingQueue();
    MyToast(error?.message, "error", "rgba(217,92,92,.95)");
    yield put(addAddressError(error.message));
  } finally {
    setIsLoading(false);
  }
}

function* handleAddressSettings(action) {
  const { addressData, ShipAddressFeilds, token } = action.payload;
  const { setIsLoading, dispatch, navigate } = action.meta;

  setIsLoading(true);

  try {
    const billingData = {
      ...addressData,
    };

    const shippingData = {
      ...ShipAddressFeilds,
    };

    const payload = {
      billing_address: billingData,
      shipping_address: ShipAddressFeilds ? shippingData : null,
    };

    const response = yield call(
      fetch,
      `${BaseUrl}${EndPoints.register_address}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
        body: JSON.stringify(payload),
      }
    );

    const newResponseData = yield response.json();

    if (newResponseData.status) {
      yield put({
        type: ADD_ADDRESS_SETTING_SUCCESS,
        payload: payload?.billing_address,
      });

      yield put({ type: SET_DASHBOARD_DATA, payload: payload });

      toast.clearWaitingQueue();
      MyToast(newResponseData?.message, "success", "rgba(91,189,114,.95)");
    } else if (
      newResponseData?.status == "401" ||
      newResponseData?.status == "403"
    ) {
      yield put({type : USER_AUTH_ERROR, navigate})
    } else {
      toast.clearWaitingQueue();
      MyToast(newResponseData?.message, "error", "rgba(217,92,92,.95)");
    }
  } catch (error) {
    toast.clearWaitingQueue();
    MyToast(error?.message, "error", "rgba(217,92,92,.95)");
    yield put(addAddressError(error.message));
  } finally {
    setIsLoading(false);
  }
}

//Function for create address API////

// function* handleCreateAddress(action) {
//   const { data, countryCodeRef, stateCodeRef, phoneNumber, token, address_id } =
//     action.payload;
//   const { setIsLoading, dispatch, navigate, setLoading, exactPath } =
//     action.meta;

//   setIsLoading(true);

//   try {
//     const formData = new FormData();
//     formData.append("name", data?.name);
//     formData.append("email", data?.email);
//     formData.append("phone_number", phoneNumber);
//     formData.append("country_code", countryCodeRef);
//     formData.append("state_code", stateCodeRef);
//     formData.append("city", data?.city);
//     formData.append("street_address", data?.address);
//     formData.append("zip_code", data?.zipcode);

//     const response = yield call(
//       fetch,
//       address_id
//         ? `${BaseUrl}${EndPoints.create_address}/${address_id}`
//         : `${BaseUrl}${EndPoints.create_address}`,
//       {
//         method: "POST",
//         headers: {
//           Authentication: token,
//         },
//         body: formData,
//       }
//     );

//     const newResponseData = yield response.json();

//     if (newResponseData.status) {
//       yield put({ type: SET_POST_ADDRESS_DATA, payload: newResponseData });
//       // yield put({ type: LOCALLY_ADD_ADDRESS_DATA, payload: newResponseData });
//       // yield put({ type: LOCALLY_EDIT_ADDRESS_DATA, payload: newResponseData });

//       setIsLoading(false);

//       if (exactPath && exactPath === "/my-account") {
//         dispatch(handleSetAddAddress(false));
//         MyToast(newResponseData?.message, "success");
//         toast.clearWaitingQueue();
//       } else {
//         navigate("/checkout");
//         dispatch(handleSetAddAddress(false));
//       }

//       // dispatch(handleGetAddressData(token, setLoading, dispatch, navigate));
//     } else if (
//       newResponseData?.status == "401" ||
//       newResponseData?.status == "403" ||
//       newResponseData?.message === "Unauthorized"
//     ) {
//       navigate("/");
//       dispatch(logoutHandlerAction());
//       dispatch(clearOrderDataHandler());
//     } else {
//       MyToast(newResponseData?.message, "error");
//       toast.clearWaitingQueue();
//       setIsLoading(false);
//     }
//   } catch (error) {
//     setIsLoading(false);
//   } finally {
//     setIsLoading(false);
//   }
// }

function* handleCreateAddress(action) {
  const {
    data,
    countryCodeRef,
    stateCodeRef,
    phoneNumber,
    token,
    address_id,
    currentCountry,
    currentState,
    first_name,
    last_name,
  } = action.payload;
  const { setIsLoading, dispatch, navigate, setLoading, exactPath } =
    action.meta;

  setIsLoading(true);

  try {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("phone_number", phoneNumber);
    formData.append("country_code", countryCodeRef);
    formData.append("state_code", stateCodeRef);
    formData.append("city", data?.city);
    formData.append("street_address", data?.address);
    formData.append("zip_code", data?.zipcode);

    const response = yield call(
      fetch,
      address_id
        ? `${BaseUrl}${EndPoints.create_address}/${address_id}`
        : `${BaseUrl}${EndPoints.create_address}`,
      {
        method: "POST",
        headers: {
          Authentication: token,
        },
        body: formData,
      }
    );

    const newResponseData = yield response.json();

    if (newResponseData.status) {
      const updatedAddress = {
        address_id: newResponseData.data.address_id,
        city: data?.city,
        country: currentCountry,
        country_code: countryCodeRef,
        email: data?.email,
        first_name: first_name,
        last_name: last_name,
        name: data?.name,
        phone_number: phoneNumber,
        state: currentState,
        state_code: stateCodeRef,
        street_address: data?.address,
        zip_code: data?.zipcode,
      };

      const addressesData = {
        addresses: [updatedAddress],
      };

      // yield put({ type: SET_POST_ADDRESS_DATA, payload: newResponseData });
      yield put({ type: LOCALLY_ADD_ADDRESS_DATA, payload: updatedAddress });
      yield put({ type: LOCALLY_EDIT_ADDRESS_DATA, payload: updatedAddress });

      setIsLoading(false);

      if (exactPath && exactPath === "/my-account") {
        dispatch(handleSetAddAddress(false));
        toast.clearWaitingQueue();
        MyToast(newResponseData?.message, "success", "rgba(91,189,114,.95)");
      } else {
        navigate("/checkout");
        dispatch(handleSetAddAddress(false));
      }

      // dispatch(handleGetAddressData(token, setLoading, dispatch, navigate));
    } else if (
      newResponseData?.status == "401" ||
      newResponseData?.status == "403" ||
      newResponseData?.message === "Unauthorized"
    ) {
      yield put({type : USER_AUTH_ERROR, navigate})
    } else {
      toast.clearWaitingQueue();
      MyToast(newResponseData?.message, "error", "rgba(217,92,92,.95)");
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
    toast.clearWaitingQueue();
    MyToast(error?.message, "error", "rgba(217,92,92,.95)");
  } finally {
    setIsLoading(false);
  }
}

function* addPaymentMethod(action) {
  const { setIsLoading, dispatch, navigate } = action.meta;
  const { cardData, token } = action.payload;

  setIsLoading(true);
  try {
    const formData = new FormData();
    formData.append("name_on_card", cardData.name_on_card);
    formData.append("card_number", cardData.card_number);
    formData.append("expiry_date", cardData.expiry_date);

    const headers = {
      Authentication: token,
    };

    const response = yield call(fetch, `${BaseUrl}${EndPoints.add_card}`, {
      method: "POST",
      headers: headers,
      body: formData,
    });
    const responseData = yield response.json();

    if (responseData.status) {
      handleMergeCardData({
        ...cardData,
        card_id: responseData.data.card_id,
      });
      dispatch(handleAddPaymentFormVisibility(false));
      addPaymentMethodSuccess();
    } else if (
      responseData?.status == "401" ||
      responseData?.status == "403" ||
      responseData?.message === "Unauthorized"
    ) {
      yield put({type : USER_AUTH_ERROR, navigate})
    } else {
      yield put(addPaymentMethodFailure(responseData.message));
    }
  } catch (error) {
    // console.error(
    //   "Frontend error : addPaymentMethod, Failed to add payment method:",
    //   error
    // );

    yield put(addPaymentMethodFailure(error.message));
  } finally {
    setIsLoading(false);
  }
}

function* handleProceedOrder(action) {
  try {
    const {
      token,
      shippingAddressId,
      billingAddressId,
      couponId,
      clientSecret,
      currency_id,
      tempShippingOptions,
    } = action.payload;
    const { navigate, dispatch, setIsLoading, setSecretKey } = action.meta;
    const selectedOptions = yield select(
      (state) => state?.handleCartItem?.selectedShippingOptions
    );

    const myHeaders = new Headers();
    myHeaders.append("Authentication", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      payment_method: "card",
      shipping_address_id: shippingAddressId || billingAddressId,
      billing_address_id: billingAddressId,
      coupon_id: couponId,
      card_data: null,
      payment_intent: clientSecret,
      currency_id,
      selectedOptions,
      product_shipping_options: tempShippingOptions,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = yield fetch(
      `${BaseUrl}${EndPoints.update_order_to_pending}`,
      requestOptions
    );

    const responseData = yield response.json();

    if (responseData.status) {
      navigate("/order-confirm", { replace: true });
      dispatch(clearAddressDataHandler());
      dispatch(clearOrderDataHandler());
      dispatch(activeSectionHandler("address"));
      dispatch(clearCart());
      dispatch(handleClearCoupon());
      yield put({ type: updateShippingOptions, payload: {} });

      dispatch(handleGetWorkQueue());
    }
    else if (
      responseData?.status == "401" ||
      responseData?.status == "403" ||
      responseData?.message === "Unauthorized"
    ) {
      setIsLoading(false);
      yield put({ type: USER_AUTH_ERROR, navigate });
    }
    else {
      setIsLoading(false);
      setSecretKey("");
      throw new Error("Order Failed");
    }
  } catch (error) {
    const { navigate, dispatch, setIsLoading, setSecretKey } = action.meta;
    setIsLoading(false);
    setSecretKey("");
  }
}

// function* removeCardSaga(action) {
//   const { token, dispatch, navigate } = action.meta;

//   try {
//     const myHeaders = new Headers();
//     myHeaders.append("Authentication", token);

//     const formdata = new FormData();
//     formdata.append("card_id", action.payload);

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: formdata,
//       redirect: "follow",
//     };

//     const response = yield fetch(
//       `${BaseUrl}${EndPoints.remove_card}`,
//       requestOptions
//     );
//     const responseData = yield response.json(); // Parse response JSON

//     if (responseData.status) {
//       yield put(removeCardSuccess(responseData.message));
//       // dispatch(fetchOrderDataRequest(token));
//     } else if (response?.status == "401" || response?.status == "403") {
//       navigate("/");
//       dispatch(logoutHandlerAction());
//       dispatch(clearOrderDataHandler());
//     } else {
//       yield put(removeCardFailure(responseData.message));
//     }
//   } catch (error) {
//     yield put(removeCardFailure(error.message));
//   }
// }

// function* fetchCouponSaga({ payload, meta }) {
//   const { couponCode, token, toastFlag } = payload;
//   const { setIsLoading, dispatch, setApplyCoupom } = meta;

//   try {
//     setIsLoading(true);

//     const myHeaders = new Headers();
//     myHeaders.append("Authentication", token);

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     const response = yield call(
//       fetch,
//       `${BaseUrl}${EndPoints.coupon}${couponCode}`,
//       requestOptions
//     );

//     const result = yield response.json();

//     if (result.status) {
//       setIsLoading(false);
//       setApplyCoupom("");
//       yield put({ type: FETCH_COUPON_SUCCESS, payload: result.data });
//     } else {
//       setIsLoading(false);
//       yield put({ type: FETCH_COUPON_FAILURE, payload: result.data });
//     }
//   } catch (error) {
//     console.error("Failed to apply coupon:", error);
//     yield put({ type: FETCH_COUPON_FAILURE, payload: error.message });
//   } finally {
//     setIsLoading(false);
//   }
// }

/////API function for fetch order status/////////////
function* fetchOrdersStatusSaga(action) {
  const { token, page, limit } = action.payload;
  const { setLoading, dispatch, navigate, onTop } = action.meta;
  setLoading(true);

  try {
    const response = yield call(
      // fetch,
      // ${BaseUrl}${EndPoints.user_orders_status},
      fetch,
      `${BaseUrl}${EndPoints.user_orders_status}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { Authentication: token },
      }
    );

    const orderStatusData = yield response.json();

    if (orderStatusData.status) {
      setLoading(false);
      yield put(fetchOrderStatusSuccess(orderStatusData));
      onTop();
    } else if (
      orderStatusData?.status == "401" ||
      orderStatusData?.status == "403" ||
      orderStatusData?.message === "Unauthorized"
    ) {
      setLoading(false);
      yield put({ type: USER_AUTH_ERROR, navigate });
    } else {
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    // console.error("Frontend Error: fetchOrdersStatusSaga Function ", error);
    MyToast(error?.message, "error", "rgba(217,92,92,.95)");
    toast.clearWaitingQueue();
  }
}

function* fetchOrderDetailSSaga(action) {
  const { token, orderId } = action.payload;
  const { setLoading, navigate } = action.meta;

  setLoading(true);

  try {
    const response = yield call(
      fetch,
      `${BaseUrl}${EndPoints.user_order_details}${orderId}`,
      {
        method: "GET",
        headers: { Authentication: token },
      }
    );
    const res = yield response.json();

    if (res.status) {
      setLoading(false);
      yield put(getOrderDetailsSuccess(res?.data));
    } else if (
      res?.status == "401" ||
      res?.status == "403" ||
      res?.message === "Unauthorized"
    ) {
      setLoading(false);
      yield put({ type: USER_AUTH_ERROR, navigate });
    } else {
      setLoading(false);
      yield put(getOrderDetailsFailure(res?.data));
    }
  } catch (error) {
    setLoading(false);
    // console.error("Frontend Error: fetchOrderDetailSSaga Function ", error);
    MyToast(error?.message, "error", "rgba(217,92,92,.95)");
    toast.clearWaitingQueue();
  }
}

/////API function for fetch Dashboard Data/////////////
function* fetchOrderTrack({
  orderID,
  setLoading,
  token,
  setShow,
  navigate,
  setValue,
}) {
  const id = orderID;
  try {
    setLoading(true);
    const response = yield call(
      fetch,
      `${BaseUrl}${EndPoints.track_order_detail}${id}`,
      {
        method: "GET",
        headers: { Authentication: token },
      }
    );

    const orderResponse = yield response.json();

    if (orderResponse?.status) {
      setLoading(false);
      yield put({ type: SET_TRACK_ORDER, payload: orderResponse?.data });
      setValue("orderID", "");
      setShow(true);
    } else if (
      response?.status == "401" ||
      response?.status == "403" ||
      response?.message === "Unauthorized"
    ) {
      setLoading(false);
      yield put({ type: USER_AUTH_ERROR, navigate });
    } else {
      setLoading(false);
      toast.clearWaitingQueue();
      MyToast(orderResponse?.message, "error", "rgba(217,92,92,.95)");
    }
  } catch (error) {
    setLoading(false);
    // console.error("Frontend Error: fetchOrderTrack Function ", error);
    MyToast(error?.message, "error", "rgba(217,92,92,.95)");
    toast.clearWaitingQueue();
  }
}

function* OrderSaga() {
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersStatusSaga);
  yield takeLatest(ADD_ADDRESS, addAddressSaga);
  yield takeLatest(ADD_ADDRESS_SETTING, handleAddressSettings);
  yield takeEvery(FETCH_ORDER_DATA_REQUEST, fetchOrderDataSaga);
  yield takeEvery(FETCH_SHIPPING_OPTIONS, fetchShippingOptionsSaga);
  yield takeEvery(UPDATE_SHIPPING_OPTIONS_SAGA, updateShippingOptions);
  yield takeEvery(
    ADD_QUANTITY_FROM_CHECKOUT,
    addItemInCartAndUpdateShippingOptions
  );
  yield takeEvery(ADD_PAYMENT_METHOD_REQUEST, addPaymentMethod);
  yield takeEvery(ORDER_CONFIRM_REQUEST, handleProceedOrder);
  // yield takeEvery(REMOVE_CARD_REQUEST, removeCardSaga);
  // yield takeLatest(FETCH_COUPON_REQUEST, fetchCouponSaga);
  yield takeLatest(GET_ORDER_DETAILS_REQUEST, fetchOrderDetailSSaga);
  yield takeLatest(GET_TRACK_ORDER, fetchOrderTrack);
  yield takeLatest(POST_ADDRESS_DATA, handleCreateAddress);
}

export default OrderSaga;
