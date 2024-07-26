import React, { useState } from "react";
import TextShortener from "../../../components/DynamicText/TextShortner";

const FilterByBestSellingBrands = ({ selecetdBrand, setSelecetdBrand, filterData }) => {
  const [showBrandsAmount, setShowBrandsAmount] = useState(6);
  const handleCheck = (brand) => {
    setSelecetdBrand({ type: "brand", payload: brand });
  };

  const brandElement = (brand) => {
    return (
      <div className="form-check" style={{minHeight:'48px'}} key={brand.brand_name}>
        <input
          key={brand.brand_name + "input"}
          className="form-check-input"
          checked={selecetdBrand.includes(brand.brand_name)}
          onChange={(e) => {
            handleCheck(brand.brand_name);
          }}
          type="checkbox"
          id={brand.brand_name}
        />
        <label key={brand.brand_name + "label"} className="form-check-label">
          <TextShortener text={brand} textLimit={25} component={""} />
          
        </label>
      </div>
    );
  };
  const brands = filterData.records;
  const brandsLeft = brands.slice(0, Math.ceil(brands.length / 2));
  const brandsRight = brands.slice(Math.ceil(brands.length / 2));
  return (
    <>
      {brands?.length > 0 && (
        <div className="popular-brands">
          <span>Popular Brands</span>
          <div className="brands-inner">
            <div className="left">
              {brandsLeft.length > 0 &&
                brandsLeft.slice(0, showBrandsAmount / 2).map((brand) => {
                  return brandElement(brand);
                })}
            </div>
            <div className="right">
              {brandsRight.length > 0 &&
                brandsRight.slice(0, showBrandsAmount / 2).map((brand) => {
                  return brandElement(brand);
                })}
            </div>
          </div>
          {showBrandsAmount < brands.length && (
            <div
              style={{ cursor: "pointer", fontWeight: "800" }}
              onClick={(e) => setShowBrandsAmount(showBrandsAmount + 6)}
            >
              Show more
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FilterByBestSellingBrands;
