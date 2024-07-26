import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomLoader from "../../../components/Toast/CustomLoader";
import { handleRegisterUser } from "../../../redux/actions/AuthAction";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";

const SignUp = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [phoneError, setPhoneError] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      handleRegisterUser(data, setLoading, setActiveTab, phoneNumber, dispatch)
    );
  };

  const password = watch("password");
  const phoneNumber = watch("phoneNumber");

  return (
    <div
      className="register-form"
      id="registerForm"
      style={{ display: "block" }}
    >
      <form
        action="submit"
        className="needs-validation"
        noValidate=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="mb-4">
              <label>
                First Name: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Please Enter First Name"
                {...register("firstname", {
                  required: true,
                  pattern: /^[a-zA-Z ']*$/,
                  validate: {
                    notOnlySpaces: (value) => {
                      return value.trim() !== "" || "Invalid Input";
                    },
                  },
                  maxLength: 50,
                })}
                className="form-control"
                maxLength={51}
              />
              {errors.firstname?.type === "required" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  First Name is required
                </p>
              ) : errors.firstname?.type === "pattern" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  First Name must consist of only Alphabets.
                </p>
              ) : 
                errors.firstname?.type === "maxLength" ? (
                  <p
                    role="alert"
                    className="mt-1 mx-1"
                    style={{ color: "red", fontWeight: "400" }}
                  >
                    First Name Must be upto 50 characters
                  </p>
                ) :
                errors?.firstname && (
                  <p
                    role="alert"
                    className="mt-1 mx-1"
                    style={{ color: "red", fontWeight: "400" }}
                  >
                    {errors?.firstname?.message}
                  </p>
                )
              }
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-4">
              <label>Last Name:</label>
              <input
                placeholder="Please Enter Last Name"
                {...register("lastname", {
                  pattern: /^[a-zA-Z ']*$/,
                  maxLength: 50,
                  validate: {
                    notOnlySpaces: (value) => {
                      if(value?.length === 0) {
                        return true
                      }
                      return value.trim() !== "" || "Invalid Input";
                    },
                  },
                })}
                className="form-control"
                maxLength={51}
              />
              {errors.lastname?.type === "pattern" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  Last Name must consist of only Alphabets.
                </p>
              ) : 
                errors.lastname?.type === "maxLength" ? (
                  <p
                    role="alert"
                    className="mt-1 mx-1"
                    style={{ color: "red", fontWeight: "400" }}
                  >
                    Last Name Must be upto 50 characters
                  </p>
                ) : 
                errors?.lastname && (
                  <p
                    role="alert"
                    className="mt-1 mx-1"
                    style={{ color: "red", fontWeight: "400" }}
                  >
                    {errors?.lastname?.message}
                  </p>
                )
              }
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-4">
              <label>
                Email Address: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                placeholder="Please Enter Email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
              {errors.email?.type === "required" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  Email is required
                </p>
              ) : (
                errors.email?.type === "pattern" && (
                  <p
                    role="alert"
                    className="mt-1 mx-1"
                    style={{ color: "red", fontWeight: "400" }}
                  >
                    Invalid email
                  </p>
                )
              )}
            </div>
          </div>

          <div className="col-md-12">
            {/* <div className="mb-4">
              <label>Phone Number: <span style={{color: 'red'}}>*</span></label>
              <input
                className="form-control"
                placeholder="Please Enter Phone Number"
                {...register("phoneNo", {
                  required: true,
                  pattern: /^[+]{0}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/,
                })}
              />
              {errors.phoneNo?.type === "required" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  Phone Number is required
                </p>
              ) : (
                errors.phoneNo?.type === "pattern" && (
                  <p
                    role="alert"
                    className="mt-1 mx-1"
                    style={{ color: "red", fontWeight: "400" }}
                  >
                    Invalid Phone Number
                  </p>
                )
              )}
            </div> */}
            <div className="mb-4">
              <label>Contact No.*</label>
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]{0,1}(?:[0-9-\\(\\)\\/.\s]){6,15}[0-9]{1}$/,
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
                    dropdownStyle={{ width: "572px" }}
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

          <div className="col-md-12">
            <div className="mb-4 position-relative">
              <label>
                Password: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Please Enter Password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 50,
                })}
                maxLength={51}
              />
              <button
                type="button"
                className="btn toggle-password"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
              </button>
              {errors.password?.type === "required" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  Password is required
                </p>
              ) : errors.password?.type === "minLength" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  Password Must be 8 characters
                </p>
              ) : (
                errors.password?.type === "maxLength" && (
                  <p
                    role="alert"
                    className="mt-1 mx-1"
                    style={{ color: "red", fontWeight: "400" }}
                  >
                    Password Must be upto 50 characters
                  </p>
                )
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="mb-4 position-relative">
              <label>
                Confirm Password: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type={forgotPass ? "text" : "password"}
                className="form-control"
                placeholder="Please Enter Confirm Password"
                {...register("confirmpassword", {
                  required: true,
                  minLength: 8,
                  maxLength: 50,
                  validate: (value) => value === password,
                })}
                maxLength={51}
              />

              <button
                type="button"
                className="btn toggle-password"
                onClick={() => {
                  setForgotPass(!forgotPass);
                }}
              >
                <i className={forgotPass ? "fa fa-eye-slash" : "fa fa-eye"} />
              </button>
              {errors.password?.type === "required" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  Confirm Password is required
                </p>
              ) : errors.confirmpassword?.type === "minLength" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  Password Must be 8 characters
                </p>
              ) : errors.confirmpassword?.type === "maxLength" ? (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  Password Must be upto 50 characters
                </p>
              ) : (
                errors.confirmpassword && (
                  <p
                    role="alert"
                    className="mt-1 mx-1"
                    style={{ color: "red", fontWeight: "400" }}
                  >
                    Password do not match
                  </p>
                )
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="agree"
                {...register("agree", { required: true })}
              />
              <label className="form-check-label ms-2 mb-0">
                I agree with{" "}
                <Link to={"/return-policy"} className="text-decoration-none">
                  Terms of Condition
                </Link>{" "}
                and{" "}
                <Link to={"/privacy-policy"} className="text-decoration-none">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            {errors.agree && (
              <p
                role="alert"
                className="mt-1 mx-1"
                style={{ color: "red", fontWeight: "400" }}
              >
                Please agree to the Terms of Condition and Privacy Policy
              </p>
            )}
          </div>
          <div className="col-md-12">
            <div className="mb-4">
              <button type="submit" className="btn btn-theme-yellow w-100" disabled={loading}>
                {loading ? (
                  <CustomLoader size={10} color={"#219ebc"} />
                ) : (
                  <>
                    SIGN UP <i className="fa fa-angle-right ms-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
