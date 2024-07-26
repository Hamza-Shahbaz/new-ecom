import { all } from "redux-saga/effects";
import SliderSaga from "./saga/SliderSaga";
import CategorySaga from "./saga/CategorySaga";
import AuthSaga from "./saga/AuthSaga";
import OrderSaga from "./saga/OrderSaga";

export function* mainSaga() {
  yield all([
    AuthSaga(),
    SliderSaga(),
    CategorySaga(),
    OrderSaga()
  ]);
}