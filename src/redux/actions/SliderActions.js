// sliderActions.js
export const createSliderActionTypes = (prefix) => ({
  SLIDER_REQUEST: `${prefix}_SLIDER_REQUEST`,
  SLIDER_SUCCESS: `${prefix}_SLIDER_SUCCESS`,
  SLIDER_FAILURE: `${prefix}_SLIDER_FAILURE`,
  RESET_SLIDER_DATA: `${prefix}_SLIDER_RESET`,
});



export const fetchSliderRequest = (prefix, url, setIsLoading) => {
  return {
    type: createSliderActionTypes(prefix).SLIDER_REQUEST,
    url: url,
    setIsLoading: setIsLoading // Include setIsLoading in the action
  };
};

export const fetchSliderSuccess = (prefix, sliderData ) => {
  return {
    type: createSliderActionTypes(prefix).SLIDER_SUCCESS,
    payload: sliderData,
    prefix: prefix,
  };
};

export const fetchSliderFailure = (prefix, error) => {
  return {
    type: createSliderActionTypes(prefix).SLIDER_FAILURE,
    payload: error,
    prefix: prefix,
  };
};

export const resetSpecificSliderData = (prefix) => {
  return {
    type: createSliderActionTypes(prefix).RESET_SLIDER_DATA,
    prefix: prefix,
    // setIsLoading: setIsLoading // Include setIsLoading in the action
  };
};

