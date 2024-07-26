import { combineReducers } from "redux";
import { AuthReducerData } from "../redux/reducers/AuthReducer";
import {siteSettingReducerData, tabsId, updateProfileReducerData , dashboardReducerData, addressesReducerData} from "../redux/reducers/AuthReducer";

import {
  categoryReducerData,
  productReducerData,
  handleCartItem,
  bannerReducerData,
  latestProductsReducerData,
  postersReducerData,
  filterReducerData,
  reviewReducerData,
  setProductReviewPermission,
  todayDealsReducer
} from "./reducers/CategoryReducer";
import { SliderReducerData } from "./reducers/SliderReducer";
import { singleProductReducer } from "./reducers/ProductReducer";
import OrderReducerData from "./reducers/OrderReducer";
import { BreadcrumbReducerData } from "./reducers/BreadcrumbsReducer";

export default combineReducers({
  AuthReducerData,
  categoryReducerData,
  reviewReducerData,
  SliderReducerData,
  productReducerData,
  handleCartItem,
  bannerReducerData,
  latestProductsReducerData,
  singleProductReducer,
  setProductReviewPermission,
  OrderReducerData,
  postersReducerData,
  filterReducerData,
  todayDealsReducer,
  siteSettingReducerData,
  BreadcrumbReducerData,
  tabsId,
  updateProfileReducerData,
  dashboardReducerData,
  addressesReducerData
});
