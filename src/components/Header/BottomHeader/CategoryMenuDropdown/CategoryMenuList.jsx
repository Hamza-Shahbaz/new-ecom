import React, { Children } from "react";
import { Link } from "react-router-dom";
import TextShortener from "../../../DynamicText/TextShortner";
import { useSelector } from "react-redux";

const CategoryMenuList = ({
  categories,
  setShowMenu,
  categorySlug = "",
  childNumber = 0,
}) => {
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );
  const depth = (siteSettingsData?.category_web_navbar_max_depth-1)|| 4
  return (
    categories.length > 0 &&
    categories.map((category) => {
      if (category.sub_categories && category.sub_categories.length > 0) {
        return (
          <li className="dropdown-submenu" key={category.category_id} onClick={setShowMenu}>
            <Link
              to={`/category/${category.category_slug}`}
              className="dropdown-item d-flex align-items-center justify-content-between"
            >
              <TextShortener
                text={category.category_title}
                textLimit={15}
                component={""}
              />{" "}
              <i className="fa fa-angle-right" style={{ marginLeft: "10px" }} />
            </Link>
            {childNumber < depth ? (
              <ul className="dropdown-menu">
                <CategoryMenuList
                  categories={category.sub_categories}
                  setShowMenu={setShowMenu}
                  categorySlug={
                    childNumber == 0 ? category.category_slug : categorySlug
                  }
                  childNumber={childNumber + 1}
                />
              </ul>
            ) : (
              <ul className="dropdown-menu">
                {" "}
                <li key={category.sub_categories[0].category_id}>
                  <Link
                    to={`/category/${categorySlug}`}
                    className="dropdown-item"
                  >
                    <TextShortener
                      text={"View All"}
                      textLimit={15}
                      component={""}
                    />
                  </Link>
                </li>
              </ul>
            )}
          </li>
        );
      }
      return (
        <li key={category.category_id}>
          <Link
            to={`/category/${category.category_slug}`}
            className="dropdown-item"
          >
            <TextShortener
              text={category.category_title}
              textLimit={15}
              component={""}
            />
          </Link>
        </li>
      );
    })
  );
};

export default CategoryMenuList;
