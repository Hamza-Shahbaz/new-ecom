////////////////// For Auth /////////////
////////////For Register /////////////

export const REGISTER_USER = "REGISTER_USER";
export const SET_REGISTER_USER = "SET_REGISTER_USER";
export const AUTH_LOADING = "AUTH_LOADING";

////////////For Login///////////////

export const LOGIN_REQUESTING = "LOGIN_REQUESTING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_PAGE_INIT = "LOGIN_PAGE_INIT";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_GUEST = "LOGOUT_GUEST";
export const OPEN_MODAL = "OPEN_MODAL";
export const USER_AUTH_ERROR = "USER_AUTH_ERROR"
export const PROCESS_USER_LOGOUT = "PROCESS_USER_LOGOUT"

////////////For Guest Login///////////////
export const GUEST_LOGIN_REQUESTING = "GUEST_LOGIN_REQUESTING";
export const GUEST_LOGIN_SUCCESS = "GUEST_LOGIN_SUCCESS";
export const GUEST_LOGIN_FAILURE = "GUEST_LOGIN_FAILURE";

////////////For Newsletter Subscription///////////////
export const SUBSCRIBE_TO_NEWSLETTER = "SUBSCRIBE_TO_NEWSLETTER";

////////////For Error Logging///////////////
export const POST_ERROR_ON_SERVER = "POST_ERROR_ON_SERVER"

////////////For Reset Password///////////////
export const RESET_PASSWORD = "RESET_PASSWORD";
export const SET_RESET_PASSWORD = "SET_RESET_PASSWORD";
export const UPDATE_TIMER = "UPDATE_TIMER";

////////////For Update Info ///////////////
export const UPDATE_INFO = "UPDATE_INFO";
export const SET_UPDATE_INFO = "SET_UPDATE_INFO";
export const CLEAR_UPDATE_INFO = "CLEAR_UPDATE_INFO";

////////////For Dashboard Data ///////////////
export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";

////////////For Get Address Data ///////////////
export const GET_ADDRESS_DATA = "GET_ADDRESS_DATA";
export const SET_ADDRESS_DATA = "SET_ADDRESS_DATA";
export const CLEAR_CREATE_ADDRESS_DATA = "CLEAR_CREATE_ADDRESS_DATA";

//////////Global Set Create Address Status //////////
export const STATUS = "STATUS";

//////////ICON ID //////////
export const SELECTED_ADDRESS_ID = "SELECTED_ADDRESS_ID";
export const PATH_NAME = "PATH_NAME";
export const PATH_NAME_CHECKOUT = "PATH_NAME_CHECKOUT";
export const PATH_NAME_DASHBOARD = "PATH_NAME_DASHBOARD";

////////////For Get Address Data ///////////////
export const REMOVE_ADDRESS_DATA = "REMOVE_ADDRESS_DATA";
export const LOCALLY_REMOVE_ADDRESS_DATA = "LOCALLY_REMOVE_ADDRESS_DATA";

////////////For Forgot Password///////////////
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const SET_FORGOT_PASSWORD = "SET_FORGOT_PASSWORD";

////////////For GET SITE SETTINGS///////////////
export const SET_SITESETTINGS = "SET_SITESETTINGS";
export const GET_SITESETTINGS = "GET_SITESETTINGS";
export const SET_CURRENT_CURRENCY = "SET_CURRENT_CURRENCY";

//////Product API////
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_FILTERED_PRODUCTS = "GET_FILTERED_PRODUCTS";
export const RESET_PRODUCTS = "RESET_PRODUCTS";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";


////////////For All Todays Deal Products///////////////
export const GET_TODAY_DEAL_PRODUCTS = "GET_TODAY_DEAL_PRODUCTS"
export const SET_TODAY_DEAL_PRODUCTS = "SET_TODAY_DEAL_PRODUCTS"

//////////CART WORK//////////
export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const ADD_QUANTITY_FROM_CHECKOUT = "ADD_QUANTITY_FROM_CHECKOUT"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_QUANTITY = "REMOVE_QUANTITY";
export const CALCULATE_TOTAL_PRICE = "CALCULATE_TOTAL_PRICE";
export const CALCULATE_TOTAL_DISCOUNT = "CALCULATE_TOTAL_DISCOUNT";
export const CALCULATE_FINAL_TOTAL = "CALCULATE_FINAL_TOTAL";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_CART_FROM_SHIPPING_OPTIONS = "UPDATE_CART_FROM_SHIPPING_OPTIONS"
export const SET_CART = "SET_CART"

