import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, EndPoints } from "../../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderRequest } from "../../../redux/actions/SliderActions";
import Slider from "react-slick";
import dummmyImage from "../../../assets/images/no-image1.png";

const handleImageError = (e) => {
  e.target.onerror = null; // prevent infinite loop
  e.target.src = dummmyImage;
};

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [mouseMoved, setMouseMoved] = useState(false);

  const settings = {
    dots: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const handleClick = (url) => {
    if (!mouseMoved && url) {
      window.open(url, "_blank");
    }
  };

  const getPoster = useSelector(
    (state) => state.SliderReducerData.sliders.GET_POSTER.sliderData.data
  );

  useEffect(() => {
    if (!getPoster || getPoster.length === 0) {
      dispatch(
        fetchSliderRequest(
          "GET_POSTER",
          `${BaseUrl}${EndPoints.posters}`,
          setIsLoading
        )
      );
    }
  }, [getPoster, dispatch]);

  let transformedData = [];
  if (Object.keys(getPoster?.posters_data || {}).length > 0) {
    for (let poster in getPoster.posters_data) {
      transformedData.push(getPoster.posters_data[poster]);
    }
  }

  if (transformedData?.length < 1) {
    return <></>;
  }

  return (
    <section className="top-brand">
      <div className="container">
        <div className="border-line">
          <div className="row align-items-center">
            <Slider {...settings} className="featured-slider">
              {transformedData.length > 0 &&
                transformedData.map((item) => {
                  return (
                    <div className="slick-list draggable" key={item?.poster_id}>
                      <div className="slick-track">
                        <div
                          onMouseMove={() => setMouseMoved(true)}
                          onMouseDown={() => setMouseMoved(false)}
                          onMouseUp={() => handleClick(item.poster_url)}
                          className="slick-slide slick-cloned"
                        >
                          <img
                            src={item?.poster_image_path || dummmyImage}
                            onError={handleImageError}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
