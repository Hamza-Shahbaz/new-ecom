import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  CATEGORIES_REQUEST,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchSingleProductFailure,
  fetchSingleProductSuccess,
  fetchFeaturedCategoriesSuccess,
  removeFromFavorites,
} from "../actions/CategoryActions";
import {
  FETCH_SINGLE_PRODUCT_REQUEST,
  GET_BANNER_DATA,
  GET_FILTER_DATA,
  GET_LATESTPRODUCTS_DATA,
  GET_POSTERS_DATA,
  GET_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  SET_FILTER_DATA,
  SET_LATESTPRODUCTS_DATA,
  SET_POSTERS_DATA,
  GET_REVIEW_DATA,
  SET_REVIEW_DATA,
  SET_REVIEW_PERMISSION,
  GET_REVIEW_PERMISSION,
  GET_FEATURED_CATEGORIES,
  ADD_TO_FAVORITES,
  POST_FAVORITE_PRODUCT,
  DELETE_FAVORITE_PRODUCT,
  GET_FAVORITES,
  SET_FAVORITES,
  GET_TODAY_DEAL_PRODUCTS,
  SET_TODAY_DEAL_PRODUCTS,
  GET_FILTER_DATA_DEAL,
  SET_FILTER_DATA_DEAL,
  USER_AUTH_ERROR,
} from "../constant/constants";
import { BaseUrl, EndPoints } from "../../utils/Api";
import axios from "axios";
import { MyToast, toast } from "../../components/Toast/MyToast";
import { logoutHandlerAction } from "../actions/AuthAction";

///////////////////Function For Main Category API ////////////////

function* fetchCategories() {
  try {
    const response = yield call(
      axios.get,
      `${BaseUrl}${EndPoints.main_category}`
    );

    const categories = response?.data?.data;
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    // console.error("Front end error: fetchCategories Function", error.message);
    yield put(fetchCategoriesFailure(error?.message));
  }
}

function* fetchFeaturedCategories() {
  try {
    const response = yield call(
      axios.get,
      `${BaseUrl}${EndPoints.featured_category}`
    );

    const featuredCategories = response?.data?.data;
    yield put(fetchFeaturedCategoriesSuccess(featuredCategories));
  } catch (error) {
    // console.error("Front end error: fetchCategories Function", error.message);
    yield put(fetchCategoriesFailure(error?.message));
  }
}

