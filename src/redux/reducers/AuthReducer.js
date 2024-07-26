import {
  CLEAR_CREATE_ADDRESS_DATA,
  CLEAR_UPDATE_INFO,
  GET_ICON_ID,
  GLOBAL_ID,
  GUEST_LOGIN_FAILURE,
  GUEST_LOGIN_SUCCESS,
  LOCALLY_ADD_ADDRESS_DATA,
  LOCALLY_EDIT_ADDRESS_DATA,
  LOCALLY_REMOVE_ADDRESS_DATA,
  LOGIN_SUCCESS,
  LOGOUT_GUEST,
  LOGOUT_USER,
  OPEN_MODAL,
  PATH_NAME,
  PATH_NAME_CHECKOUT,
  PATH_NAME_DASHBOARD,
  REMOVE_GLOBAL_ID,
  REMOVE_ICON_ID,
  SELECTED_ADDRESS_ID,
  SET_ADDRESS_DATA,
  SET_CURRENT_CURRENCY,
  SET_DASHBOARD_DATA,
  SET_FORGOT_PASSWORD,
  SET_REGISTER_USER,
  SET_RESET_PASSWORD,
  SET_SITESETTINGS,
  SET_TODAY_COUPONS,
  SET_UPDATE_INFO,
  STATUS,
  UPDATE_TIMER,
  UPDATING_CART_SUCCESS,
} from "../constant/constants";

const initialState = () => ({
  ///to persist data initial state should be function
  registerUser: [],
  loginUser: [],
  loginGuest: [],
  forgotPassword: {},
  resetPassword: [],
  updateCart: [],
  updateProfileData: {},
  id: "v-pills-dashboard",
  globalID: "",
  isModalOpen: {
    status: false,
    path: "",
    data: {},
    activeSectionFunction: () => {},
  },
  siteSettings: [],
  dashboardData: [],
  addressesData: {},
  currentCurrency: "",
  todayCoupons:[],
  status: false,
  selectedAddressId: "",
  path: "",
  pathCheckout: "",
  pathDashboard: "",

});

export const AuthReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case SET_REGISTER_USER:
      return {
        ...state,
        registerUser: action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginUser: {
          ...action.payload,
          token: state?.loginUser?.token || action?.payload?.token,
        },
      };

    case GUEST_LOGIN_SUCCESS:
      return {
        ...state,
        loginGuest: action.payload,
      };
    case GUEST_LOGIN_FAILURE:
      return {
        ...state,
        loginUser: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loginUser: null,
      };
    case LOGOUT_GUEST:
      return {
        ...state,
        loginGuest: null,
      };

    case SET_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload,
      };

    case UPDATE_TIMER:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          reset_duration_sec: action.time,
        },
      };

    case SET_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      };
    case UPDATING_CART_SUCCESS:
      return {
        ...state,
        updateCart: action.payload,
      };

    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: { ...action.payload },
      };

    default:
      return state;
  }
};

//Reducer for SITE SETTING API

export const siteSettingReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case SET_SITESETTINGS:
      return {
        ...state,
        siteSettings: action.payload,
      };
    case SET_CURRENT_CURRENCY:
      return {
        ...state,
        currentCurrency: action.payload,
      };
    case SET_TODAY_COUPONS:
      return {
        ...state,
        todayCoupons : action.payload
      }
    default:
      return state;
  }
};

//Reducer for DASHBOARD DATA API

export const dashboardReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: action.payload,
      };

    default:
      return state;
  }
};

//Reducer for Get Addresses DATA API

export const addressesReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case SET_ADDRESS_DATA:
      return {
        ...state,
        addressesData: action.payload,
      };

    case CLEAR_CREATE_ADDRESS_DATA:
      return {
        ...state,
        addressesData: {},
      };

    case LOCALLY_ADD_ADDRESS_DATA: {
      const newAddress = action.payload;
      const existingAddresses = state.addressesData.addresses || {};

      const addressIndex = existingAddresses.findIndex(
        (address) => address.address_id === newAddress.address_id
      );

      if (addressIndex !== -1) {
        existingAddresses[addressIndex] = newAddress;
      } else {
        existingAddresses.unshift(newAddress);

        if (existingAddresses.length > 9) {
          existingAddresses.pop();
        }
      }

      return {
        ...state,
        addressesData: {
          ...state.addressesData,
          addresses: existingAddresses,
        },
      };
    }

    case LOCALLY_EDIT_ADDRESS_DATA: {
      const editedAddress = action.payload;
      const existingAddresses = state.addressesData.addresses || {};

      const addressIndex = existingAddresses.findIndex(
        (address) => address.address_id === editedAddress.address_id
      );

      if (addressIndex !== -1) {
        existingAddresses[addressIndex] = editedAddress;
      }

      return {
        ...state,
        addressesData: {
          ...state.addressesData,
          addresses: existingAddresses,
        },
      };
    }

    case STATUS:
      return {
        ...state,
        status: action.status,
      };

    case SELECTED_ADDRESS_ID:
      return {
        ...state,
        selectedAddressId: action.id,
      };

    case PATH_NAME:
      return {
        ...state,
        path: action.location,
      };

    case PATH_NAME_CHECKOUT:
      return {
        ...state,
        pathCheckout: action.location,
      };

    case PATH_NAME_DASHBOARD:
      return {
        ...state,
        pathDashboard: action.location,
      };

    default:
      return state;
  }
};

//Reducer for My Account Tabs

export const tabsId = (state = initialState(), action) => {
  switch (action.type) {
    case GET_ICON_ID:
      return {
        ...state,
        id: action.id,
      };

    case REMOVE_ICON_ID:
      return {
        ...state,
        id: action.id,
      };

    case GLOBAL_ID:
      return {
        ...state,
        globalID: action.id,
      };

    case REMOVE_GLOBAL_ID:
      return {
        ...state,
        globalID: action.id,
      };

    default:
      return state;
  }
};

//Reducer for UPDATE PROFILE TOP ICON ID

export const updateProfileReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case SET_UPDATE_INFO:
      return {
        ...state,
        updateProfileData: action.payload,
      };
    case CLEAR_UPDATE_INFO:
      return {
        ...state,
        updateProfileData: {},
      };

    default:
      return state;
  }
};
