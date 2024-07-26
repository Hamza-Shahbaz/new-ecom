import React from "react";
import { useSelector } from "react-redux";
import { symbolAmount, valueRateConversion } from "../../../../utils/Helper";

const FilterByPricingSection = ({
  selectedPrice,
  filterData,
  setSelectedPrice,
}) => {
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  const makePricingBrackets = (min, max) => {
    if (min === max) {
      return [
        `0 - ${symbolAmount(
          Math.ceil(valueRateConversion(max, currencyRate)),
          currencyCode
        )}`,
      ];
    }
    min = valueRateConversion(min, currencyRate);
    max = valueRateConversion(max, currencyRate);
    const lowerMultipleOfMin = Math.floor(min);
    const upperMultipleOfMax = Math.ceil(max) ;
    const interval = (upperMultipleOfMax - lowerMultipleOfMin) / 4;

    const options = [];
    for (let i = 0; i < 4; i++) {
      options.push(
        symbolAmount(
          `${Math.ceil(lowerMultipleOfMin + interval * i)} - ${
            Math.floor(lowerMultipleOfMin + interval * (i + 1))
          }`,
          currencyCode
        )
      );
    }
    return options;
  };

  const pricingOptions = makePricingBrackets(
    filterData.records?.[0].min_price,
    filterData.records?.[0].max_price
  );

  const handleCheck = (price) => {
    setSelectedPrice({type : "price", payload : price})
  };

  return (
    <>
      {pricingOptions?.length > 2 && (
        <div className="price-range" key={"price"}>
          <span>Price Range</span>
          {pricingOptions.map((price, index) => {
            return (
              <div className="form-check" key={"pricing" + index}>
                <input
                  key={index + "input"}
                  className="form-check-input"
                  checked={selectedPrice.includes(price)}
                  onChange={(e) => {
                    handleCheck(price);
                  }}
                  type="checkbox"
                  id={`price${parseInt(price)}`}
                />
                <label key={index + "label"} className="form-check-label">
                  {price}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FilterByPricingSection;
