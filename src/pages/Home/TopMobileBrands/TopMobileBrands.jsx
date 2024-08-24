import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderRequest } from "../../../redux/actions/SliderActions";
import { BaseUrl, EndPoints } from "../../../utils/Api";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { amoutRateConversion } from "../../../utils/Helper";
import dummmyImage from "../../../assets/images/no-image1.png";

const TopMobileBrands = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [mouseMoved, setMouseMoved] = useState(false);

  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  const handleClick = (id) => {
    if (!mouseMoved) {
      navigate(`/product/${id}`);
    }
  };

  const settings = {
    dots: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [...breakPoints],
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const bestSellingProducts = useSelector(
    (state) =>
      state.SliderReducerData.sliders.BEST_SELLING_PRODUCTS.sliderData.data
  );

  useEffect(() => {
    if (!bestSellingProducts || bestSellingProducts.length === 0) {
      dispatch(
        fetchSliderRequest(
          "BEST_SELLING_PRODUCTS",
          `${BaseUrl}${EndPoints.best_selling_products}`,
          setIsLoading
        )
      );
    }
  }, [bestSellingProducts, dispatch]);

  let transformedDataOfFeaturedCategories = [];
  if (Object.keys(bestSellingProducts?.products_data || {}).length > 0) {
    for (let product in bestSellingProducts.products_data) {
      transformedDataOfFeaturedCategories.push(bestSellingProducts.products_data[product]);
    }
  }

  if (transformedDataOfFeaturedCategories?.length < 1) {
    return <></>;
  }

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  return (
    <>
      {transformedDataOfFeaturedCategories?.length > 4 && (
        <section className="best-selling">
          <div className="container">
            <div className="border-line">
              <div className="row align-items-center">
                <SectionHeader
                  title={"Best Selling Products"}
                  navigationLink={"/best-selling-products"}
                />
              </div>
              <div className="row align-items-center justify-content-center">
                <Slider {...settings} className="brand-slider">
                  {transformedDataOfFeaturedCategories.length > 0 &&
                    transformedDataOfFeaturedCategories.map((item) => {
                      return (
                        <div
                          className="col-xl-4 col-lg-4 col-md-6"
                          key={item?.product_id}
                        >
                          <Link
                            className="text-decoration-none"
                            style={{ margin: "0 10px" }}
                            onClick={(e) => e.preventDefault()}
                          >
                            <div
                              onMouseMove={() => setMouseMoved(true)}
                              onMouseDown={() => setMouseMoved(false)}
                              onMouseUp={() => handleClick(item.product_slug)}
                              className="selling-inner"
                            >
                              <img
                                src={item?.image_path || dummmyImage}
                                onError={handleImageError}
                                style={{
                                  objectFit:"contain"
                                }}
                              />
                              <div className="pt-2 px-3 pb-2 d-flex align-items-center justify-content-between">
                                <div className="mb-0">
                                  {/* <TextShortener
                                text={item.product_name}
                                textLimit={25}
                                component={"h3"}
                                tooltipStyle={{textWrap:"inherit", width:"240px"}}
                              /> */}
                                  <span className="price">
                                    {amoutRateConversion(
                                      item.sale_price,
                                      currencyRate,
                                      currencyCode
                                    )}
                                    {item.sale_price !== item.price && (
                                      <del>
                                        {amoutRateConversion(
                                          item.price,
                                          currencyRate,
                                          currencyCode
                                        )}
                                      </del>
                                    )}
                                  </span>
                                </div>
                                <span>
                                  Explore
                                  <i className="fa fa-angle-right ms-2" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TopMobileBrands;

export const breakPoints = [
  {
    breakpoint: 1279,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
    },
  },
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
    },
  },
  {
    breakpoint: 520,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
    },
  },
];
