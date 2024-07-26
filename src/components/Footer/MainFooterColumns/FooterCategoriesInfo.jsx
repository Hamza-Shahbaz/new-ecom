import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedCategories } from "../../../redux/actions/CategoryActions";
import { Link } from "react-router-dom";
import TextShortener from "../../DynamicText/TextShortner";

const FooterCategoriesInfo = () => {
  const dispatch = useDispatch();

  const featuredCategoryData = useSelector(
    (state) => state.categoryReducerData.categories
  );

  useEffect(() => {
    dispatch(getFeaturedCategories());
  }, []);
  return (
    <>
      {featuredCategoryData.length > 0 && (
        <div className="col-xl-2 col-lg-2 col-md-6 col-6">
          <div className="footer-links">
            <h6>Top Category</h6>
            {featuredCategoryData && featuredCategoryData.length > 0 && (
              <ul className="list-unstyled">
                {featuredCategoryData.slice(0, 5).map((category) => {
                  return (
                    <li key={category.category_id}>
                      <Link to={`/category/${category.category_slug}`}>
                        <TextShortener
                          text={category.category_title}
                          textLimit={18}
                          component={""}
                          tooltipColor={""}
                          className={""}
                        />
                      </Link>
                    </li>
                  );
                })}
                {/* <li>
              <Link to={"/"}>Browse All Product</Link>
            </li> */}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FooterCategoriesInfo;
