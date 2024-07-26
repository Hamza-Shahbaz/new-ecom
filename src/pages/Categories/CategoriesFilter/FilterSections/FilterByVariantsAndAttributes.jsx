import React from "react";
import { GetColorName } from "hex-color-to-color-name";

const FilterByVariantsAndAttributes = ({
  variants,
  attributes,
  filterData,
  setFilterData,
}) => {
  const variantKeys = Object.keys(variants || {});
  const attributeKeys = Object.keys(attributes || {});
  if (variantKeys.length < 1 && attributeKeys.length < 1) {
    return <></>;
  }
  const checkIfVariantIsSelected = (variant) => {
    let variantIds = Object.keys(filterData.filterBy?.variants || {});
    return variantIds.includes(String(variant.variant_id));
  };

  const checkIfAttributeIsSelected = (attribute) => {
    let variantIds = Object.keys(filterData.filterBy?.attributes || {});
    return variantIds.includes(String(attribute.sub_attribute_id));
  };

  const handleVariantCheck = (variant) => {
    setFilterData({
      type: "variant",
      payload: variant,
      selected: checkIfVariantIsSelected(variant),
    });
  };

  const handleAttributeCheck = (attribute) => {
    setFilterData({
      type: "attribute",
      payload: attribute,
      selected: checkIfAttributeIsSelected(attribute),
    });
  };

  const variantElement = (variant, displayId) => {
    if (displayId === 2) {
      return (
        <div className="form-check" key={variant.title} onClick={(e) => {
          handleVariantCheck(variant);
        }}>
          <div
            className="userInitials"
            style={{
              background: `${variant.title}`,
              cursor: "pointer",              
            }}
          ></div>
          <label
            key={variant.variant_id + "variant"}
            className="form-check-label"
          >
            {GetColorName(variant.title)}
          </label>
        </div>
      );
    }
    return (
      <div className="form-check" key={variant.title}>
        <input
          key={variant.variant_id + "variant"}
          className="form-check-input"
          checked={checkIfVariantIsSelected(variant)}
          onChange={(e) => {
            handleVariantCheck(variant);
          }}
          type="checkbox"
        />
        <label key={variant.title + "variant"} className="form-check-label">
          {variant.title}
        </label>
      </div>
    );
  };

  const attributeElement = (attribute, displayId) => {
    if (displayId === 2) {
      return (
        <div className="form-check" key={attribute.title} onClick={(e) => {
              handleAttributeCheck(attribute);
            }}>
          <div
            className="userInitials form-check-input"
            style={{
              background: `${attribute.title}`,
              cursor: "pointer",
            }}
          ></div>
          <label
            key={attribute.title + "attribute"}
            className="form-check-label"
          >
            {GetColorName(attribute.title)}
          </label>
        </div>
      );
    }
    return (
      <div className="form-check" key={attribute.title}>
        <input
          key={attribute.sub_attribute_id + "attribute"}
          className="form-check-input"
          checked={checkIfAttributeIsSelected(attribute)}
          onChange={(e) => {
            handleAttributeCheck(attribute);
          }}
          type="checkbox"
        />
        <label key={attribute.title + "attribute"} className="form-check-label">
          {attribute.title}
        </label>
      </div>
    );
  };
  return (
    <>
      {variantKeys.length > 0 &&
        variantKeys.map((title) => {
          const variantsLeft = variants[title].records.slice(
            0,
            Math.ceil(variants[title].records.length / 2)
          );
          const variantsRight = variants[title].records.slice(
            Math.ceil(variants[title].records.length / 2)
          );
          let displayId = variants[title].displayId
          return (
            <div key={title} className="popular-brands">
              <span>{title}</span>
              <div className="brands-inner">
                <div className="left">
                  {variantsLeft.length > 0 &&
                    variantsLeft.map((variant) => {
                      return variantElement(variant, displayId);
                    })}
                </div>
                <div className="right">
                  {variantsRight.length > 0 &&
                    variantsRight.map((variant) => {
                      return variantElement(variant, displayId);
                    })}
                </div>
              </div>
            </div>
          );
        })}
      {attributeKeys.length > 0 &&
        attributeKeys.map((title) => {
          const attributesLeft = attributes[title].records.slice(
            0,
            Math.ceil(attributes[title].records.length / 2)
          );
          const attributesRight = attributes[title].records.slice(
            Math.ceil(attributes[title].records.length / 2)
          );
          const displayId = attributes[title].display_style_id;
          return (
            <div key={title} className="popular-brands">
              <span>{title}</span>
              <div className="brands-inner">
                <div className="left">
                  {attributesLeft.length > 0 &&
                    attributesLeft.map((attribute) => {
                      return attributeElement(attribute, displayId);
                    })}
                </div>
                <div className="right">
                  {attributesRight.length > 0 &&
                    attributesRight.map((attribute) => {
                      return attributeElement(attribute, displayId);
                    })}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default FilterByVariantsAndAttributes;
