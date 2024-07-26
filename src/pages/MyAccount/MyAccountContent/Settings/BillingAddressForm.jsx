import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../../../components/Toast/CustomLoader";
import countries from "../../../../utils/countries";
import states from "../../../../utils/states";
import cities from "../../../../utils/cities";
import { useNavigate } from "react-router-dom";
import {
  handleAddressData,
} from "../../../../redux/actions/OrderAction";
import { Autocomplete, Paper, TextField } from "@mui/material";

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

function BillingAddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dashboardData = useSelector(
    (state) => state.dashboardReducerData?.dashboardData?.billing_address
  );
  const cartData = useSelector((state) => state.handleCartItem?.addToCart);
  const loginData = useSelector((state) => state.AuthReducerData?.loginUser);

  const [isLoading, setIsLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(
    dashboardData?.phone_number || ""
  );
  const [phoneError, setPhoneError] = useState(false);

  const initialValue = {
    name: dashboardData?.name || "",
    lastName: loginData?.last_name || "",
    address: dashboardData?.street_address,
    country: dashboardData?.country || undefined,
    state: dashboardData?.state || undefined,
    city: dashboardData?.city || "",
    zipcode: dashboardData?.zip_code || "",
    email: dashboardData?.email || "",
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  //variable states for options

  const [states, setStates] = useState(
    dashboardData?.country_code && allStates[dashboardData?.country_code]
      ? Object.keys(allStates[dashboardData?.country_code])
      : []
  );

  const [cities, setCities] = useState(
    allcities[dashboardData?.state + "-" + dashboardData?.state_code] || []
  );

  //dependency form inputs
  const currentCountry = watch("country");
  const currentState = watch("state");
  const currentCity = watch("city");

  // //refs for saving code
  const countryCodeRef = useRef(countriesList[dashboardData?.country] || "");
  const stateCodeRef = useRef(
    allStates[countriesList[dashboardData?.country]]?.[dashboardData?.state] ||
      ""
  );

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
    let tempData = {};

    tempData.billing_address = {};
    tempData.billing_address.country_code = countryCodeRef.current;
    tempData.billing_address.street_address = data.address;
    tempData.billing_address.city = data.city;
    tempData.billing_address.default_address = "1";
    tempData.billing_address.email = data.email;
    tempData.billing_address.name = data.name;
    tempData.billing_address.phone_number = phoneNumber;
    tempData.billing_address.state_code = stateCodeRef.current;
    tempData.billing_address.zip_code = data.zipcode;
    tempData.billing_address.address_id = dashboardData?.address_id || null;
    dispatch(
      handleAddressData(
        tempData?.billing_address,
        null,
        loginData?.token,
        setIsLoading,
        dispatch,
        navigate
      )
    );
  };

  return (
    <div className="settings-inner">
      <div className="top-heading">
        <span>BILLING ADDRESS</span>
      </div>
      <div className="info-inner">
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
                      First Name: <span className="passtextColor">*</span>
                    </label>
                    <input
                      placeholder="Enter First Name"
                      {...register("name", {
                        required: "First Name is required",
                        pattern: {
                          value: /^[a-zA-Z]*$/,
                          message: "First Name must consist of only Alphabets",
                        },
                        maxLength: {
                          value: 50,
                          message: "First Name Must be upto 50 characters",
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
                    <label>Last Name:</label>
                    <input
                      placeholder="Enter Last Name"
                      {...register("lastName", {
                        pattern: {
                          value: /^[a-zA-Z]*$/,
                          message: "Last Name must consist of only Alphabets",
                        },
                        maxLength: {
                          value: 50,
                          message: "Last Name Must be upto 50 characters",
                        },
                      })}
                      className="form-control"
                      maxLength={51}
                    />
                    {errors?.lastName && (
                      <p
                        className="mt-1 mx-1"
                        style={{ color: "red", fontWeight: "400" }}
                      >
                        {errors?.lastName?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-xl-6 col-md-12">
                  <div className="mb-4">
                    <label>
                      Email: <span className="passtextColor">*</span>
                    </label>
                    <input
                      placeholder="Please Enter Email*"
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
                <div className="col-xl-6 col-md-12">
                  <div className="mb-4">
                    <label>
                      Phone Number: <span className="passtextColor">*</span>
                    </label>
                    <PhoneInput
                      placeholder={"Enter Contact No.*"}
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
                      dropdownStyle={{ width: "333px" }}
                      dropdownClass="loginn"
                      // country={"us"}
                    />
                    {phoneError && (
                      <p role="alert" style={{ color: "red" }}>
                        Phone number is required
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
                      })}
                      className="form-control"
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
                    <button type="submit" className="btn btn-theme-yellow">
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

export default BillingAddressForm;
