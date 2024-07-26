import {
  ADD_QUANTITY,
  ADD_TO_CART,
  ADD_TO_FAVORITES,
  CALCULATE_FINAL_TOTAL,
  CALCULATE_TOTAL_DISCOUNT,
  CALCULATE_TOTAL_PRICE,
  CLEAR_CART,
  GET_BANNER_DATA,
  GET_FILTER_DATA,
  GET_LATESTPRODUCTS_DATA,
  GET_POSTERS_DATA,
  GET_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAVORITES,
  REMOVE_QUANTITY,
  RESET_PRODUCTS,
  GET_REVIEW_DATA,
  GET_REVIEW_PERMISSION,
  GET_FEATURED_CATEGORIES,
  SET_FEATURED_CATEGORIES,
  GET_FILTER_DATA_DEAL,
} from "../constant/constants";

export const CATEGORIES_REQUEST = "CATEGORIES_REQUEST";
export const CATEGORIES_SUCCESS = "CATEGORIES_SUCCESS";
export const CATEGORIES_FAILURE = "CATEGORIES_FAILURE";

////////////////ACTION FOR Main Category API

export const fetchCategoriesRequest = () => ({
  type: CATEGORIES_REQUEST,
});

export const getFeaturedCategories = () => ({
  type: GET_FEATURED_CATEGORIES,
});

export function fetchCategoriesSuccess(categories) {
  return {
    type: CATEGORIES_SUCCESS,
    payload: categories,
  };
}

export function fetchFeaturedCategoriesSuccess(categories) {
  return {
    type: SET_FEATURED_CATEGORIES,
    payload: categories,
  };
}

export const fetchCategoriesFailure = (error) => ({
  type: CATEGORIES_FAILURE,
  payload: error,
});

////////////////ACTION FOR PRODUCT API
export const handleProductsData = (
  id,
  setIsLoading,
  pageFlag = false,
  page = 1,
  limit = 50
) => {
  return {
    type: GET_PRODUCTS,
    id,
    setIsLoading,
    pageFlag,
    page,
    limit,
  };
};

export const handleFilteredProducts = (id, setIsLoading, filterData) => {
  return {
    type: GET_FILTERED_PRODUCTS,
    id,
    setIsLoading,
    filterData,
  };
};

export const resetSubProductData = () => {
  return {
    type: RESET_PRODUCTS,
  };
};

////////////////ACTION FOR BANNER API
export const handleBannersData = (setIsLoading) => {
  return {
    type: GET_BANNER_DATA,
    setIsLoading
  };
};

////////////////ACTION FOR POSTERS API
export const handlePostersData = () => {
  return {
    type: GET_POSTERS_DATA,
  };
};

////////////////ACTION FOR LATEST PRODUCTS API
export const handleLatestProductsData = () => {
  return {
    type: GET_LATESTPRODUCTS_DATA,
  };
};

////////////////ACTION FOR FILTER PRODUCTS API
export const handleFilterData = (productId, setIsLoading) => {
  return {
    type: GET_FILTER_DATA,
    productId,
    setIsLoading
  };
};


////////////////ACTION FOR FILTERS FOR DEALS PRODUCTS API
export const handleFilterDataDeals = (category, setIsLoading) => {
  return {
    type: GET_FILTER_DATA_DEAL,
    category,
    setIsLoading
  };
};

//////////ACTION FOR CREATE-PRODUCT-REVIEW API//////////
export const handleReviewsData = (
  data,
  setLoading,
  productID,
  token,
  setValue,
  navigate
) => {
  return {
    type: GET_REVIEW_DATA,
    data,
    setLoading,
    productID,
    token,
    setValue,
    navigate,
  };
};

// ////////////////ACTION FOR Similar PRODUCTS API
// export const handleSimilarProductsData = () => {
//   console.log("handleSimilarProductsData Action called");
//   return {
//     type: GET_SIMILARPRODUCTS_DATA,
//   };
// };

//////////////// ACTION FOR CART WORK /////////////////

export const addToCart = (selectedProduct, stock) => {
  return {
    type: ADD_TO_CART,
    payload: selectedProduct,
    stock: stock,
  };
};

export const addQuantity = (id, variantType, quantity) => {
  return {
    type: ADD_QUANTITY,
    payload: { id, variant_combo_id: variantType, quantity: quantity },
  };
};

export const removeFromCart = (product_id, variantType) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { product_id, variant_combo_id: variantType },
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};


export const removeQuantity = (id, variantType) => {
  return {
    type: REMOVE_QUANTITY,
    payload: { id, variant_combo_id: variantType },
  };
};

export const calculateTotalPrice = (totalPrice) => {
  return {
    type: CALCULATE_TOTAL_PRICE,
    payload: totalPrice,
  };
};

export const calculateTotalDiscount = (totalDiscount) => {
  return {
    type: CALCULATE_TOTAL_DISCOUNT,
    payload: totalDiscount,
  };
};

export const calculateFinalPrice = (finalTotal) => {
  return {
    type: CALCULATE_FINAL_TOTAL,
    payload: finalTotal,
  };
};

///////////////////////////// Favourites / wishlist

export const addToFavorites = (product) => ({
  type: ADD_TO_FAVORITES,
  payload: product,
});

export const removeFromFavorites = (productId, variantType) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: { productId, variant_combo_id: variantType },
});



///////////////////////////// Fetch single product by id:

// actions.
import {
  FETCH_SINGLE_PRODUCT_REQUEST,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_FAILURE,
} from "../constant/constants";

export const fetchSingleProductRequest = (
  productId,
  returnProduct = false,
  setProduct,
  setIsLoading
) => ({
  type: FETCH_SINGLE_PRODUCT_REQUEST,
  payload: { productId, returnProduct, setProduct, setIsLoading },
});

export const fetchSingleProductSuccess = (product) => ({
  type: FETCH_SINGLE_PRODUCT_SUCCESS,
  payload: { product },
});

export const fetchProductReviewPermission = (productId, token) => {
  return {
    type: GET_REVIEW_PERMISSION,
    payload: { productId, token },
  };
};

export const fetchSingleProductFailure = (error) => ({
  type: FETCH_SINGLE_PRODUCT_FAILURE,
  payload: { error },
});
