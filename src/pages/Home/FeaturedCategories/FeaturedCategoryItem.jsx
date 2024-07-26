import React, { useState } from "react";
import { BaseUrl } from "../../../utils/Api";
import FeaturedCategoryList from "./FeaturedCategoryList";
import { useNavigate } from "react-router-dom";
import TextShortener from "../../../components/DynamicText/TextShortner";
import dummmyImage from "../../../assets/images/no-image1.png";

const FeaturedCategoryItem = ({ category }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  return (
    <div
      className="featured-box"
      key={category.category_id}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/category/${category.category_slug}`);
      }}
    >
      <TextShortener
        text={category.category_title}
        textLimit={18}
        component="img"
        tooltipClassname="custom-tooltip-class"
        imgSrc={
          category.category_photo
            ? category.category_photo ||
              `${BaseUrl.replace(BaseUrl.slice(-5), "")}${
                category?.category_photo
              }`
            : dummmyImage
        }
        onError={handleImageError}
        className="w-100 featured-tooltip-wrapped-image"
        parentClassName="featured-box"
      />

      {/* <img
        src={
          category.category_photo
            ? category.category_photo ||
              `${BaseUrl.replace(BaseUrl.slice(-5), "")}${
                category?.category_photo
              }`
            : dummmyImage
        }
        onError={handleImageError}
        className="w-100"
      /> */}

      <div
        className="dropdown d-flex align-items-center justify-content-center"
        onMouseOver={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <button
          className={`btn btn-f-category w-100 show cardItemStyle`}
          type="button"
          onClick={(e) => {
            if (category.sub_categories.length > 0) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
        >
          <TextShortener
            text={category.category_title}
            textLimit={18}
            component=""
          />
          {category.sub_categories && category.sub_categories.length > 0 && (
            <i
              className="fa fa-angle-down iconstyle"
              style={{ marginLeft: "10px" }}
            />
          )}
        </button>
        {category.sub_categories && category.sub_categories.length > 0 && (
          <FeaturedCategoryList
            subcategories={category.sub_categories}
            showMenu={showMenu}
          />
        )}
      </div>
    </div>
  );
};

export default FeaturedCategoryItem;
