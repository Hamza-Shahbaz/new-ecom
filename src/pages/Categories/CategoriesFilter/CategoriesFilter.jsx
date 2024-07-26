import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleFilterData } from "../../../redux/actions/CategoryActions";
import FilterByCategorySection from "./FilterSections/FilterByCategorySection";
import FilterByPricingSection from "./FilterSections/FilterByPricingSection";
import FilterByTags from "./FilterSections/FilterByTags";
import FilterByBrands from "./FilterSections/FilterByBrands";
import FilterByVariantsAndAttributes from "./FilterSections/FilterByVariantsAndAttributes";
import { BaseUrl, EndPoints } from "../../../utils/Api";
import FilterByDiscount from "./FilterSections/FilterByDiscount";

const discountItems = ["0% - 25%", "26% - 50%", "51% - 75%", "76% - 100%"];

const CategoriesFilter = ({ filters, setFilters, sidebarRef }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const categoryId = params?.id;
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState([]);

  const filtersData = useSelector(
    (state) => state?.filterReducerData?.filterData
  );

  useEffect(() => {
    dispatch(handleFilterData(categoryId, setIsLoading));
  }, [categoryId]);

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
  const isCategory = filtersData?.find((item) => item.title === "CATEGORIES");

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
           {/* style={{
            maxHeight: "calc(100vh - 250px)",
            overflowY: "auto",
            scrollbarWidth: "auto",
            msOverflowStyle: "none",
          }} */}
          {isCategory && (
            <FilterByCategorySection
              key={"subCategoryFilter"}
              filterData={isCategory}
            />
          )}
          <FilterByDiscount
            key={"discountFilter"}
            selecetdDiscount={filters.discount}
            setSelecetdDiscount={setFilters}
            filterData={discountItems}
          />
          {tags.length > 0 && (
            <FilterByTags
              key={"tagsFilter"}
              selecetdTag={filters.tag}
              setSelecetdTag={setFilters}
              filterData={tags}
            />
          )}
          {filtersData.map((item, index) => {
            switch (item.RESULT_COLUMN) {
              case "TAGS":
                return (
                  <FilterByTags
                    selecetdTag={filters.tag}
                    setSelecetdTag={setFilters}
                    filterData={item.records}
                    key={index}
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

export default CategoriesFilter;
