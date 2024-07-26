import React, { useEffect, useRef, useState } from "react";
import loader from "../../../assets/images/loader.gif";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { handleBannersData } from "../../../redux/actions/CategoryActions";
import { Link } from "react-router-dom";

const TopSectionSlider = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const bannerData = useSelector(
    (state) => state?.bannerReducerData?.banner
  )
  const mouseMoved = useRef(false);

  useEffect(() => {
    if (!bannerData || bannerData?.length === 0) {
      dispatch(handleBannersData(setIsLoading));
    }
  }, [bannerData, dispatch]);

  const settings = {
    dots: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipeToSlide: true,
  };

  if (isLoading) {
    return (
      <div className="slide-loader">
        <img src={loader} />
      </div>
    );
  }

  const handleClick = (url) => {
    if (!mouseMoved.current && url && url.length > 0) {
      window.open(url, "_blank");
    }
  };

  if (bannerData?.length < 1) {
    return <></>;
  }

  if (bannerData?.length === 1) {
    return (
      <div className="col-12 d-flex align-items-center justify-content-center">
        <div className="slide-sec">
          <Link
            onClick={(e) => {
              e.preventDefault();
              if(bannerData[0]?.poster_url) {
                window.open(bannerData[0]?.poster_url, "_blank");
              }
            }}
          >
            <img
              src={bannerData[0]?.banner_images}
              alt=""
              style={{ maxWidth: "100%" }}
            />
          </Link>
        </div>
      </div>
    );
  }

  if (bannerData?.length === 2) {
    return (
      <div className="col-12">
        <div className="img-sec-double d-flex flex-column flex-md-row justify-content-around">
          <Link
            onClick={(e) => {
              e.preventDefault();
              if(bannerData[0]?.poster_url) {
                window.open(bannerData[0]?.poster_url, "_blank");
              }
            }}
          >
            <img
              src={bannerData[0]?.banner_images}
              alt=""
              style={{ maxWidth: "100%" }}
            />
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();
              if(bannerData[1]?.poster_url) {
                window.open(bannerData[1]?.poster_url, "_blank");
              }
            }}
          >
            <img
              src={bannerData[1]?.banner_images}
              alt=""
              style={{ maxWidth: "100%" }}
            />
          </Link>
        </div>
      </div>
    );
  }

  if (bannerData?.length === 3) {
    return (
      <>
        <div className="col-xl-7 col-lg-7 col-md-7">
          <div className="slide-sec slick-initialized slick-slider slick-dotted">
            {bannerData.length > 0 &&
              bannerData.slice(0, 1).map((item, index) => {
                return (
                  <div className="slick-list draggable" key={index}>
                    <div className="slick-track">
                      <div
                        className="slick-slide slick-cloned"
                        style={{ width: "400px" }}
                        onClick={handleClick}
                      >
                        <img
                          src={item?.banner_images}
                          style={{ objectFit: "fit" }}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-xl-5 col-lg-5 col-md-5">
          <div className="img-sec">
            <Link
              onClick={(e) => {
                e.preventDefault();
                if( bannerData[bannerData.length - 1]?.poster_url) {
                  window.open(
                    bannerData[bannerData.length - 1]?.poster_url,
                    "_blank"
                  );
                }
              }}
            >
              <img
                src={bannerData[bannerData.length - 1].banner_images}
                alt=""
              />
            </Link>
            <Link
              onClick={(e) => {
                e.preventDefault();
                if(bannerData[bannerData.length - 2]?.poster_url) {
                  window.open(
                    bannerData[bannerData.length - 2]?.poster_url,
                    "_blank"
                  );
                }
              }}
            >
              <img
                src={bannerData[bannerData.length - 2].banner_images}
                alt=""
              />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="col-xl-7 col-lg-7 col-md-7">
        <Slider
          {...settings}
          className="slide-sec slick-initialized slick-slider slick-dotted"
        >
          {bannerData.length > 0 &&
            bannerData.slice(0, bannerData.length - 2).map((item, index) => {
              return (
                <div className="slick-list draggable" key={index}>
                  <div className="slick-track">
                    <div
                      className="slick-slide slick-cloned"
                      style={{ width: "400px" }}
                      onMouseMove={() => {
                        if (!mouseMoved.current) {
                          mouseMoved.current = true;
                        }
                      }}
                      onMouseDown={() => mouseMoved.current = false}
                      onMouseUp={() => handleClick(item.poster_url)}
                    >
                      <img
                        src={item?.banner_images}
                        style={{ objectFit: "fit" }}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
      <div className="col-xl-5 col-lg-5 col-md-5">
        <div className="img-sec">
          <Link
            onClick={(e) => {
              e.preventDefault();
              if(bannerData[bannerData.length - 1]?.poster_url) {
                window.open(
                  bannerData[bannerData.length - 1]?.poster_url,
                  "_blank"
                );
              }
            }}
          >
            <img src={bannerData[bannerData.length - 1].banner_images} alt="" />
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();
              if(bannerData[bannerData.length - 2]?.poster_url) {
                window.open(
                  bannerData[bannerData.length - 2]?.poster_url,
                  "_blank"
                );
              }
            }}
          >
            <img src={bannerData[bannerData.length - 2].banner_images} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopSectionSlider;