/////////////////// Function For PRODUCTS API ////////////////
function* fetchProducts({ id, setIsLoading, pageFlag, page, limit }) {
  setIsLoading(true);
  try {
    if (id) {
      const response = yield call(
        axios.get,
        pageFlag
          ? `${BaseUrl}${EndPoints.product_by_category}${id}?page=${page}&limit=${limit}`
          : `${BaseUrl}${EndPoints.product_by_category}${id}`
      );
      if (response.data.status) {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
        const productResponse = response.data;
        yield put({
          type: "PRODUCT_SUCCESS",
          payload: productResponse,
        });

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  } catch (error) {
    // console.error("Frontend Error: fetchProducts Function ", error.status);
    setIsLoading(false);
  }
}

function* fetchTodayDealProducts({setIsLoading, filterData, selectedCategoryForDeals}) {
  setIsLoading(true)
  filterData.is_request = 0
  let body = JSON.stringify(filterData);
  try {
    const raw = JSON.stringify({
      body,
    });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = yield call(fetch, BaseUrl + EndPoints.get_products_on_sale + (selectedCategoryForDeals ? ("/" + selectedCategoryForDeals?.category_slug) : ""), {
      method: "POST",
      headers: myHeaders,
      body: raw,
    });
    const parsedResponse = yield response.json();
    if(parsedResponse.status) {
      yield put({type : SET_TODAY_DEAL_PRODUCTS, payload: parsedResponse})
    }
  } catch (e) {
    MyToast(e.message, "error")
  } finally {
    setIsLoading(false)
  }
}

/////////////////// Function For PRODUCTS API ////////////////
function* fetchProductsByFilters({ id, setIsLoading, filterData }) {
  filterData.is_request = 0
  let body = JSON.stringify(filterData);
  try {
    if (id) {
      setIsLoading(true);
      const response = yield call(
        axios.post,
        `${BaseUrl}${EndPoints.filtered_products_of_category}${id}`,
        { body }
      );
      if (response.data.status) {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
        const productResponse = response.data;

        yield put({
          type: "PRODUCT_SUCCESS",
          payload: productResponse,
        });

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  } catch (error) {
    // console.error("Frontend Error: fetchProductsByFilters!", error.status);
    MyToast(error.message, "error" , "rgba(217,92,92,.95)");
    toast.clearWaitingQueue();
    setIsLoading(false);
  }
}

/////////////////// Function For PRODUCTS API ////////////////
function* fetchBanners(action) {
  const setLoading = action.setIsLoading;
  try {
    setLoading(true);
    const response = yield call(axios.get, `${BaseUrl}${EndPoints.banner}`);
    const bannerResponse = response?.data?.data;

    yield put({ type: "SET_BANNER_DATA", payload: bannerResponse });

  } catch (error) {
    // console.error("Frontend Error: fetchBanners Function", error);
  } finally {
    setLoading(false);
  }
}

/////////////////// Function For POSTERS API ////////////////
function* fetchPosters() {
  try {
    const response = yield call(axios.get, `${BaseUrl}${EndPoints.posters}`);
    const postersResponse = response?.data?.data;

    if (response?.status) {
      yield put({ type: SET_POSTERS_DATA, payload: postersResponse });
    } else {
    }
  } catch (error) {
    // console.error("Frontend Error: fetchPosters Function", error);
  }
}

function* fetchLatestProducts() {
  try {
    const response = yield call(
      axios.get,
      `${BaseUrl}${EndPoints.latest_products}`
    );
    const latestProductsResponse = response?.data?.data;

    yield put({
      type: SET_LATESTPRODUCTS_DATA,
      payload: latestProductsResponse,
    });
  } catch (error) {
    // console.error("Frontend Error: fetchLatestProducts Function", error);
  }
}

function* fetchFilterData(productId) {
  const id = productId?.productId;
  productId.setIsLoading(true);
  yield put({
    type: SET_FILTER_DATA,
    payload: [],
  });
  try {
    const response = yield call(
      axios.get,
      `${BaseUrl}${EndPoints.filter}${id}`
    );
    const filterDataResponse = response?.data?.data;

    yield put({
      type: SET_FILTER_DATA,
      payload: filterDataResponse?.filters,
    });
  } catch (error) {
    // console.error("Frontend Error: fetchFilterData Function ", error);
  } finally {
    productId.setIsLoading(false);
  }
}

function* fetchFilterDataDeal(payload) {
  const category_name = payload?.category?.replaceAll(" ", "-");
  payload.setIsLoading(true);
  yield put({
    type: SET_FILTER_DATA_DEAL,
    payload: [],
  });
  try {
    const response = yield call(
      axios.get,
      `${BaseUrl}${EndPoints.get_products_on_sale_filters}${!category_name? "" : ("/"+category_name) }`
    );
    const filterDataResponse = response?.data?.data;

    yield put({
      type: SET_FILTER_DATA_DEAL,
      payload: filterDataResponse?.filters,
    });
  } catch (error) {
    // console.error("Frontend Error: fetchFilterData Function ", error);
  } finally {
    payload.setIsLoading(false);
  }
}

function* addFavouriteProduct(action) {
  const product = action.payload;
  const setIsLoading = action.setIsLoading;
  try {
    setIsLoading(true);
    const token = yield select(
      (state) => state.AuthReducerData.loginUser?.token
    );
    if(!token) {
      toast.clearWaitingQueue()
      MyToast("Please login to perform this action", "error" , "rgba(217,92,92,.95)")
      return
    }
    const body = {
      product_ids: [product.product_id],
      variant_combo_ids: [product.variant_combo_id || 0],
    };
    const headers = {
      Authentication: token,
      "Content-Type": "application/json",
    };
    const response = yield call(
      fetch,
      `${BaseUrl}${EndPoints.insert_wishlist}`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const responseData = yield response.json();
    if (responseData.status) {
      yield put({ type: ADD_TO_FAVORITES, payload: action.payload });
    } else if (responseData?.status == "401" || responseData?.status == "403") {
      yield put({type : USER_AUTH_ERROR, navigate})
    } else {
      MyToast(responseData.message, "error" , "rgba(217,92,92,.95)");
    }
  } catch (e) {
    MyToast(e.message, "error" , "rgba(217,92,92,.95)");
  } finally {
    setIsLoading(false);
  }
}

function* removeFavouriteProduct(action) {
  const product = action.payload;
  const setIsLoading = action.setIsLoading;
  const navigate = action.navigate
  try {
    setIsLoading(true);
    const token = yield select(
      (state) => state.AuthReducerData.loginUser?.token
    );
    if(!token) {
      toast.clearWaitingQueue()
      MyToast("Please login to perform this action", "error" , "rgba(217,92,92,.95)")
      return
    }
    const body = {
      product_ids: [product.product_id],
      variant_combo_ids: [product.variant_combo_id || 0],
    };
    const headers = {
      Authentication: token,
      "Content-Type": "application/json",
    };
    const response = yield call(
      fetch,
      `${BaseUrl}${EndPoints.delete_wishlist}`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const responseData = yield response.json();
    if (responseData.status) {
      yield put(
        removeFromFavorites(product.product_id, product.variant_combo_id)
      );
    } else if (responseData?.status == "401" || responseData?.status == "403") {
      yield put({type : USER_AUTH_ERROR, navigate})
    } else {
      MyToast(responseData.message, "error" , "rgba(217,92,92,.95)");
    }
  } catch (e) {
    MyToast(e.message, "error" , "rgba(217,92,92,.95)");
  } finally {
    setIsLoading(false);
  }
}

/////////////////// Function For GET SITE SETTINGS API ////////////////
function* fetchFavorites() {
  const token = yield select((state) => state.AuthReducerData.loginUser?.token);
  if (!token) {
    return;
  }
  try {
    const headers = {
      Authentication: token,
    };
    const response = yield call(
      axios.get,
      `${BaseUrl}${EndPoints.fetch_wishlist}`,
      {
        headers,
      }
    );
    const parsedResponse = response?.data?.data;
    if (response?.status) {
      const favorites = Object.values(parsedResponse?.products || {});
      yield put({ type: SET_FAVORITES, payload: favorites });
    } else {
    }
  } catch (error) {
    // console.error("Frontend Error: fetchSiteSettings Function", error);
  }
}

function* fetchSingleProduct(action) {
  try {
    const { productId, returnProduct, setProduct, setIsLoading } =
      action.payload;
    if (setIsLoading) {
      setIsLoading(true);
    }
    const product = yield call(
      axios.get,
      `${BaseUrl}${EndPoints.singleproduct}${productId}`
    );

    if (product.data.status) {
      if (returnProduct) {
        setProduct(product.data.data);
      }
      yield put(fetchSingleProductSuccess(product.data.data));
    } else {
    }
  } catch (error) {
    // console.error("Frontend Error: fetchSingleProduct Function ", error.status);
    yield put(fetchSingleProductFailure(error));
  } finally {
    const { productId, returnProduct, setProduct, setIsLoading } =
      action.payload;
    if (setIsLoading) {
      setIsLoading(false);
    }
  }
}

function* fetchProductReviewPermission(action) {
  const id = parseInt(action.payload.productId);
  const token = action.payload.token;
  try {
    const product = yield call(
      axios.get,
      `${BaseUrl}${EndPoints.product_review_permission}${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      }
    );
    if (product.data.status) {
      yield put({ type: SET_REVIEW_PERMISSION, payload: product.data.status });
    } else {
    }
  } catch (error) {
    // console.error(
    //   "Frontend Error: fetchProductReviewPermission Function ",
    //   error
    // );
    // yield put(fetchSingleProductFailure(error));
  }
}

function* handleProductReviews({
  data,
  setLoading,
  productID,
  token,
  setValue,
  navigate
}) {
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("product_id", productID);
    formData.append("comment", data?.comment);
    formData.append("star_rating", data?.rating);
    if (data.picture) {
      Array.from(data.picture).forEach((file, index) => {
        formData.append("image_file[]", file); // Use the same key for all images
      });
    }
    const reviewDataResponse = yield call(
      fetch,
      `${BaseUrl}${EndPoints.productReview}`,
      {
        method: "POST",
        headers: {
          Authentication: token,
        },
        body: formData,
      }
    );
    const response = yield reviewDataResponse.json();
    if (response?.status) {
      yield put({ type: SET_REVIEW_DATA, payload: response });
      setLoading(false);
      setValue("comment", "");
      setValue("rating", null);
      setValue("picture", null);
      toast.clearWaitingQueue();
      MyToast(response?.message, "success" , "rgba(91,189,114,.95)");
    }
    else if (
      response?.status == "401" ||
      response?.status == "403"
    ) {
      yield put({type : USER_AUTH_ERROR, navigate})
    } 
    else {
      setLoading(false);
      toast.clearWaitingQueue();
      MyToast(response?.message, "error" , "rgba(217,92,92,.95)");
    }
  } catch (err) {
    setLoading(false);
    toast.clearWaitingQueue();
    MyToast(err?.message, "error" , "rgba(217,92,92,.95)");
  }
}

function* CategorySaga() {
  yield takeEvery(CATEGORIES_REQUEST, fetchCategories);
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(GET_TODAY_DEAL_PRODUCTS, fetchTodayDealProducts);
  yield takeEvery(GET_FEATURED_CATEGORIES, fetchFeaturedCategories);
  yield takeEvery(GET_REVIEW_PERMISSION, fetchProductReviewPermission);
  yield takeEvery(GET_FILTERED_PRODUCTS, fetchProductsByFilters);
  yield takeEvery(GET_BANNER_DATA, fetchBanners);
  yield takeEvery(FETCH_SINGLE_PRODUCT_REQUEST, fetchSingleProduct);
  yield takeEvery(GET_LATESTPRODUCTS_DATA, fetchLatestProducts);
  yield takeEvery(GET_FILTER_DATA, fetchFilterData);
  yield takeEvery(GET_FILTER_DATA_DEAL, fetchFilterDataDeal);
  yield takeEvery(POST_FAVORITE_PRODUCT, addFavouriteProduct);
  yield takeEvery(DELETE_FAVORITE_PRODUCT, removeFavouriteProduct);
  yield takeEvery(GET_POSTERS_DATA, fetchPosters);
  yield takeEvery(GET_FAVORITES, fetchFavorites);
  yield takeEvery(GET_REVIEW_DATA, handleProductReviews);
}

export default CategorySaga;
