// reducer.js

import {
  ACTIVE_SECTION,
  ADD_ADDRESS_ERROR,
  ADD_ADDRESS_SETTING_SUCCESS,
  ADD_ADDRESS_SUCCESS,
  ADD_PAYMENT_VISIBLE,
  CLEAR_ADDRESS_DATA,
  CLEAR_COUPON,
  CLEAR_ORDER_DATA,
  CLEAR_SHIP_ADDRESS,
  FETCH_COUPON_FAILURE,
  FETCH_COUPON_SUCCESS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_DATA_FAILURE,
  FETCH_ORDER_DATA_REQUEST,
  FETCH_ORDER_DATA_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_SUCCESS,
  MERGE_CARDS,
  ORDER_CONFIRM_FAILURE,
  ORDER_CONFIRM_SUCCESS,
  REMOVE_CARD_FAILURE,
  REMOVE_CARD_SUCCESS,
  SAVE_ADDRESS,
  SET_ADDRESS_ID,
  SET_COUPON_APPLIED_VALUE,
  SET_COUPON_TOTAL,
  SET_POST_ADDRESS_DATA,
  SET_TRACK_ORDER,
  SHIP_ADDRESS_SUCCESS,
  UPDATE_SELECTED_SHIPPING,
} from "../constant/constants";

const initialState = () => ({
  loading: false,
  orderData: {
    cards: [],
  },
  addressDataSetting: {
    cards: [],
  },
  billingAddressId: "",
  addressData: {},
  shipAddressData: {},
  billingAddressData: [],
  addressDataFeilds: [],
  billingAddressDataFields: [],
  aaddressFeildsData: [],
  proceedOrderData: [],
  activeSection: "address",
  IsAddPaymentFormVisible: false, // related to visiblity of add payment form
  message: "", //related to payment card removal
  error: null,
  couponData: {},
  couponTotal: {
    total: null,
    appliedValue: null,
  },
  orders: [], //order status
  orderDetails: {}, //order details
  trackOrderData: {},
  createNewAddress: {},
  availableShippingOptions : [],
  selectedShippingOptions: [],
});

const OrderReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case FETCH_ORDER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ORDER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        orderData: action.payload,
      };
    case FETCH_ORDER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addressData: { ...state.addressData, ...action.payload },
        loading: false,
        error: null,
      };

    case ADD_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SHIP_ADDRESS_SUCCESS:
      return {
        ...state,
        shipAddressData: action.payload,
      };
    case CLEAR_SHIP_ADDRESS:
      return {
        ...state,
        shipAddressData: {},
        addressData: {},
      };

    case SAVE_ADDRESS:
      return {
        ...state,
        addressDataFeilds: action.payload,
      };
    case ORDER_CONFIRM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        proceedOrderData: action.payload,
      };
    case ORDER_CONFIRM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      };
    case ADD_PAYMENT_VISIBLE:
      return {
        ...state,
        IsAddPaymentFormVisible: action.payload,
      };

    case REMOVE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null,
      };
    case REMOVE_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload,
      };
    case CLEAR_ADDRESS_DATA:
      return {
        ...state,
        addressData: {},
      };
    case CLEAR_ORDER_DATA:
      return {
        ...state,
        orderData: [],
        couponTotal: [],
        orderDetails: [],
        orders: [],
      };

    case ADD_ADDRESS_SETTING_SUCCESS:
      return {
        ...state,
        addressDataSetting: action.payload,
      };

    //MERGING
    case MERGE_CARDS:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          cards: [...state.orderData.cards, action.payload],
        },
      };

    case FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload };

    case FETCH_COUPON_SUCCESS:
      return {
        ...state,
        couponData: action.payload,
      };
    case CLEAR_COUPON:
      return {
        ...state,
        couponData: {},
        couponTotal: {
          total: null,
          appliedValue: null,
        },
      };
    case FETCH_COUPON_FAILURE:
      return {
        ...state,
        couponData: {},
      };
    case SET_COUPON_TOTAL:
      return {
        ...state,
        couponTotal: {
          ...state.couponTotal,
          total: action.payload,
        },
      };
    case SET_COUPON_APPLIED_VALUE:
      return {
        ...state,
        couponTotal: {
          ...state.couponTotal,
          appliedValue: action.payload,
        },
      };

    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case GET_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case SET_TRACK_ORDER:
      return {
        ...state,
        trackOrderData: action.payload,
      };
    case SET_POST_ADDRESS_DATA:
      return {
        ...state,
        createNewAddress: action.payload,
      };
    default:
      return state;
  }
};

export default OrderReducerData;
