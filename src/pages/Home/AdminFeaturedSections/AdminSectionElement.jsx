import React from "react";
import { Link } from "react-router-dom";
import TextShortener from "../../../components/DynamicText/TextShortner";
import dummmyImage from "../../../assets/images/no-image1.png";

const AdminSectionElement = ({ element }) => {
  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  return (
    <div className="col-xl-3 col-lg-3 col-md-6">
      <Link
        to={`/category/${element.category_slug}`}
        className="text-decoration-none"
      >
        <div className="explore-inner">
          <TextShortener
            text={element.category_title}
            textLimit={15}
            component="img"
            tooltipClassname="custom-tooltip-class"
            imgSrc={element.category_image || dummmyImage}
            onError={handleImageError}
            className="w-100"
            parentClassName="w-100"
          />
          {/* <img
            src={element.category_image || dummmyImage}
            onError={handleImageError}
            className="w-100"
          /> */}
          <div className="pt-2 px-3 pb-2 d-flex align-items-center justify-content-between">
            <TextShortener
              text={element.category_title || ""}
              component={"h3"}
              textLimit={15}
              tooltipClassname={"tooltip-span-class"}
            />
            <span>
              Explore
              <i className="fa fa-angle-right ms-2" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdminSectionElement;
