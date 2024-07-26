// reducers/categoryReducer.js
import {
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
} from "../actions/CategoryActions";
import {
  ADD_QUANTITY,
  ADD_TO_CART,
  ADD_TO_FAVORITES,
  CALCULATE_FINAL_TOTAL,
  CALCULATE_TOTAL_DISCOUNT,
  CALCULATE_TOTAL_PRICE,
  CLEAR_CART,
  CLEAR_FAVORITES,
  FETCH_SHIPPING_OPTIONS_SUCCESS,
  PRODUCT_SUCCESS,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAVORITES,
  REMOVE_QUANTITY,
  RESET_PRODUCTS,
  RESET_REVIEW_PERMISSION,
  SET_BANNER_DATA,
  SET_CART,
  SET_FAVORITES,
  SET_FEATURED_CATEGORIES,
  SET_FILTER_DATA,
  SET_FILTER_DATA_DEAL,
  SET_LATESTPRODUCTS_DATA,
  SET_POSTERS_DATA,
  SET_REVIEW_DATA,
  SET_REVIEW_PERMISSION,
  SET_TODAY_DEAL_PRODUCTS,
  UPDATE_SELECTED_SHIPPING,
} from "../constant/constants";

//initial state for all reducer
const initialState = {
  categories: [],
  featuredCategories: [],
  product: [],
  filteredProducts: {},
  totalPrice: 0,
  totalDiscount: 0,
  finalTotal: 0,
  addToCart: [],
  selectedShippingOptions: {},
  shippingTemplates : [],
  favorites: [],
  banner: [],
  posters: [],
  latestProducts: [],
  filterData: [],
  filterDataDeals: [],
  reviews: [],
  reviewPermission: false,
  todayDeals: [],
  shippingAmount : 0,
};

//Reducer for Main Category API
export const categoryReducerData = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_FEATURED_CATEGORIES:
      return { ...state, featuredCategories: action.payload };
    default:
      return state;
  }
};

//Reducer for Products API
export const productReducerData = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SUCCESS:
      return { ...state, product: action.payload };

    case RESET_PRODUCTS:
      return { ...state, product: [] };

    default:
      return state;
  }
};

//////////REDUCER FOR CREATE-PRODUCT-REVIEW API//////////
export const reviewReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEW_DATA:
      return { ...state, reviews: action.payload };

    default:
      return state;
  }
};

export const setProductReviewPermission = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEW_PERMISSION:
      return { ...state, reviewPermission: action.payload }; // Setting reviewPermission based on payload
    case RESET_REVIEW_PERMISSION:
      return { ...state, reviewPermission: false };
    default:
      return state;
  }
};

//Reducer for Banners API
export const bannerReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_BANNER_DATA:
      return { ...state, banner: action.payload };

    default:
      return state;
  }
};

//Reducer for POSTERS API
export const postersReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTERS_DATA:
      return { ...state, posters: action.payload };

    default:
      return state;
  }
};

//Reducer for Latest Products API

export const latestProductsReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LATESTPRODUCTS_DATA:
      return {
        ...state,
        latestProducts: action.payload,
      };

    default:
      return state;
  }
};

//Reducer for FILTER API

export const filterReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };

    case SET_FILTER_DATA_DEAL:
      return {
        ...state,
        filterDataDeals: action.payload,
      };

    default:
      return state;
  }
};

export const todayDealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODAY_DEAL_PRODUCTS:
      return {
        ...state,
        todayDeals: action.payload,
      };
    default:
      return state;
  }
};

