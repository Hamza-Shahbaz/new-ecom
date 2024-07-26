import React, { useRef } from "react";
import FilterByBrands from "../../Categories/CategoriesFilter/FilterSections/FilterByBrands";
import FilterByPricingSection from "../../Categories/CategoriesFilter/FilterSections/FilterByPricingSection";
import FilterByDiscount from "../../Categories/CategoriesFilter/FilterSections/FilterByDiscount";
const discountItems = ["0% - 25%", "26% - 50%", "51% - 75%", "76% - 100%"];

const BestSellingFilters = ({ filters, setFilters, brands, price, sidebarRef }) => {
  if(brands?.records?.length < 1 || !brands.records) {
    return <></>
  }
  return (
    <div className="col-xl-3 col-lg-3 col-md-4 sticky-md-top ">
      {brands?.records?.length > 0 && (
        <div
          className="left mobile-sidebar"
          ref={sidebarRef}
        >
          <FilterByDiscount
            key={"discountFilter"}
            selecetdDiscount={filters.discount}
            setSelecetdDiscount={setFilters}
            filterData={discountItems}
          />

          <FilterByBrands
            key={"brands"}
            selecetdBrand={filters.brand}
            filterData={brands}
            setSelecetdBrand={setFilters}
          />

          <FilterByPricingSection
            key={"pricing"}
            selectedPrice={filters.price}
            filterData={price}
            setSelectedPrice={setFilters}
          />
        </div>
      )}
    </div>
  );
};

export default BestSellingFilters;
