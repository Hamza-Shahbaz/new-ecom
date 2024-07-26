import React from "react";
import { Link } from "react-router-dom";

const FeaturedCategoryList = ({ subcategories , showMenu }) => {
  return (
    <ul className={`dropdown-menu ${showMenu ? "show" : ""}`} data-popper-placement="bottom-start" style={{position: "absolute", inset: "0px auto auto 0px", margin: "0px", transform: "translate(0px, 33px)",}}>
      {subcategories.map((subcategory) => {
        if (subcategory.sub_category && subcategory.sub_category.length > 0) {
          <li key={subcategory.category_id}>
            <Link
              to={`/category/${subcategory.category_slug}`}
              className="dropdown-item d-flex align-items-center justify-content-between"
              onClick={(e) => e.stopPropagation()}
            >
              {subcategory.category_title} <i className="fa fa-angle-right" />
            </Link>
            <ul className="dropdown-menu">
              <CategoryMenuList categories={subcategory.sub_category} />
            </ul>
          </li>;
        }
        return (
          <li key={subcategory.category_id}>
            <Link
              className="dropdown-item"
              to={`/category/${subcategory.category_slug}`}
              onClick={(e) => e.stopPropagation()}
            >
              {subcategory.category_title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FeaturedCategoryList;
