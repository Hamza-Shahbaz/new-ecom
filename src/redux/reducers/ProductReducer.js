// reducers.js
import {
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_FAILURE,
} from "../constant/constants";

const initialState = {
  product: null,
  error: null,
  loading: false,
};

export const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload.product,
      };
    case FETCH_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
