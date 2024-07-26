// // sliderReducer.js
import { createSliderActionTypes } from "../actions/SliderActions";

const createInitialState = () => ({
  sliders: {
    BEST_MOBILE: {
      sliderData: [],
      loading: false,
      error: null,
    },
    LATEST_GAMING: {
      sliderData: [],
      loading: false,
      error: null,
    },
    BEST_SELLING_PRODUCTS: {
      sliderData: [],
      loading: false,
      error: null,
    },
    FEATURED_DEALS: {
      sliderData: [],
      loading: false,
      error: null,
    },
    LIGHTENINIG_DEALS: {
      sliderData: [],
      loading: false,
      error: null,
    },
    SIMILAR_PRODUCTS: {
      sliderData: [],
      loading: false,
      error: null,
    },
    GET_POSTER: {
      sliderData: [],
      loading: false,
      error: null,
    },

  },
});

export const SliderReducerData = (state = createInitialState(), action) => {
  const { prefix } = action;

  if (prefix && state.sliders[prefix]) {
    switch (action.type) {
      case createSliderActionTypes(prefix).SLIDER_SUCCESS:
        return {
          ...state,
          sliders: {
            ...state.sliders,
            [prefix]: {
              ...state.sliders[prefix],
              sliderData: action.payload,
              error: null,
            },
          },
        };
      case createSliderActionTypes(prefix).SLIDER_FAILURE:
        return {
          ...state,
          sliders: {
            ...state.sliders,
            [prefix]: {
              ...state.sliders[prefix],
              error: action.payload,
              sliderData: [],
            },
          },
        };
      case createSliderActionTypes(prefix).RESET_SLIDER_DATA: // Using prefix directly as action type
        return {
          ...state,
          sliders: {
            ...state.sliders,
            [prefix]: {
              ...state.sliders[prefix],
              sliderData: [],
            },
          },
        };

      default:
        return state;
    }
  }
  return state;
};
