import React, { useEffect, useReducer, useRef, useState } from "react";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import CategoriesProducts from "../CategoriesProducts/CategoriesProducts";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const createDefaultState = (tag) => {
  if (tag?.tag_id) {
    return {
      price: [],
      brand: [],
      tag: [tag],
      discount:[],
      filterBy: {
        variants: {},
        attributes: {},
      },
    };
  }
  else {
    return {
      price: [],
      brand: [],
      tag: [],
      discount:[],
      filterBy: {
        variants: {},
        attributes: {},
      },
    };
  }
};

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

const CategoriesMainSection = () => {
  const locator = useLocation();
  const tag = locator?.state?.tag;
  const params = useParams();
  const [filters, setFilters] = useReducer(reducerFunc, createDefaultState(tag));
  const sidebarRef = useRef(null)

  useEffect(() => {
    const resetFilters = () => {
      setFilters({ type: "reset", payload : tag });
    };
    resetFilters();
  
  }, [params?.id])

  window.scrollTo({
    top: 0,
    behavior: "instant",
  });

  return (
    <section className="product-sec">
      <div className="container">
        <div className="row align-items-md-start">
          <CategoriesFilter filters={filters} setFilters={setFilters} sidebarRef={sidebarRef}/>
          <CategoriesProducts filters={filters} setFilters={setFilters} sidebarRef={sidebarRef}/>
        </div>
      </div>
    </section>
  );
};

export default CategoriesMainSection;
