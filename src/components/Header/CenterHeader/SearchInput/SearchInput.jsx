import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";
import { BaseUrl, EndPoints } from "../../../../utils/Api";
import dummmyImage from "../../../../assets/images/no-image1.png";

const SearchInput = ({ category = undefined }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSearchResults = async (inputValue) => {
    if (inputValue.trim() !== "") {
      const response = await fetch(
        category
          ? `${BaseUrl}${EndPoints.search_product_category(
              category,
              inputValue
            )}`
          : `${BaseUrl}${EndPoints.search_product}${inputValue}`
      );
      const data = await response.json();
      if (data.status && data.data && data.data.products_data) {
        return Object.values(data.data.products_data).map(
          ({ product_id, product_name, image_path, product_slug }) => ({
            value: product_id,
            label: product_name,
            img: image_path,
            path: product_slug,
          })
        );
      } else {
        return [{ value: "nf", label: data?.message }];
      }
    } else {
      return [];
    }
  };

  const debouncedFetchSearchResults = useCallback(
    debounce((inputValue, callback) => {
      fetchSearchResults(inputValue).then(callback);
    }, 800),
    []
  );

  const handleChange = (selectedOption) => {
    if (selectedOption && selectedOption.value !== "nf") {
      navigate(`/product/${selectedOption.path}`);
    }
  };

  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      cursor: 'text',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      zIndex: 2000,
    }),
  };

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  const formatOptionLabel = ({ label, img, value }) => {
    if (value === "nf") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          Product Not Found
        </div>
      );
    }
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={img || dummmyImage}
          onError={handleImageError}
          alt={label}
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        {label}
      </div>
    );
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="input-group has-search">
        <AsyncSelect
          className="form-control top-search p-0 border-0"
          placeholder="Search for anything..."
          loadOptions={debouncedFetchSearchResults}
          onChange={handleChange}
          styles={customStyles}
          formatOptionLabel={formatOptionLabel}
          inputValue={searchQuery}
          onInputChange={setSearchQuery}
          controlShouldRenderValue={false}
          // menuIsOpen
        />
      </div>
    </form>
  );
};

export default SearchInput;
