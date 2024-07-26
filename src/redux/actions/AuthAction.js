import {
  CLEAR_ADDRESS_DATA,
  CLEAR_CREATE_ADDRESS_DATA,
  CLEAR_UPDATE_INFO,
  FORGOT_PASSWORD,
  GET_ADDRESS_DATA,
  GET_DASHBOARD_DATA,
  GET_ICON_ID,
  GET_SITESETTINGS,
  GET_WORKQUEUE,
  GLOBAL_ID,
  GUEST_LOGIN_FAILURE,
  GUEST_LOGIN_REQUESTING,
  GUEST_LOGIN_SUCCESS,
  LOCALLY_REMOVE_ADDRESS_DATA,
  LOGIN_ERROR,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGOUT_GUEST,
  LOGOUT_USER,
  OPEN_MODAL,
  PATH_NAME,
  PATH_NAME_CHECKOUT,
  PATH_NAME_DASHBOARD,
  REGISTER_USER,
  REMOVE_ADDRESS_DATA,
  REMOVE_GLOBAL_ID,
  REMOVE_ICON_ID,
  RESET_PASSWORD,
  SELECTED_ADDRESS_ID,
  STATUS,
  SUBSCRIBE_TO_NEWSLETTER,
  UPDATE_INFO,
  UPDATE_TIMER,
  UPDATING_CART,
  UPDATING_CART_ERROR,
  UPDATING_CART_SUCCESS,
} from "../constant/constants";

///////////// Action for Register User /////////////
export const handleRegisterUser = (
  data,
  setLoading,
  setActiveTab,
  phoneNumber,
  dispatch
) => {
  return {
    type: REGISTER_USER,
    data,
    setLoading,
    setActiveTab,
    phoneNumber,
    dispatch,
  };
};

///////////// Action for Login User /////////////

export const SigninHandler = (data, setLoading, navigate, path, isGoogle, bearerToken) => {
  return {
    type: LOGIN_REQUESTING,
    payload: {
      data,
      path,
      isGoogle,
      bearerToken,
    },
    meta: {
      setLoading,
      navigate,
    },
  };
};

///////////// Action for Forgot Password /////////////
export const handleForgotPassword = (data, setLoading, navigate, dispatch) => {
  return {
    type: FORGOT_PASSWORD,
    data,
    setLoading,
    navigate,
    dispatch,
  };
};

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}

export const handleInfoUpdate = (
  data,
  setLoading,
  token,
  navigate,
  setValue,
  phoneNumber
) => {
  return {
    type: UPDATE_INFO,
    data,
    setLoading,
    token,
    navigate,
    setValue,
    phoneNumber,
  };
};

export const handleInfoUpdateClear = () => {
  return {
    type: CLEAR_UPDATE_INFO,
  };
};

////////////////ACTION FOR Dashboard API

export const handleDashboardData = (
  token,
  navigate,
  dispatch,
  setDataLoading
) => {
  return {
    type: GET_DASHBOARD_DATA,
    token,
    navigate,
    dispatch,
    setDataLoading,
  };
};

////////////////ACTION FOR Get Address API

export const handleGetAddressData = (token, setLoading, dispatch, navigate) => {
  return {
    type: GET_ADDRESS_DATA,
    token,
    setLoading,
    dispatch,
    navigate,
  };
};

////////////////ACTION FOR Remove Address API

export const handleRemoveAddressData = (
  token,
  id,
  setremoveDataloading,
  dispatch,
  navigate,
  setLoading
) => {
  return {
    type: REMOVE_ADDRESS_DATA,
    payload: { token, id },
    meta: { setremoveDataloading, dispatch, navigate, setLoading },
  };
};

///Locally remove addresses from reducer////////
export const handlelocallyRemoveAddressId = (id) => {
  return {
    type: LOCALLY_REMOVE_ADDRESS_DATA,
    payload: { id },
  };
};


////////////////ACTION FOR GET SITE SETTINGS API

export const handleGetSiteSettings = () => {
  return {
    type: GET_SITESETTINGS,
  };
};

////////////////ACTION FOR WORK QUEUE API
export const handleGetWorkQueue = () => {
  return {
    type: GET_WORKQUEUE,
  };
};

//////////Reset Pass//////////
export const handleResetPasswordUser = (
  data,
  setLoading,
  navigate,
  passwordToken,
  dispatch
) => {
  return {
    type: RESET_PASSWORD,
    data,
    setLoading,
    navigate,
    passwordToken,
    dispatch
  };
};

export const subscribeToNewsletter = (
  email,
  setError,
  setSuccess,
  dispatch,
  setIsLoading
) => {
  return {
    type: SUBSCRIBE_TO_NEWSLETTER,
    payload: { email, dispatch },
    setError: setError,
    setSuccess: setSuccess,
    setIsLoading : setIsLoading,
  };
};

export const logoutHandlerAction = () => {
  return {
    type: LOGOUT_USER,
  };
};
export const logoutGuestHandlerAction = () => {
  return {
    type: LOGOUT_GUEST,
  };
};

export const openModal = (
  status,
  path = "",
  data = {},
  activeSectionFunction = () => {}
) => ({
  type: OPEN_MODAL,
  payload: { status, path, data, activeSectionFunction },
});

///////////////////////// Cart /////////////

export function CartUpdatingHandler(
  token,
  cartItems,
  setIsLoading,
  dispatch,
  navigate
) {
  return {
    type: UPDATING_CART,
    payload: { token, cartItems },
    meta: { setIsLoading, dispatch, navigate },
  };
}

export function CartUpdatingError(error) {
  return {
    type: UPDATING_CART_ERROR,
    error,
  };
}

export function CartUpdatingSuccess(payload) {
  return {
    type: UPDATING_CART_SUCCESS,
    payload,
  };
}

///////////////////////// Guest login /////////////

export function guestLoginHandler(guestEmail, guestCart, guestToken) {
  return {
    type: GUEST_LOGIN_REQUESTING,
    payload: { guestEmail, guestCart },
  };
}

export function guestLoginSuccess(payload) {
  return {
    type: GUEST_LOGIN_SUCCESS,
    payload,
  };
}

export function guestLoginFailure(error) {
  return {
    type: GUEST_LOGIN_FAILURE,
    error,
  };
}

//////For My Account Tabs//////////
export function handleIconId(id) {
  return {
    type: GET_ICON_ID,
    id,
  };
}

export function handleRemoveIconId(id) {
  return {
    type: REMOVE_ICON_ID,
    id,
  };
}

//////For My Account Tabs//////////
export function handleGlobalId(id) {
  return {
    type: GLOBAL_ID,
    id,
  };
}

export function handleRemoveGlobalId(id) {
  return {
    type: REMOVE_GLOBAL_ID,
    id,
  };
}


//////For create / add address //////////
export function handleSetAddAddress(status) {
  return {
    type: STATUS,
    status,
  };
}

//////For create / add address //////////
export function handleSelectedAddressId(id) {
  return {
    type: SELECTED_ADDRESS_ID,
    id,
  };
}

//////handle shipping form location //////////
export function handlePath(location) {
  return {
    type: PATH_NAME,
    location,
  };
}

//////handle checkout path //////////
export function handleCheckoutPath(location) {
  return {
    type: PATH_NAME_CHECKOUT,
    location,
  };
}

//////clear checkout path //////////
export function handleDashboardPath(location) {
  return {
    type: PATH_NAME_DASHBOARD,
    location,
  };
}

export const clearAddressData = () => ({
  type: CLEAR_CREATE_ADDRESS_DATA,
});

export const updateTimer = (time) => ({
  type: UPDATE_TIMER,
  time
});
