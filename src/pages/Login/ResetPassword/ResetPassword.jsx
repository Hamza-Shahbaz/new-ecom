import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleResetPasswordUser, updateTimer } from "../../../redux/actions/AuthAction";
import CustomLoader from "../../../components/Toast/CustomLoader";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordToken, setPasswordToken] = useState(null);
  const forgotPassData = useSelector(
    (state) => state.AuthReducerData.forgotPassword
  );
  const [remainingTime, setRemainingTime] = useState(
    forgotPassData?.reset_duration_sec || ""
  );



  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRemainingTime((prevTime) => {
  //       if (prevTime <= 1) {
  //         clearInterval(interval);
  //         return 0;
  //         dispatch(updateTimer(remainingTime));
  //       }

  //       return prevTime - 1;
  //     });
  //   }, 1000);

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          dispatch(updateTimer(0));
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const passwordMatch = watch("password");

  useEffect(() => {
    const path = window.location.href;
    // Split the path based on '/'
    const pathSegments = path.split("/");
    // Extract the last segment of the path, which contains the identifier
    const extractedIdentifier = pathSegments[pathSegments.length - 1];
    setPasswordToken(extractedIdentifier);
  });

  const onSubmit = (data) => {
    dispatch(
      handleResetPasswordUser(data, setLoading, navigate, passwordToken , dispatch)
    );
  };
  return (
    <section className="reset-password">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-6 col-md-8">
            <div className="reset-sec">
              <div className="text-center mb-3">
                <span>Reset Password</span>
              </div>
              <form
                action="submit"
                className="needs-validation"
                noValidate=""
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-4 position-relative">
                      <label>
                        Password:{" "}
                        <span
                          className="passtextColor"
                          style={{ fontSize: "20px" }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        placeholder="Please Enter Password"
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                          maxLength: {
                            value: 50,
                            message: "Password Must be up to 50 characters",
                          },
                          minLength: {
                            value: 8,
                            message: "Password Must be 8 characters",
                          },
                        })}
                        className="form-control"
                        maxLength={51}
                      />
                      <button
                        type="button"
                        className="btn eyeStyle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={
                            showPassword ? "fa fa-eye-slash" : "fa fa-eye"
                          }
                        />
                      </button>

                      {errors?.password && (
                        <p
                          role="alert"
                          className="mt-1 mx-1"
                          style={{ color: "red", fontWeight: "400" }}
                        >
                          {errors?.password?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-4 position-relative">
                      <label>
                        Confirm Password:{" "}
                        <span
                          className="passtextColor"
                          style={{ fontSize: "20px" }}
                        >
                          *
                        </span>
                      </label>

                      <input
                        placeholder="Please Enter Confirm Password"
                        type={confirmPassword ? "text" : "password"}
                        {...register("confirmpassword", {
                          required: "Confirm Password is required",
                          maxLength: {
                            value: 50,
                            message:
                              "Confirm Password Must be up to 50 characters",
                          },
                          minLength: {
                            value: 8,
                            message: "Confirm Password Must be 8 characters",
                          },
                          validate: (value) =>
                            value === passwordMatch || "Passwords do not match",
                        })}
                        className="form-control"
                        maxLength={51}
                      />
                      <button
                        type="button"
                        className="btn eyeStyle"
                        onClick={() => setConfirmPassword(!confirmPassword)}
                      >
                        <i
                          className={
                            confirmPassword ? "fa fa-eye-slash" : "fa fa-eye"
                          }
                        />
                      </button>

                      {errors?.confirmpassword && (
                        <p
                          role="alert"
                          className="mt-1 mx-1"
                          style={{ color: "red", fontWeight: "400" }}
                        >
                          {errors?.confirmpassword?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="d-flex justify-content-center">
                      {remainingTime > 0 && (
                        <p>
                          {(forgotPassData &&
                            forgotPassData.reset_duration_sec &&
                            `Time remaining: ${remainingTime} seconds`) ||
                            null}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-0">
                      <button
                        type="submit"
                        className="btn btn-theme-yellow w-100"
                      >
                        {loading ? (
                          <CustomLoader
                            size={10}
                            color={"#219ebc"}
                            style={{ marginBottom: "0px", fontSize: "16px" }}
                          />
                        ) : (
                          <>
                            RESET PASSWORD{" "}
                            <i className="fa fa-angle-right ms-2" />
                          </>
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
    </section>
  );
}

export default ResetPassword;
