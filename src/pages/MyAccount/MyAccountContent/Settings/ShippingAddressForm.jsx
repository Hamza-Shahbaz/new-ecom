import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../../../components/Toast/CustomLoader";
import countries from "../../../../utils/countries";
import states from "../../../../utils/states";
import cities from "../../../../utils/cities";
import { handleNewAddress } from "../../../../redux/actions/OrderAction";
import { Autocomplete, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import loader from "../../../../assets/images/loader.gif";
import { TbArrowBackUp } from "react-icons/tb";
import { handleSetAddAddress } from "../../../../redux/actions/AuthAction";

function CustomPaper(props) {
  return <Paper {...props} style={{ maxHeight: 400, overflow: "auto" }} />;
}

const hoverAndActiveStyles = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px", // Set the border width to 1px
      backgroundColor: "transparent !important",
      borderColor: "#219ebc !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#dbdbdb", // Maintain the same border color on hover
    },
    "& .MuiOutlinedInput-notchedOutline": {
      "&:hover": {
        borderColor: "#dbdbdb",
      },
    },
  },
};

const countriesList = countries;
const allStates = states;
const allcities = cities.Cities;

function ShippingAddressForm() {
  const addressesData = useSelector(
    (state) => state.addressesReducerData?.addressesData
  );

  const selectedAddressId = useSelector(
    (state) => state.addressesReducerData.selectedAddressId
  );

  const matchData = addressesData?.addresses?.filter((address) => {
    return address?.address_id === selectedAddressId;
  });

  const exactPath = useSelector((state) => state.addressesReducerData?.path);

  const finalAddress = matchData?.[0];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginData = useSelector((state) => state.AuthReducerData?.loginUser);

  const [isLoading, setIsLoading] = useState(false);

  // const [phoneNumber, setPhoneNumber] = useState(
  //   (selectedAddressId && finalAddress?.phone_number) || ""
  // );
  // const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center">
            <img
              src={loader}
              alt="Loading Related Products"
              style={{ width: "100px" }}
            />
          </div>
        </div>
      </div>
    );
  }

  const intitalStates = allStates[finalAddress?.country_code];
  const initialState = finalAddress?.state
    ? Object.keys(intitalStates || {}).filter(
        (item) => intitalStates[item] === finalAddress.state_code
      )[0]
    : "";

  const initialValue = {
    name: (selectedAddressId && finalAddress?.name) || "",
    address: selectedAddressId && finalAddress?.street_address,
    country: (selectedAddressId && finalAddress?.country) || undefined,
    state: (selectedAddressId && initialState) || undefined,
    city: (selectedAddressId && finalAddress?.city) || "",
    zipcode: (selectedAddressId && finalAddress?.zip_code) || "",
    phoneNumber: (selectedAddressId && finalAddress?.phone_number) || "",
    email: loginData?.email || "",
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const phoneNumber = watch("phoneNumber");
  //variable states for options

  const [states, setStates] = useState(
    finalAddress?.country_code && allStates[finalAddress?.country_code]
      ? Object.keys(allStates[finalAddress?.country_code])
      : []
  );

  const [cities, setCities] = useState(
    allcities[finalAddress?.state + "-" + finalAddress?.state_code] || []
  );

  //dependency form inputs
  const currentCountry = watch("country");
  const currentState = watch("state");
  const currentCity = watch("city");

  // //refs for saving code
  const countryCodeRef = useRef(countriesList[finalAddress?.country] || "");

  // const stateCodeRef = useRef(
  //   allStates[countriesList[finalAddress?.country]]?.[finalAddress?.state] || ""
  // );

  const stateCodeRef = useRef(finalAddress?.state_code || "");

  ///country option click...///
  const handleCountryOptionClick = (country, onChange) => {
    onChange(country);
    countryCodeRef.current = countriesList[country] || "";
    setStates(Object.keys(allStates[countriesList[country]] || {}) || []);
    setCities([]);
    setValue("state", undefined);
    setValue("city", undefined);
  };

  ///state option click...///
  const handleStateOptionClick = (state, onChange) => {
    stateCodeRef.current = allStates[countryCodeRef.current]?.[state];
    onChange(state);
    setCities(
      allcities[state + "-" + allStates[countryCodeRef.current]?.[state]] || []
    );
    setValue("city", undefined);
  };

  const onSubmit = (data) => {
    if (!phoneNumber) {
      setPhoneError(true);
      return;
    }

    dispatch(
      handleNewAddress(
        data,
        countryCodeRef?.current,
        stateCodeRef?.current,
        phoneNumber,
        loginData?.token,
        finalAddress?.address_id,
        setIsLoading,
        dispatch,
        navigate,
        setLoading,
        exactPath,
        currentCountry,
        currentState,
        loginData?.first_name,
        loginData?.last_name
      )
    );
  };

  return (
    <div className="settings-inner">
      <div className="top-heading justify-content-start">
        <div
          className="back-arrow"
          style={{ cursor: "pointer", paddingRight: "8px" }}
        >
          <TbArrowBackUp
            color="#219ebc"
            size={25}
            onClick={() => {
              // setAddAddress(false);
              dispatch(handleSetAddAddress(false));
            }}
          />
        </div>
        <span>{selectedAddressId ? "Edit Address" : "Add a new Address"}</span>
      </div>
      <div
        className="info-inner mt-4"
        style={{ borderTop: "1px solid #e4e7e9" }}
      >
        <div className="row">
          <div className="profile-form">
            <form
              action="submit"
              onSubmit={handleSubmit(onSubmit)}
              className="needs-validation"
            >
              <div className="row">
                <div className="col-xl-6 col-md-12">
                  <div className="mb-4">
                    <label>
                      Name: <span className="passtextColor">*</span>
                    </label>
                    <input
                      placeholder="Enter Name"
                      {...register("name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[a-zA-Z ']*$/,
                          message: "Name must consist of only Alphabets",
                        },
                        validate: {
                          notOnlySpaces: (value) => {
                            return value.trim() !== "" || "Invalid Input";
                          },
                        },
                        maxLength: {
                          value: 50,
                          message: "Name Must be upto 50 characters",
                        },
                      })}
                      className="form-control"
                      maxLength={51}
                    />
                    {errors?.name && (
                      <p
                        className="mt-1 mx-1"
                        style={{ color: "red", fontWeight: "400" }}
                      >
                        {errors?.name?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-xl-6 col-md-12">
                  <div className="mb-4">
                    <label>
                      Phone Number: <span className="passtextColor">*</span>
                    </label>
                    {/* <PhoneInput
                      placeholder={"Enter Phone No."}
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e);
                        if (phoneError) {
                          setPhoneError(false);
                        }
                      }}
                      countryCodeEditable={true}
                      searchStyle={{ width: "88%" }}
                      enableSearch={true}
                      inputStyle={{
                        height: "50px",
                        borderRadius: "0px",
                        width: "100%",
                        fontSize: "1rem",
                        fontWeight: 500,
                        border: "1px solid #e4e7e9",
                        color: "#e4e7e9",
                      }}
                      buttonStyle={{ padding: "2px" }}
                      dropdownStyle={{ width: "452px" }}
                      dropdownClass="loginn"
                      // country={"us"}
                    />
                    {phoneError && (
                      <p role="alert" style={{ color: "red" }}>
                        Phone number is required
                      </p>
                    )} */}
                    <Controller
                      control={control}
                      name="phoneNumber"
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value:
                            /^[+]{0,1}(?:[0-9-\\(\\)\\/.\s]){6,15}[0-9]{1}$/,
                          message: "Invalid Phone number",
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          placeholder="Enter Phone No"
                          value={value}
                          onChange={onChange}
                          countryCodeEditable={true}
                          enableSearch={true}
                          inputStyle={{
                            height: "50px",
                            borderRadius: "0px",
                            width: "100%",
                            fontSize: "1rem",
                            fontWeight: 500,
                            border: "1px solid #e4e7e9",
                            color: "#000",
                          }}
                          buttonStyle={{ padding: "2px" }}
                          dropdownStyle={{ width: "453px" }}
                          dropdownClass="loginn"
                        />
                      )}
                      defaultValue=""
                    />
                    {errors.phoneNumber && (
                      <p
                        role="alert"
                        className="mt-1 mx-1"
                        style={{ color: "red", fontWeight: "400" }}
                      >
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-xl-12 col-md-12">
                  <div className="mb-4">
                    <label>
                      Email: <span className="passtextColor">*</span>
                    </label>
                    <input
                      disabled={true}
                      placeholder="Please Enter Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email",
                        },
                      })}
                      className="form-control"
                    />
                    {errors?.email && (
                      <p role="alert" style={{ color: "red" }}>
                        {errors?.email?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-xl-12 col-md-12">
                  <div className="mb-4">
                    <label>
                      Address: <span className="passtextColor">*</span>
                    </label>
                    <input
                      placeholder="Enter Address"
                      {...register("address", {
                        required: "Address is required",
                        maxLength: {
                          value: 100,
                          message: "Address Must be upto 100 characters",
                        },
                        validate: {
                          notOnlySpaces: (value) => {
                            return value.trim() !== "" || "Invalid Input";
                          },
                        },
                      })}
                      className="form-control"
                      maxLength={101}
                    />
                    {errors?.address && (
                      <p role="alert" style={{ color: "red" }}>
                        {errors?.address?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-xl-12 col-md-12">
                  <div className="mb-4 d-flex flex-column">
                    <label>
                      Country: <span className="passtextColor">*</span>
                    </label>
                    <Controller
                      name="country"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <Autocomplete
                            PaperComponent={CustomPaper}
                            onChange={(e, option) => {
                              handleCountryOptionClick(option, field.onChange);
                            }}
                            value={currentCountry || "Select Country"}
                            id="country-select"
                            options={Object.keys(countriesList)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{ ...hoverAndActiveStyles }}
                              />
                            )}
                          />
                          {errors.country && (
                            <p className="error" style={{ color: "red" }}>
                              Country is required
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="col-xl-12 col-md-12">
                  <div className="mb-4 d-flex flex-column">
                    <label>
                      State: <span className="passtextColor">*</span>
                    </label>
                    <Controller
                      name="state"
                      rules={{ required: true }}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <Autocomplete
                            PaperComponent={CustomPaper}
                            onChange={(e, option) => {
                              handleStateOptionClick(option, field.onChange);
                            }}
                            value={currentState || "Select State"}
                            id="state-select"
                            options={states}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{ ...hoverAndActiveStyles }}
                              />
                            )}
                          />
                          {errors.state && (
                            <p className="error" style={{ color: "red" }}>
                              State is required
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-md-12">
                  <div className="mb-4 d-flex flex-column">
                    <label>
                      City: <span className="passtextColor">*</span>
                    </label>
                    <Controller
                      name="city"
                      rules={{ required: true }}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <Autocomplete
                            PaperComponent={CustomPaper}
                            onChange={(e, option) => field.onChange(option)}
                            value={currentCity || "Select City"}
                            id="city-select"
                            options={cities}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{ ...hoverAndActiveStyles }}
                              />
                            )}
                          />
                          {errors.state && (
                            <p className="error" style={{ color: "red" }}>
                              City is required
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-md-12">
                  <div className="mb-4">
                    <label>
                      Zip Code: <span className="passtextColor">*</span>
                    </label>
                    <input
                      placeholder="Enter Zip Code"
                      {...register("zipcode", {
                        required: "Zip code is required",
                        maxLength: {
                          value: 5,
                          message: "Zip code must be maximum 5 digits",
                        },
                        minLength: {
                          value: 3,
                          message: "Zip code must be minimum 3 digits",
                        },
                      })}
                      type="number"
                      className="form-control"
                    />
                    {errors?.zipcode && (
                      <p role="alert" style={{ color: "red" }}>
                        {errors?.zipcode?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-0">
                    <button
                      type="submit"
                      className="btn btn-theme-yellow"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CustomLoader
                          size={10}
                          color={"#219ebc"}
                          style={{ padding: "10px 38px" }}
                        />
                      ) : (
                        <>SAVE CHANGES</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddressForm;
