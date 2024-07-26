import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function PhonenoInput({
  inputClassName,
  placeholderName,
  value,
  onChange,
  showError,
  errorMessage,
  disabled
}) {
  return (
    <div>
      <PhoneInput
        disabled={disabled}
        placeholder={placeholderName}
        value={value}
        countryCodeEditable={true}
        onChange={onChange}
        searchStyle={{ width: "88%" }}
        className={inputClassName}
        enableSearch={true}
        inputStyle={{
          padding: "22px",
          paddingTop: "23px",
          paddingBottom: "23px",
          borderRadius: "8px",
          width: "100%",
          paddingLeft: "48px",
          fontSize: "14px",
          fontFamily: "Poppins-Medium",
        }}
        buttonStyle={{ padding: "2px", borderRadius: "5px" }}
        dropdownStyle={{ width: "335px" }}
        dropdownClass="loginn"
      />
      {showError && errorMessage && (
        <p style={{ color: "red", fontSize: "0.8em", marginTop: "0.5em" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default PhonenoInput;
