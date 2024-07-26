import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleFilterDataDeals } from "../../../redux/actions/CategoryActions";
import FilterByPricingSection from "../../Categories/CategoriesFilter/FilterSections/FilterByPricingSection";
import FilterByTags from "../../Categories/CategoriesFilter/FilterSections/FilterByTags";
import FilterByBrands from "../../Categories/CategoriesFilter/FilterSections/FilterByBrands";
import FilterByVariantsAndAttributes from "../../Categories/CategoriesFilter/FilterSections/FilterByVariantsAndAttributes";
import FilterByDiscount from "../../Categories/CategoriesFilter/FilterSections/FilterByDiscount";
import FilterByCategorySectionDeals from "./FilterByCategorySectionDeals";

const discountItems = ["0% - 25%", "26% - 50%", "51% - 75%", "76% - 100%"];

const DealsProductsFilters = ({ filters, setFilters, sidebarRef }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState(null)

  const filtersData = useSelector(
    (state) => state?.filterReducerData?.filterDataDeals
  );

  useEffect(() => {
    dispatch(handleFilterDataDeals(filters.category?.category_slug, setIsLoading));
  }, [filters.category?.category_id]);

  let variantsAndAttributes = filtersData?.find(
    (item) => item.RESULT_COLUMN === "ATTRIBUTE_AND_VARIANTS"
  );
  let Variants = {};
  let Attributes = {};
  if (variantsAndAttributes?.records.length > 0) {
    let variantsArray = variantsAndAttributes?.records?.find((item) =>
      item.hasOwnProperty("variant_types")
    )?.variant_types;
    variantsArray?.forEach((item) => (Variants[item.title] = {records : item.records, displayId : item.display_style_id || 1}));
    let attributesArray = variantsAndAttributes?.records?.find((item) =>
      item.hasOwnProperty("attributes")
    )?.attributes;
    attributesArray?.forEach((item) => (Attributes[item.title] = {records : item.records, displayId : item.display_style_id || 1}));
  }
  const isCategory = filtersData?.find((item) => item.title === "CATEGORIES") || categories
  if(!categories && isCategory) {
    setCategories(isCategory)
  }

  if(isLoading) {
    return <></>
  }

  return (
    <div className="col-xl-3 col-lg-3 col-md-4 sticky-md-top ">
      {filtersData?.length > 0 && (
        <div
          className="left mobile-sidebar"
          ref={sidebarRef}
        >
          {isCategory && (
            <FilterByCategorySectionDeals
              key={"subCategoryFilter"}
              filterData={isCategory}
              selectedCategory={filters.category}
              setSelectedCategory={setFilters}
            />
          )}
          <FilterByDiscount
            key={"discountFilter"}
            selecetdDiscount={filters.discount}
            setSelecetdDiscount={setFilters}
            filterData={discountItems}
          />
          {filtersData.map((item, index) => {
            switch (item.RESULT_COLUMN) {
              case "TAGS":
                return (
                  <FilterByTags
                    selecetdTag={filters.tag}
                    setSelecetdTag={setFilters}
                    filterData={item.records}
                  />
                );
              case "MIN_MAX_PRICE":
                return (
                  <FilterByPricingSection
                    key={index}
                    selectedPrice={filters.price}
                    filterData={item}
                    setSelectedPrice={setFilters}
                  />
                );
              case "BRANDS_COUNT":
                return (
                  <FilterByBrands
                    key={index}
                    selecetdBrand={filters.brand}
                    filterData={item}
                    setSelecetdBrand={setFilters}
                  />
                );
              case "ATTRIBUTE_AND_VARIANTS":
                return (
                  <FilterByVariantsAndAttributes
                    key={index}
                    filterData={filters}
                    variants={Variants}
                    attributes={Attributes}
                    setFilterData={setFilters}
                  />
                );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default DealsProductsFilters;
