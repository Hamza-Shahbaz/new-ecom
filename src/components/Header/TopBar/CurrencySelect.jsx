import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_CURRENCY } from "../../../redux/constant/constants";

const CurrencySelect = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  let currencyOptions = [];
  const currentCurrency = useSelector(
    (state) => state.siteSettingReducerData.currentCurrency
  );
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  if (siteSettingsData?.currencies?.length > 0) {
    currencyOptions = siteSettingsData?.currencies;
  }

  useEffect(() => {
    if (siteSettingsData?.currencies.length !== 0) {
      if (currentCurrency) {
        return;
      }
      let currency = siteSettingsData?.currencies.filter(
        (item) => item.currency_iso_code === "USD"
      )[0];
      dispatch({ type: SET_CURRENT_CURRENCY, payload: currency });
    }
  }, [siteSettingsData]);

  const handleCurrencyChange = (currency) => {
    let newCurrency = siteSettingsData?.currencies.filter(
      (item) => item.currency_iso_code === currency
    )[0];
    dispatch({ type: SET_CURRENT_CURRENCY, payload: newCurrency });
  };
  return (
    <>
      {currencyOptions.length > 0 && (
        <form>
          <select style={{ display: "none" }}>
            {currencyOptions.map((option) => {
              <option value={option} />;
            })}
          </select>
          <div
            className={`nice-select ${open === true ? "open" : ""}`}
            onClick={(e) => setOpen((open) => !open)}
          >
            <span className="current">
              {" "}
              {currentCurrency?.currency_iso_code}
            </span>
            <ul className="list">
              {currencyOptions.map((option) => {
                return (
                  <li
                    key={option.currency_id}
                    data-value={option.currency_iso_code}
                    className={`option ${
                      option.currency_iso_code ===
                      currentCurrency?.currency_iso_code
                        ? "selected focus"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleCurrencyChange(option.currency_iso_code)
                    }
                  >
                    {option.currency_iso_code}
                  </li>
                );
              })}
            </ul>
          </div>
        </form>
      )}
    </>
  );
};

export default CurrencySelect;