export const handleCartItem = (state = initialState, action) => {
  const selectedProduct = state.addToCart.find((product) => {
    if (
      product?.product_id === action?.payload?.product_id &&
      product?.variant_combo_id === action?.payload?.variant_combo_id
    ) {
      return true;
    }
    return false;
  });

  switch (action.type) {
    case ADD_TO_CART:
      if (selectedProduct) {
        const newCart = state.addToCart.filter((product) => {
          if (
            product?.product_id === selectedProduct?.product_id &&
            product?.variant_combo_id === selectedProduct?.variant_combo_id
          ) {
            return false;
          } else {
            return true;
          }
        });
        if (selectedProduct?.quantity < selectedProduct.stock) {
          selectedProduct.quantity += 1;
        }
        return {
          ...state,
          addToCart: [...newCart, selectedProduct],
        };
      }
      return {
        ...state,
        addToCart: [
          ...state.addToCart,
          {
            ...action.payload,
            quantity: action.quantity || 1,
            stock: action.stock,
          },
        ],
      };

    case ADD_QUANTITY:
      const existingProductIndexx = state.addToCart.findIndex((product) => {
        if (product?.product_id === action?.payload.product_id) {
          if (action.payload.variant_combo_id !== undefined) {
            return (
              action.payload.variant_combo_id === product?.variant_combo_id
            );
          }
          return true;
        }
        return false;
      });

      if (existingProductIndexx !== -1) {
        const existingProduct = state?.addToCart[existingProductIndexx];

        const updatedCart = state?.addToCart.map((product, index) => {
          if (index === existingProductIndexx) {
            if (product?.quantity < product?.stock) {
              return {
                ...product,
                quantity: product.quantity + (action.quantity || 1),
              };
            } else {
            }
            return product;
          } else {
            return product;
          }
        });

        return {
          ...state,
          addToCart: updatedCart,
        };
      }

      return {
        ...state,
        addToCart: [...state.addToCart, newProduct],
      };

    case REMOVE_FROM_CART:
      const newCart = state?.addToCart?.filter((product) => {
        if (product?.product_id === action?.payload.product_id) {
          if (action?.payload.variant_combo_id !== undefined) {
            return (
              product.variant_combo_id !== action?.payload.variant_combo_id
            );
          }
          return false;
        }
        return true;
      });
      return {
        ...state,
        addToCart: newCart,
      };

    case CALCULATE_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    case CALCULATE_TOTAL_DISCOUNT:
      return {
        ...state,
        totalDiscount: action.payload,
      };

    case CALCULATE_FINAL_TOTAL:
      return {
        ...state,
        finalTotal: action.payload,
      };

    case REMOVE_QUANTITY:
      const existingProductIndex = state.addToCart.findIndex((product) => {
        if (product?.product_id === action?.payload.product_id) {
          if (action.payload.variant_combo_id !== undefined) {
            return (
              action.payload.variant_combo_id === product?.variant_combo_id
            );
          }
          return true;
        }
        return false;
      });

      if (existingProductIndex !== -1) {
        const existingProduct = state.addToCart[existingProductIndex];

        if (existingProduct.quantity > 1) {
          // If product has multiple quantities, decrement the quantity
          const newCart = [...state.addToCart];
          newCart[existingProductIndex] = {
            ...existingProduct,
            quantity: existingProduct.quantity - 1,
          };

          return {
            ...state,
            addToCart: newCart,
          };
        } else {
          // If product has a single quantity, remove it from the cart
          const newCart = state.addToCart
            .slice(0, existingProductIndex)
            .concat(state.addToCart.slice(existingProductIndex + 1));
          return {
            ...state,
            addToCart: newCart,
          };
        }
      }

    case FETCH_SHIPPING_OPTIONS_SUCCESS:
      return {
        ...state,
        addToCart: action.payload.newCartInfo,
        shippingTemplates : action.payload.templates,
        shippingAmount : action.payload.shippingAmount
      };

    case UPDATE_SELECTED_SHIPPING:
      return { ...state, selectedShippingOptions: action.payload };

    case CLEAR_CART:
      return {
        ...state,
        addToCart: [],
        finalTotal: [],
        totalPrice: [],
        shippingAmount : 0,
        shippingTemplates : []
      };

    case SET_CART : 
      return  {
        ...state,
        addToCart : action.payload
      }

    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };

    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: [],
      };

    case ADD_TO_FAVORITES:
      const productId = action.payload.product_id;
      const isProductInFavorites = state.favorites.some((product) => {
        if (product?.product_id === productId) {
          if (action.payload.variant_combo_id !== undefined) {
            return (
              action.payload.variant_combo_id === product?.variant_combo_id
            );
          }
          return true;
        }
        return false;
      });
      if (!isProductInFavorites) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      } else {
        return state;
      }
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((product) => {
          if (product.product_id === action.payload.productId) {
            if (action.payload.variant_combo_id !== undefined) {
              return (
                action?.payload?.variant_combo_id !== product.variant_combo_id
              );
            }
            return false;
          }
          return true;
        }),
      };
    default:
      return state;
  }
};
