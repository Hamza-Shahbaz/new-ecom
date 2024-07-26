import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { handleForgotPassword } from "../../../redux/actions/AuthAction";
import { useDispatch } from "react-redux";
import CustomLoader from "../../../components/Toast/CustomLoader";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(handleForgotPassword(data, setLoading, navigate , dispatch));
  };
  return (
    <section className="forget-password">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-6 col-md-8">
            <div className="forget-sec">
              <div className="text-center">
                <span>Forgot Password</span>
                <p>Enter the email address associated with your account.</p>
              </div>
              <form
                action="submit"
                className="needs-validation"
                noValidate=""
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-4 ">
                      <label className="d-flex">
                        Email Address:{" "}
                        <label style={{ color: "red" }} className="px-1">
                          *
                        </label>
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
                    <div className="mb-3">
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
                            SEND CODE <i className="fa fa-angle-right ms-2" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="already">
                        Already have account?{" "}
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          Sign In
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <hr />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <p className="mb-0">
                      You may contact <a href="#">Customer Service</a> for help
                      restoring access to your account.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