////////// Favourites Product / wishlist //////////
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const POST_FAVORITE_PRODUCT = "POST_FAVORITE_PRODUCT";
export const DELETE_FAVORITE_PRODUCT = "DELETE_FAVORITE_PRODUCT";
export const GET_FAVORITES = "GET_FAVORITES";
export const SET_FAVORITES = "SET_FAVORITES";
export const CLEAR_FAVORITES = "CLEAR_FAVORITES";

//////////BANNER API//////////
export const GET_BANNER_DATA = "GET_BANNER_DATA";
export const SET_BANNER_DATA = "SET_BANNER_DATA";

//////////WORK QUEUE API//////////
export const GET_WORKQUEUE = "GET_WORKQUEUE";

//////////PSOTERS API//////////
export const GET_POSTERS_DATA = "GET_POSTERS_DATA";
export const SET_POSTERS_DATA = "SET_POSTERS_DATA";

//////////CATEGORIES API//////////
export const GET_FEATURED_CATEGORIES = "GET_FEATURED_CATEGORIES";
export const SET_FEATURED_CATEGORIES = "SET_FEATURED_CATEGORIES";
export const GET_FEATURED_CATEGORIES_FOR_CATEGORY = "GET_FEATURED_CATEGORIES_FOR_CATEGORY"

//////////LATEST PRODUCTS API//////////
export const GET_LATESTPRODUCTS_DATA = "GET_LATESTPRODUCTS_DATA";
export const SET_LATESTPRODUCTS_DATA = "SET_LATESTPRODUCTS_DATA";

//////////FILTER API//////////
export const GET_FILTER_DATA = "GET_FILTER_DATA";
export const SET_FILTER_DATA = "SET_FILTER_DATA";
export const GET_FILTER_DATA_DEAL = "GET_FILTER_DATA_DEAL";
export const SET_FILTER_DATA_DEAL = "SET_FILTER_DATA_DEAL";

//////////ICON ID //////////
export const GET_ICON_ID = "GET_ICON_ID";
export const REMOVE_ICON_ID = "REMOVE_ICON_ID";
export const GLOBAL_ID = "GLOBAL_ID";
export const REMOVE_GLOBAL_ID = "REMOVE_GLOBAL_ID";

//////////CREATE-PRODUCT-REVIEW API//////////
export const GET_REVIEW_PERMISSION = "GET_REVIEW_PERMISSION";
export const SET_REVIEW_PERMISSION = "SET_REVIEW_PERMISSION";
export const RESET_REVIEW_PERMISSION = "RESET_REVIEW_PERMISSION";
export const GET_REVIEW_DATA = "GET_REVIEW_DATA";
export const SET_REVIEW_DATA = "SET_REVIEW_DATA";

//////////Update cart API//////////

export const UPDATING_CART = "UPDATING_CART";
export const UPDATING_CART_ERROR = "UPDATING_CART_ERROR";
export const UPDATING_CART_SUCCESS = "UPDATING_CART_SUCCESS";

//////////Fetch Single product by id API//////////

export const FETCH_SINGLE_PRODUCT_REQUEST = "FETCH_SINGLE_PRODUCT_REQUEST";
export const FETCH_SINGLE_PRODUCT_SUCCESS = "FETCH_SINGLE_PRODUCT_SUCCESS";
export const FETCH_SINGLE_PRODUCT_FAILURE = "FETCH_SINGLE_PRODUCT_FAILURE";

//////////Get order screen data//////////
export const FETCH_ORDER_DATA_REQUEST = "FETCH_ORDER_DATA_REQUEST";
export const FETCH_ORDER_DATA_SUCCESS = "FETCH_ORDER_DATA_SUCCESS";
export const FETCH_ORDER_DATA_FAILURE = "FETCH_ORDER_DATA_FAILURE";

//////////Get order shipping options//////////
export const FETCH_SHIPPING_OPTIONS = "FETCH_SHIPPING_OPTIONS"
export const FETCH_SHIPPING_OPTIONS_SUCCESS = "FETCH_SHIPPING_OPTIONS_SUCCESS"
export const UPDATE_SHIPPING_OPTIONS_SAGA = "UPDATE_SHIPPING_OPTIONS_SAGA"
export const UPDATE_SELECTED_SHIPPING = "UPDATE_SELECTED_SHIPPING"

//////////Post Address//////////
export const ADD_ADDRESS = "ADD_ADDRESS";
export const ADD_ADDRESS_SUCCESS = "ADD_ADDRESS_SUCCESS";
export const ADD_ADDRESS_ERROR = "ADD_ADDRESS_ERROR";
export const SAVE_ADDRESS = "SAVE_ADDRESS";
export const SHIP_ADDRESS_SUCCESS = "SHIP_ADDRESS_SUCCESS";
export const CLEAR_SHIP_ADDRESS = "CLEAR_SHIP_ADDRESS";

