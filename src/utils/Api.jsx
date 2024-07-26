// export const BaseUrl = "https://ecommerce.ohiobizz.com/api/";
export const BaseUrl = "https://ecommerce.sourcecodeemployees.com/api/";

export const EndPoints = {
  login: "login", // login user
  registerUser: "register", //Register
  forgotPassword: "user/send-password-reset-email", //forgot password
  resetPassword: "reset-password", //reset password
  updateProfile: "update-customer-profile", //update profile data
  product: "products/category/", // get products by category
  productReview: "create-product-review", //productReview
  product_by_category: "products/category/", // get products by category
  products: "products", // get products by category
  singleproduct: "product/",
  subscribeToNewsletterApiEndpoint: "subscribe-to-newsletter",
  product_review_permission: "check-if-product-can-be-reviewed/", //get permission for user review insertion
  main_category: "main-category-new", // get categories
  banner: "banners", //for main page banners
  filtered_products_of_category: "products/category-products-filtered/", //for getting filtered products in any category
  posters: "get-posters", //for main page posters
  latest_products: "get-latest-products", //for latest products
  similar_products: "get-similar-products/", //for similar products
  cart: "cart/update", //for cart
  order_data: "get-order-data", //for main page banners
  add_card: "add-card", //for checkout
  register_address: "register-address", //checkout
  store_order: "store-order", //checkout
  remove_card: "remove-card", //checkout
  work_queue: "work-queue", // for work queue
  siteSettings: "settings/get-site-settings", // site setting
  filter: "filters/get-filters-for-category/", // filter
  best_selling_products: "get-best-selling-products", //category
  search_product: "search-products?text=",
  search_product_category: (cartegory, query) =>
    `search-products-by-category/${cartegory}?text=${query}`,
  guest_login: "guest-login",
  featured_category: "featured-category-new", //category
  featured_products: "featured-products/", //products
  lightening_products: "get-lightening-products/", //category
  coupon: "coupon/", //coupon
  update_order_to_pending: "update-order-to-pending",
  get_tags: "get-tags",
  user_orders_status: "get-orders-for-customer", //order status
  user_order_details: "get-order-details-for-customer/", //order Detail
  getFakePhotos1: "https://jsonplaceholder.typicode.com/photos", //fake photos api 1 for check
  getFakePhotos2: "https://fakestoreapi.com/products?limit=20", //fake photos api 2 for check
  dashboard_data: "get-dashboard-data",
  insert_wishlist: "insert-wishlist",
  delete_wishlist: "delete-wishlist",
  track_order_detail: "get-order-tracking-data/",
  fetch_wishlist: "get-wishlist-products",
  get_all_coupons: "get-coupons",
  get_all_addresses: "get-addresses",
  remove__address: "delete-address",
  create_address: "create-address",
  google_login : "login-google",
  get_products_on_sale : "products/sale-category-products-filtered",
  get_products_on_sale_filters : "filters/get-filters-for-category-saleProducts",
  log_error_on_server : "insert-error-log",
  get_today_coupons : "get-current-active-coupons",
  get_shipping_details_for_address : "get-shipping-options-for-address",
  cancel_order : "cancel-order",
  get_featured_categories_of_category : "get-featured-categories-of-category"
};

import axios from "axios";

export async function getData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error in get Product", error);
  }
}

export async function postDatahandler(url, postData) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  const resData = await response.json();
  return resData;
}
