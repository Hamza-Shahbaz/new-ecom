import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../../components/Toast/CustomLoader";
import { handleInfoUpdate } from "../../../redux/actions/AuthAction";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      handleInfoUpdate(data, setLoading, loginData?.token, navigate, setValue)
    );
  };

  const passwordMatch = watch("newpassword");
  const passwordMatch1 = watch("confirmpassword");

  return (
    <div className="settings">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="settings-inner">
            <div className="top-heading">
              <span>CHANGE PASSWORD</span>
            </div>
            <div className="info-inner">
              <div className="row">
                <div className="profile-form">
                  <form
                    action="submit"
                    className="needs-validation"
                    noValidate=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row">
                      <div className="col-xl-12 col-md-12">
                        <div className="mb-4 position-relative">
                          <label>
                            Current Password:{" "}
                            <span className="passtextColor">*</span>
                          </label>
                          <input
                            className="form-control"
                            type={currentPassword ? "text" : "password"}
                            placeholder="********"
                            {...register("curentpassword", {
                              required: "Password is required",
                              minLength: {
                                value: 8,
                                message: "Password must be 8 characters",
                              },
                              maxLength: {
                                value: 50,
                                message: "Password must be up to 50 characters",
                              },
                            })}
                            maxLength={51}
                          />
                          <button
                            type="button"
                            className="btn toggle-password"
                            onClick={() => {
                              setCurrentPassword(!currentPassword);
                            }}
                          >
                            <i
                              className={
                                currentPassword
                                  ? "fa fa-eye-slash"
                                  : "fa fa-eye"
                              }
                            />
                          </button>

                          {errors.curentpassword && (
                            <p
                              className="mt-1 mx-1"
                              style={{ color: "red", fontWeight: "400" }}
                            >
                              {errors?.curentpassword?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-xl-12 col-md-12">
                        <div className="mb-4 position-relative">
                          <label>
                            New Password:{" "}
                            <span className="passtextColor">*</span>
                          </label>
                          <input
                            className="form-control"
                            type={newPassword ? "text" : "password"}
                            placeholder="********"
                            {...register("newpassword", {
                              required: "Password is required",
                              minLength: {
                                value: 8,
                                message: "Password must be 8 characters",
                              },
                              maxLength: {
                                value: 50,
                                message: "Password must be up to 50 characters",
                              },
                            })}
                            maxLength={51}
                          />
                          <button
                            type="button"
                            className="btn toggle-password"
                            onClick={() => {
                              setNewPassword(!newPassword);
                            }}
                          >
                            <i
                              className={
                                newPassword ? "fa fa-eye-slash" : "fa fa-eye"
                              }
                            />
                          </button>
                          {errors.newpassword && (
                            <p
                              className="mt-1 mx-1"
                              style={{ color: "red", fontWeight: "400" }}
                            >
                              {errors?.newpassword?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-xl-12 col-md-12">
                        <div className="mb-4 position-relative">
                          <label>
                            Confirm Password:{" "}
                            <span className="passtextColor">*</span>
                          </label>
                          <input
                            className="form-control"
                            type={confirmPassword ? "text" : "password"}
                            placeholder="********"
                            {...register("confirmpassword", {
                              required: "Password is required",
                              minLength: {
                                value: 8,
                                message: "Password must be 8 characters",
                              },
                              maxLength: {
                                value: 50,
                                message: "Password must be up to 50 characters",
                              },
                              validate: (value) =>
                                value === passwordMatch ||
                                "Passwords do not match",
                            })}
                            maxLength={51}
                          />
                          <button
                            type="button"
                            className="btn toggle-password"
                            onClick={() => setConfirmPassword(!confirmPassword)}
                          >
                            <i
                              className={
                                confirmPassword
                                  ? "fa fa-eye-slash"
                                  : "fa fa-eye"
                              }
                            />
                          </button>
                          {errors.confirmpassword && (
                            <p
                              className="mt-1 mx-1"
                              style={{ color: "red", fontWeight: "400" }}
                            >
                              {errors?.confirmpassword?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0">
                          <button
                            type="submit"
                            className="btn btn-theme-yellow"
                          >
                            {loading ? (
                              <CustomLoader
                                size={10}
                                color={"#219ebc"}
                                style={{ padding: "10px 57px" }}
                              />
                            ) : (
                              <>CHANGE PASSWORD</>
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
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