/////Adress from Dashboard Setting/////////
export const ADD_ADDRESS_SETTING = "ADD_ADDRESS_SETTING";
export const ADD_ADDRESS_SETTING_SUCCESS = "ADD_ADDRESS_SETTING_SUCCESS";

/////Create / Edit Address/////////
export const POST_ADDRESS_DATA = "POST_ADDRESS_DATA";
export const SET_POST_ADDRESS_DATA = "SET_POST_ADDRESS_DATA";
export const LOCALLY_ADD_ADDRESS_DATA = "LOCALLY_ADD_ADDRESS_DATA";
export const LOCALLY_EDIT_ADDRESS_DATA = "LOCALLY_EDIT_ADDRESS_DATA";

//////////Add Card / payment method //////////
export const ADD_PAYMENT_METHOD_REQUEST = "ADD_PAYMENT_METHOD_REQUEST";
export const ADD_PAYMENT_METHOD_SUCCESS = "ADD_PAYMENT_METHOD_SUCCESS";
export const ADD_PAYMENT_METHOD_FAILURE = "ADD_PAYMENT_METHOD_FAILURE";

//////////Remove Card //////////
export const REMOVE_CARD_REQUEST = "REMOVE_CARD_REQUEST";
export const REMOVE_CARD_SUCCESS = "REMOVE_CARD_SUCCESS";
export const REMOVE_CARD_FAILURE = "REMOVE_CARD_FAILURE";

//////////Active section //////////
export const ACTIVE_SECTION = "ACTIVE_SECTION";

//////////Clear address data //////////
export const CLEAR_ADDRESS_DATA = "CLEAR_ADDRESS_DATA";

////////// Clear Order data //////////
export const CLEAR_ORDER_DATA = "CLEAR_ORDER_DATA";

//////////'Add Payment Mehtod' form visibility //////////
export const ADD_PAYMENT_VISIBLE = "ADD_PAYMENT_VISIBLE";

//////////'Add Payment Mehtod' form visibility //////////
export const SET_ADDRESS_ID = "SET_ADDRESS_ID";

//////////Proceed Order //////////
export const ORDER_CONFIRM_REQUEST = "ORDER_CONFIRM_REQUEST";
export const ORDER_CONFIRM_SUCCESS = "ORDER_CONFIRM_SUCCESS";
export const ORDER_CONFIRM_FAILURE = "STORE_ORDER_FAILURE";
export const ORDER_PAYMENT_SUCCESS = "ORDER_PAYMENT_SUCCESS";

////////// Merge Card State //////////
export const MERGE_CARDS = "MERGE_CARDS";

// constants.js

export const FETCH_COUPON_REQUEST = "FETCH_COUPON_REQUEST";
export const FETCH_COUPON_SUCCESS = "FETCH_COUPON_SUCCESS";
export const FETCH_COUPON_FAILURE = "FETCH_COUPON_FAILURE";
export const FETCH_ALL_COUPONS = "FETCH_ALL_COUPONS";
export const CLEAR_COUPON = "CLEAR_COUPON";
export const SET_TODAY_COUPONS = "SET_TODAY_COUPONS"
export const GET_CURRENT_COUPONS = "GET_CURRENT_COUPONS"

export const SET_HOME_BREADCRUMB = "SET_HOME_BREADCRUMB";
export const SUB_CATEGORY_BREADCRUMB = "SUB_CATEGORY_BREADCRUMB";
export const CATEGORY_BREADCRUMB = "CATEGORY_BREADCRUMB";
export const TRUNCATE_BREADCRUMBS = "TRUNCATE_BREADCRUMBS";
export const PRODUCT_BREADCRUMB = "PRODUCT_BREADCRUMB";
export const RESET_BREADCRUMBS = "RESET_BREADCRUMBS";

///////////////   Get Orders status of customers
export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";

///////////////   Get Order detail of customers
export const GET_ORDER_DETAILS_REQUEST = "GET_ORDER_DETAILS_REQUEST";
export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILURE = "GET_ORDER_DETAILS_FAILURE";

/////////////// Coupon total
export const SET_COUPON_TOTAL = "SET_COUPON_TOTAL";
export const SET_COUPON_APPLIED_VALUE = "SET_COUPON_APPLIED_VALUE";

/////////////// Track Order
export const GET_TRACK_ORDER = "GET_TRACK_ORDER";
export const SET_TRACK_ORDER = "SET_TRACK_ORDER";
