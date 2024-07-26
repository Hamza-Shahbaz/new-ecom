import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomLoader from "../../../components/Toast/CustomLoader";
import { useDispatch } from "react-redux";
import { SigninHandler } from "../../../redux/actions/AuthAction";
import googleImage from "../../../assets/images/google-icon.png";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignIn = ({ path }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(SigninHandler(data, setLoading, navigate, path));
  };

  const handleLoginSuccess = (response) => {
    const myinfo = jwtDecode(response.credential);
    // Handle login success, such as sending the response to your backend
  };

  const handleLoginFailure = (response) => {
    // Handle login failure
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      dispatch(SigninHandler({email : "", password : ""}, setLoading, navigate, path, true, codeResponse.access_token));
    },
    flow: "implicit",
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="login-form">
      <form
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="needs-validation"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="mb-4">
              <label>
                Email Address: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Please Enter Email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="form-control"
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
            <div className="mb-4 position-relative">
              <div className="d-flex align-items-center justify-content-between">
                <label>
                  Password: <span style={{ color: "red" }}>*</span>
                </label>
                <Link to={"/forgot-password"} className="forget">
                  Forgot Password ?
                </Link>
              </div>
              <input
                placeholder="Please Enter Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  maxLength: 50,
                  minLength: 8,
                })}
                className="form-control"
                maxLength={51}
              />
              <button
                type="button"
                className="btn toggle-password"
                onClick={(e) => setShowPassword(!showPassword)}
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
            <div className="mb-4">
              <button className="btn btn-theme-yellow w-100" type="submit" disabled={loading}>
                {loading ? (
                  <CustomLoader
                    size={10}
                    // className={"loaderStyle pb-3"}
                    color={"#219ebc"}
                  />
                ) : (
                  <>
                    SIGN IN <i className="fa fa-angle-right ms-2" />
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="col-md-12">
            <div className="or">
              <div className="line"></div>
              <span>Or</span>
              <div className="line"></div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="google-login" onClick={handleGoogleLogin}>
              {/* <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
              /> */}
              <Link>
                <img src={googleImage} alt="" />
                Login with Google
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
