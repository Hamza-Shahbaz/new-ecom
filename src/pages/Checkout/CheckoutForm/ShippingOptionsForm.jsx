import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_QUANTITY_FROM_CHECKOUT,
  FETCH_SHIPPING_OPTIONS,
  UPDATE_SELECTED_SHIPPING,
  UPDATE_SHIPPING_OPTIONS_SAGA,
} from "../../../redux/constant/constants";
import {
  amoutRateConversion,
  valueRateConversion,
} from "../../../utils/Helper";
import dummmyImage from "../../../assets/images/no-image1.png";
import removeImage from "../../../assets/images/cross.png";
import minusImage from "../../../assets/images/minus.png";
import plusImage from "../../../assets/images/plus.png";
import { useNavigate, Link } from "react-router-dom";
import { MyToast } from "../../../components/Toast/MyToast";
import TextShortener from "../../../components/DynamicText/TextShortner";

const ShippingOptionsForm = ({ shippingAddressId, setIsApiLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);

  const templates = useSelector(
    (state) => state?.handleCartItem?.shippingTemplates
  );

  const allAddresses = useSelector(
    (state) => state.addressesReducerData?.addressesData?.addresses
  );

  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  const updateSelectedOption = (item, templateId, templateIndex) => {
    let allItems = {};
    for (let i = 0; i < templates.length; i++) {
      let tempSelectedTemplateId = 0;
      let shippingOptions = Object.keys(templates[i].shipping_options || {});
      let hasAnyTemplateSelected = shippingOptions.some(
        (item) => templates[i].shipping_options?.[item].selected_option === true
      );
      if (hasAnyTemplateSelected && i !== templateIndex) {
        tempSelectedTemplateId = shippingOptions.filter((item) => {
          return templates[i].shipping_options?.[item].selected_option === true;
        })[0];
      } else if (i !== templateIndex) {
        tempSelectedTemplateId = shippingOptions[0];
      } else {
        tempSelectedTemplateId = templateId;
      }
      for (let j = 0; j < templates[i]?.products.length; j++) {
        let currentProduct = templates[i]?.products[j];
        allItems[
          `${currentProduct.product_id}-${currentProduct.variant_combo_id}`
        ] = {
          quantity: currentProduct.quantity,
          shipping_template_option_id: tempSelectedTemplateId || null,
        };
      }
    }
    // let updatedOptions = { ...selectedOptions };
    // updatedOptions[`${item.product_id}-${item.variant_combo_id}`] = {
    //   shipping_template_option_id: templateId,
    //   quantity: item.quantity,
    // };
    dispatch({
      type: UPDATE_SHIPPING_OPTIONS_SAGA,
      payload: {
        addressId: shippingAddressId,
        updatedOptions: allItems,
        setIsApiLoading,
        navigate,
      },
    });
  };

  useEffect(() => {
    if (shippingAddressId) {
      dispatch({
        type: FETCH_SHIPPING_OPTIONS,
        payload: shippingAddressId,
        isLoading: setIsApiLoading,
        navigate,
      });
    }
  }, [shippingAddressId]);

  const handleRemoveItem = (cartItemId) => {
    if (cartData.length < 2) {
      MyToast("cannot remove last item", "error");
      return;
    }
    let allItems = {};
    for (let i = 0; i < templates.length; i++) {
      let tempSelectedTemplateId = 0;
      let shippingOptions = Object.keys(templates[i].shipping_options || {});
      let hasAnyTemplateSelected = shippingOptions.some(
        (item) => templates[i].shipping_options?.[item].selected_option === true
      );
      if (hasAnyTemplateSelected) {
        tempSelectedTemplateId = shippingOptions.filter((item) => {
          return templates[i].shipping_options?.[item].selected_option === true;
        })[0];
      } else {
        tempSelectedTemplateId = shippingOptions[0];
      }
      for (let j = 0; j < templates[i]?.products.length; j++) {
        let currentProduct = templates[i]?.products[j];
        allItems[
          `${currentProduct.product_id}-${currentProduct.variant_combo_id}`
        ] = {
          quantity: currentProduct.quantity,
          shipping_template_option_id: tempSelectedTemplateId || null,
        };
      }
    }
    delete allItems[cartItemId];
    dispatch({
      type: UPDATE_SHIPPING_OPTIONS_SAGA,
      payload: {
        addressId: shippingAddressId,
        updatedOptions: allItems,
        setIsApiLoading,
        navigate,
      },
    });
  };

  const handleReduceAmount = (cartItemId) => {
    let allItems = {};
    for (let i = 0; i < templates.length; i++) {
      let tempSelectedTemplateId = 0;
      let shippingOptions = Object.keys(templates[i].shipping_options || {});
      let hasAnyTemplateSelected = shippingOptions.some(
        (item) => templates[i].shipping_options?.[item].selected_option === true
      );
      if (hasAnyTemplateSelected) {
        tempSelectedTemplateId = shippingOptions.filter((item) => {
          return templates[i].shipping_options?.[item].selected_option === true;
        })[0];
      } else {
        tempSelectedTemplateId = shippingOptions[0];
      }
      for (let j = 0; j < templates[i]?.products.length; j++) {
        let currentProduct = templates[i]?.products[j];
        allItems[
          `${currentProduct.product_id}-${currentProduct.variant_combo_id}`
        ] = {
          quantity: currentProduct.quantity,
          shipping_template_option_id: tempSelectedTemplateId || null,
        };
      }
    }
    allItems[cartItemId].quantity = allItems[cartItemId].quantity - 1;
    dispatch({
      type: UPDATE_SHIPPING_OPTIONS_SAGA,
      payload: {
        addressId: shippingAddressId,
        updatedOptions: allItems,
        setIsApiLoading,
        navigate,
      },
    });
  };

  const handleAddItem = (cartItemId) => {
    let allItems = {};
    for (let i = 0; i < templates.length; i++) {
      let tempSelectedTemplateId = 0;
      let shippingOptions = Object.keys(templates[i].shipping_options || {});
      let hasAnyTemplateSelected = shippingOptions.some(
        (item) => templates[i].shipping_options?.[item].selected_option === true
      );
      if (hasAnyTemplateSelected) {
        tempSelectedTemplateId = shippingOptions.filter((item) => {
          return templates[i].shipping_options?.[item].selected_option === true;
        })[0];
      } else {
        tempSelectedTemplateId = shippingOptions[0];
      }
      for (let j = 0; j < templates[i]?.products.length; j++) {
        let currentProduct = templates[i]?.products[j];
        allItems[
          `${currentProduct.product_id}-${currentProduct.variant_combo_id}`
        ] = {
          quantity: currentProduct.quantity,
          shipping_template_option_id: tempSelectedTemplateId || null,
        };
      }
    }
    allItems[cartItemId].quantity = allItems[cartItemId].quantity + 1;
    dispatch({
      type: UPDATE_SHIPPING_OPTIONS_SAGA,
      payload: {
        addressId: shippingAddressId,
        updatedOptions: allItems,
        setIsApiLoading,
        navigate,
      },
    });
  };

  const getDate = (dateRange) => {
    const currentDate = new Date();
    const [startDays, endDays] = dateRange
      .split("-")
      .map((item) => parseInt(item));

    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + startDays);

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + endDays);

    const options = { weekday: "short", month: "short", day: "numeric" };

    const formattedStartDate = startDate.toLocaleDateString("en-US", options);
    const formattedEndDate = endDate.toLocaleDateString("en-US", options);

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="accordion-item cart-sec">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOptions"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Select Shipping Options
                </button>
              </h2>
              <div
                id="collapseOptions"
                className="accordion-collapse collapse show cart"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  {allAddresses?.length === 0 ? (
                    <p>Please add Address to see shipping options</p>
                  ) : (
                    templates?.map((templateItem, index) => (
                      <div
                        className="d-flex flex-lg-row flex-column col-12 cart-info mb-3"
                        key={`${templateItem.shipping_template_name}`}
                      >
                        <div className="col-lg-8">
                          {templateItem?.products?.map((item) => (
                            <div
                              className="d-flex  flex-column mb-3"
                              key={`${item.product_id}-${item.variant_combo_id}`}
                            >
                              <div className="shipping-info" style={{marginBottom:"20px"}}>
                                <Link
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRemoveItem(
                                      `${item.product_id}-${item.variant_combo_id}`
                                    );
                                  }}
                                >
                                  <img
                                    src={removeImage}
                                    alt="Remove from cart"
                                  />
                                </Link>
                                {/* <img
                                  src={item.image_path || dummmyImage}
                                  onError={handleImageError}
                                /> */}
                                <TextShortener
                                  text={item.product_name}
                                  textLimit={18}
                                  component="img"
                                  tooltipClassname="custom-tooltip-class"
                                  imgSrc={item.image_path || dummmyImage}
                                  onError={handleImageError}
                                  className=""
                                  parentClassName="shipping-info"
                                />
                                <div className="d-flex flex-column col-10">
                                  <p
                                    onClick={(e) =>
                                      navigate("/product/" + item.product_slug)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    {item.product_name +
                                      (item.variant_name_combo
                                        ? `( ${item.variant_name_combo} )`
                                        : "")}
                                  </p>

                                  <div className="price-info">
                                    <span className="d-lg-none">Price:</span>
                                    {item.price !== item.sale_price && (
                                      <del>
                                        {amoutRateConversion(
                                          item.price,
                                          currencyRate,
                                          currencyCode
                                        )}
                                      </del>
                                    )}
                                    <span>
                                      {" " +
                                        amoutRateConversion(
                                          item.sale_price,
                                          currencyRate,
                                          currencyCode
                                        )}
                                    </span>
                                  </div>
                                  <div
                                    className="product-quantity d-flex flex-row"
                                    style={{
                                      width: "70%",
                                      // marginBottom: "20px",
                                    }}
                                  >
                                    <span
                                      className={`minus ${
                                        item.quantity < 2 ? "disabled" : ""
                                      }`}
                                      onClick={(e) =>
                                        handleReduceAmount(
                                          `${item.product_id}-${item?.variant_combo_id}`
                                        )
                                      }
                                    >
                                      <img
                                        src={minusImage}
                                        alt="Decrease quantity"
                                      />
                                    </span>
                                    <input
                                      type="number"
                                      className="count"
                                      name="qty"
                                      value={item.quantity}
                                      disabled
                                    />
                                    <span
                                      className="plus"
                                      onClick={(e) =>
                                        handleAddItem(
                                          `${item.product_id}-${item?.variant_combo_id}`
                                        )
                                      }
                                    >
                                      <img
                                        src={plusImage}
                                        alt="Increase quantity"
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="col-lg-4 align-self-lg-start">
                          {templateItem?.shipping_options &&
                          Object.keys(templateItem.shipping_options).length >
                            0 ? (
                            <div className="d-flex flex-column radio-btn">
                              <p>Choose a delivery option:</p>
                              <div
                                className="form-check"
                                style={{ width: "auto" }}
                              >
                                {templateItem?.shipping_options &&
                                  Object.keys(templateItem.shipping_options)
                                    .length > 0 &&
                                  Object.keys(
                                    templateItem.shipping_options
                                  )?.map((option) => {
                                    return (
                                      <>
                                        <input
                                          key={`${templateItem.shipping_template_name}-${option} radio`}
                                          type="radio"
                                          name={`${templateItem.shipping_template_name}-${option} deliveryOption`}
                                          className="form-check-input"
                                          checked={
                                            templateItem.shipping_options[
                                              option
                                            ]?.selected_option
                                          }
                                          onChange={(e) =>
                                            updateSelectedOption(
                                              templateItem,
                                              option,
                                              index
                                            )
                                          }
                                        />
                                        <label>
                                          {getDate(
                                            templateItem.shipping_options[
                                              option
                                            ].transit_time
                                          )}
                                        </label>
                                        <p className="align-self-start">
                                          {templateItem.shipping_options[option]
                                            .shipping_price > 0
                                            ? `Price: ${amoutRateConversion(
                                                templateItem.shipping_options[
                                                  option
                                                ].shipping_price,
                                                currencyRate,
                                                currencyCode
                                              )} + ${amoutRateConversion(
                                                templateItem.shipping_options[
                                                  option
                                                ].shipping_fee_plus,
                                                currencyRate,
                                                currencyCode
                                              )} per ${
                                                templateItem.shipping_options[
                                                  option
                                                ].shipping_fee_plus_unit
                                              }`
                                            : "Free Shipping"}
                                        </p>
                                      </>
                                    );
                                  })}
                              </div>
                            </div>
                          ) : (
                            <p
                              onClick={(e) =>
                                handleRemoveItem(
                                  `${templateItem.product_id}-${templateItem.variant_combo_id}`
                                )
                              }
                              style={{ color: "red" }}
                            >
                              This product cannot be shipped to this location,
                              please click here to remove this product or change
                              address
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingOptionsForm;
