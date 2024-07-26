import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderRequest } from "../../redux/actions/SliderActions";
import { BaseUrl, EndPoints } from "../../utils/Api";
import loader from "../../assets/images/loader.gif";
import BestSellingFilters from "./BestSellingFilters/BestSellingFilters";
import BestSellinsProducts from "./BestSellingProducts/BestSellinsProducts";

const BestSelling = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const sidebarRef = useRef(null)
  
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "tag":
        if (state.tag.some((tag) => tag.tag_title === action.payload.tag_title)) {
          let tag = state.tag.filter(
            (item) => item.tag_title != action.payload.tag_title
          );
          return { ...state, tag };
        } else {
          let tag = state.tag.concat(action.payload);
          return { ...state, tag };
        }
      case "discount":
        if (state.discount.includes(action.payload)) {
          let discount = state.discount.filter((item) => item != action.payload)
          return { ...state, discount };
        } else {
          let discount = state.discount.concat(action.payload);
          return { ...state, discount };
        }
      case "brand":
        if (state.brand.includes(action.payload)) {
          let brand = state.brand.filter((item) => item != action.payload);
          return { ...state, brand };
        } else {
          let brand = state.brand.concat(action.payload);
          return { ...state, brand };
        }
      case "price":
        if (state.price.includes(action.payload)) {
          let price = state.price.filter((item) => item != action.payload);
          return { ...state, price };
        } else {
          let price = state.price.concat(action.payload);
          return { ...state, price };
        }
      case "variant":
        if (action.selected) {
          let tempObj = { ...state.filterBy.variants };
          delete tempObj[action.payload.variant_id];
          return { ...state, filterBy: { ...state.filterBy, variants: tempObj } };
        } else {
          let variants = { ...state.filterBy.variants };
          variants[action.payload.variant_id] = action.payload.title;
          return { ...state, filterBy: { ...state.filterBy, variants } };
        }
      case "attribute":
        if (action.selected) {
          let tempObj = { ...state.filterBy.attributes };
          delete tempObj[action.payload.sub_attribute_id];
          return {
            ...state,
            filterBy: { ...state.filterBy, attributes: tempObj },
          };
        } else {
          let attributes = { ...state.filterBy.attributes };
          attributes[action.payload.sub_attribute_id] = action.payload.title;
          return { ...state, filterBy: { ...state.filterBy, attributes } };
        }
      case "reset":
        return createDefaultState(action.payload);
    }
  };
  const [filters, setFilters] = useReducer(reducerFunc, {
    price : [],
    brand : [],
    discount : []
  })


  const bestSellingProducts = useSelector(
    (state) =>
      state.SliderReducerData.sliders.BEST_SELLING_PRODUCTS.sliderData.data
  );


  const [brands, setBrands] = useState("");
  const [price, setPrice] = useState({
    min: null,
    max: null,
  });

  useEffect(() => {
    if (!bestSellingProducts || bestSellingProducts.length === 0) {
      dispatch(
        fetchSliderRequest(
          "BEST_SELLING_PRODUCTS",
          `${BaseUrl}${EndPoints.best_selling_products}`,
          setIsLoading
        )
      );
    } 
    else {
      let allValues = Object.values(bestSellingProducts.products_data || {});
      let brandsObj = {}
      allValues.forEach((item) => {
          brandsObj[item.brand_name] = brandsObj[item.brand_name] + 1 || 1
      })
      let brandName = Object.keys(brandsObj)
      let records = brandName.map((item) => ({
        brand_name : item,
        no_of_products : brandsObj[item]
      }))
      setBrands({records : records});
      let allPrices = allValues.map((item) => item.sale_price);
      setPrice({
        records : [{
          min_price :  Math.min(...allPrices),
          max_price : Math.max(...allPrices)
        }]
      });
    }
  }, [bestSellingProducts, dispatch]);

  if (isLoading) {
    return (
      <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center ">
        <img
          src={loader}
          alt="Loading Related Products"
          style={{ maxWidth: "100px" }}
        />
      </div>
    );
  }

  return(
  <section className="product-sec">
    <div className="container">
      <div className="row align-items-md-start">
        <BestSellingFilters filters={filters} setFilters={setFilters} brands={brands} price={price} sidebarRef={sidebarRef}/>
        <BestSellinsProducts filters={filters} setFilters={setFilters} subProductData={bestSellingProducts} sidebarRef={sidebarRef}/>
      </div>
    </div>
  </section>)
};

export default BestSelling;
