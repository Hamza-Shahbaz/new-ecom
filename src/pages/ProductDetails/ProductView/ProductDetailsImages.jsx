import React, { useEffect, useState } from "react";
import { ImageMagnifier } from "../../../components/ImageMagnifier/ImageMagnifier";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from "../../../assets/images/arrow-left.png";
import rightArrow from "../../../assets/images/arrow-right.png";
import demoImage from "../../../assets/images/demoimage.png";
import dummmyImage from "../../../assets/images/no-image1.png";

const ProductDetailsImages = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mouseMoved, setMouseMoved] = useState(false);
  const [autoplay, setAutoplay] = useState(true); // State to control autoplay

  const settings = {
    dots: false,
    speed: 800,
    focusOnSelect: true,
    slidesToShow: Math.min(images?.length, 4),
    slidesToScroll: 1,
    arrows: true,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    swipeToSlide: true,
    afterChange: (current) => setActiveImageIndex(current),
    initialSlide: activeImageIndex,
    infinite: true,  // This ensures the slides loop continuously
  };

  const handleClick = (index) => {
    if (!mouseMoved) {
      setActiveImageIndex(index);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  return (
    <>
      {images?.length > 0 ? (
        <div className="col-xl-5 col-lg-5 col-md-5">
          <ImageMagnifier
            src={images[activeImageIndex]?.image_path || images[0].image_path}
            onMouseEnter={() => setAutoplay(false)} // Pause autoplay on hover
            onMouseLeave={() => setAutoplay(true)} // Resume autoplay on leave
          />
          <div className="thumbnail-img mt-3">
            {images?.length > 1 && (
              <Slider
                key={autoplay ? "autoplay-on" : "autoplay-off"}
                {...settings}
                className="slider slick-initialized slick-slider"
              >
                {images?.length > 1 &&
                  images?.map((item, index) => {
                    return (
                      <div className="slick-list draggable" key={index}>
                        <div className="slick-track">
                          <div
                            onClick={() => handleClick(index)}
                            className="slick-slide slick-cloned"
                          >
                            <img
                              src={item?.image_path || dummmyImage}
                              onError={handleImageError}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            )}
          </div>
        </div>
      ) : (
        <div className="col-xl-5 col-lg-5 col-md-5 d-flex justify-content-center">
          <img src={demoImage} style={{ width: "350px", height: "250px" }} />
        </div>
      )}
    </>
  );
};

export default ProductDetailsImages;

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      className="a-left slick-prev slick-arrow"
      style={{ ...style }}
      src={leftArrow}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      className="a-right slick-next slick-arrow"
      style={{ ...style }}
      src={rightArrow}
      onClick={onClick}
    />
  );
}
