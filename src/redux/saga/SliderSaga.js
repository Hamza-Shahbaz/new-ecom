// sliderSaga.js
import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchSliderSuccess,
  fetchSliderFailure,
} from "../actions/SliderActions";
import axios from "axios";

function* fetchSlider(action) {
  const { type, setIsLoading } = action;
  const prefix = type.substring(0, type.lastIndexOf("_SLIDER_REQUEST"));
  setIsLoading(true);
  try {
    const response = yield call(axios.get, action.url);
    const sliderData = response?.data;

    yield put(fetchSliderSuccess(prefix, sliderData));
  } catch (error) {
    yield put(fetchSliderFailure(prefix, error?.message));
  } finally {
    setIsLoading(false);
  }
}

function* SliderSaga() {
  yield takeEvery(
    (action) => action.type.endsWith("_SLIDER_REQUEST"),
    fetchSlider
  );
}

export default SliderSaga;
