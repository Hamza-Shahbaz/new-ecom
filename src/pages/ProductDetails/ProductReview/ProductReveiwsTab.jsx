import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewItem from "./ReviewItem";
import loader from "../../../assets/images/loader.gif";
import { useForm } from "react-hook-form";
import { handleReviewsData } from "../../../redux/actions/CategoryActions";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../../components/Toast/CustomLoader";
import { useNavigate } from "react-router-dom";

const ProductReveiwsTab = ({ productInfo, reviewPermission }) => {

  const navigate = useNavigate()
  const productID = productInfo?.product_head?.[0]?.product_id;
  const [rating, setRating] = useState("");
  const [hover, setHover] = useState(null);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );
  const token = loginData?.token;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(handleReviewsData(data, setLoading, productID, token, setValue, navigate));
  };

  const comment = watch("comment");
  const selectedFiles = watch("picture");

  return (
    <div>
      <div
        className="tab-pane fade active show"
        id="reviews"
        role="tabpanel"
        aria-labelledby="nav-contact-tab"
      >
        <div className="row">
          {reviewPermission && (
            <div
              className={reviewPermission ? "col-xl-4 col-lg-4 col-md-5" : null}
            >
              <div className="review-form">
                <h3>WRITE A REVIEW</h3>
                <form
                  action="submit"
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                   
                    <div className="col-md-12">
                      <div className="mb-4">
                        <label>Upload Picture:</label>
                        <input
                          {...register("picture", {
                            validate: {
                              fileCount: (fileList) =>
                                fileList?.length <= 5 ||
                                "You can upload up to 5 files.",

                              // acceptedFormats: (fileList) =>
                              //   Array.from(fileList).every((file) =>
                              //     [
                              //       "image/png",
                              //       "image/svg+xml",
                              //       "image/jpeg",
                              //       "image/jpg",
                              //     ].includes(file.type)
                              //   ) || "Invalid file format",
                            },
                          })}
                          type="file"
                          className="form-control"
                          name="picture"
                          accept=".svg, .png, .jpeg, .jpg"
                          multiple={true}
                        />
                        {errors.picture && (
                          <p style={{ color: "red", fontWeight: "400" }}>
                            {errors.picture.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {selectedFiles &&
                      Object.keys(selectedFiles)?.length > 0 && (
                        <>
                          <p className="PicTextStyle">Selected file(s):</p>
                          <div className="fileContainer mb-3">
                            <div className="fileList">
                              {Object.keys(selectedFiles)?.map((key, index) => (
                                <p
                                  key={index}
                                  className="PicTextStyle fileItem"
                                  style={{ color: "#959595" }}
                                >
                                  {selectedFiles[key]?.name}
                                </p>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    <div className="col-md-12">
                      <div className="mb-1 d-flex align-items-center justify-content-between">
                        <label>
                          Your Rating: <span style={{ color: "red" }}>*</span>
                        </label>

                        <div>
                          <div className="d-flex">
                            {[...Array(5)].map((star, index) => {
                              const currentRating = index + 1;
                              return (
                                <div key={index}>
                                  <label className="star-rating">
                                    <input
                                      type="radio"
                                      value={currentRating}
                                      {...register("rating", {
                                        required: true,
                                      })}
                                      onClick={() => {
                                        setRating(currentRating);
                                      }}
                                    />
                                    <FaStar
                                      size={17}
                                      className="star"
                                      color={
                                        currentRating <= (hover || rating)
                                          ? "#ff9017"
                                          : "#e4e5e9"
                                      }
                                      onMouseEnter={() =>
                                        setHover(currentRating)
                                      }
                                      onMouseLeave={() => setHover(null)}
                                    />
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {errors.rating?.type === "required" && (
                        <p
                          role="alert"
                          className="mx-1"
                          style={{ color: "red", fontWeight: "400" }}
                        >
                          Rating is required
                        </p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <div className="mb-4 mt-2">
                        <div className="reviewContainer">
                          <label>Write a Review:</label>
                          <label className="endLabel">
                            {comment?.length
                              ? comment?.length + " / 100"
                              : "0 / 100"}
                          </label>
                        </div>

                        <textarea
                          className="form-control"
                          rows={4}
                          cols={50}
                          placeholder="Write a Review"
                          defaultValue={""}
                          maxLength={100}
                          {...register("comment", {
                            maxLength: 99,
                          })}
                        />
                        {errors.comment?.type === "maxLength" && (
                          <p
                            role="alert"
                            className="mt-1 mx-1"
                            style={{ color: "red", fontWeight: "400" }}
                          >
                            Review Must be upto 100 characters
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-0 text-end">
                        <button type="submit" className="btn btn-theme-yellow">
                          {loading ? (
                            <CustomLoader
                              size={10}
                              color={"#219ebc"}
                              style={{ padding: "4px" }}
                            />
                          ) : (
                            <>Submit</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div
            className={
              reviewPermission
                ? "col-xl-8 col-lg-8 col-md-7"
                : "col-xl-12 col-lg-12 col-md-12"
            }
          >
            {productInfo ? (
              productInfo?.product_reviews.length !== 0 ? (
                productInfo?.product_reviews.map((item, index) => {
                  return (
                    <ReviewItem
                      reviewerName={item?.customer_name || null}
                      date={item?.created_at || null}
                      reviewContent={item?.comment || null}
                      key={index}
                      images={item?.images}
                      starRating={item?.star_rating || 0}
                    />
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <p className="reviewTextStyle">No Product reviews yet</p>
                </div>
              )
            ) : (
              <div className="container mt-3">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center ">
                    <img
                      src={loader}
                      alt="Loading Related Products"
                      style={{ width: "100px" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReveiwsTab;
