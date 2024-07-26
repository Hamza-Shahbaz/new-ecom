import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function PhonenoInputReactForm({
  inputClassName,
  placeholderName,
  register,
  registerName,
  registerValidations,
}) {
  return (
      <PhoneInput
        {...register(registerName, registerValidations)}
        placeholder={placeholderName}
        countryCodeEditable={true}
        searchStyle={{ width: "88%" }}
        className={inputClassName}
        enableSearch={true}
        inputStyle={{
        //   padding: "22px",
        //   paddingTop: "23px",
        //   paddingBottom: "23px",
        //   borderRadius: "8px",
        //   width: "100%",
        //   paddingLeft: "48px",
        //   fontSize: "14px",
        //   fontFamily: "Poppins-Medium",
        }}
        dropdownClass="loginn"
      />
  );
}

export default PhonenoInputReactForm;
