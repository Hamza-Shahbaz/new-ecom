import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import filterClose from "../../../assets/images/toggle-img.png";

const FilterByCategorySectionDeals = ({
  filterData,
  selectedCategory,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();

  const breadcrumbsFromState = useSelector(
    (state) => state.BreadcrumbReducerData.breadcrumbs || []
  );

  const handleClick = (e, category) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCategory({ type: "category", payload: category });
  };

  const lastCrumb = breadcrumbsFromState[breadcrumbsFromState?.length - 1];

  const lastCrumbTitle =
    breadcrumbsFromState[breadcrumbsFromState?.length - 1]?.name;

  return (
    <>
      {filterData?.records?.length > 0 && (
        <div className="category" key={"category-section"}>
          <div className="d-flex align-items-center justify-content-between d-md-none d-block mb-2">
            <span className="d-md-none d-block mb-0">Filter Search:</span>
            <label htmlFor="menu-toggle">
              <img className="filter-close" src={filterClose} />
            </label>
          </div>
          <hr className="d-md-none d-block mb-3"></hr>
          <span>Category</span>
          <div className="accordion" id="maincategory">
            <div className="accordion-item">
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
              >
                <div className="accordion-body">
                  {filterData.records.map((category) => {
                    return (
                      <Link
                        key={category.category_id}
                        onClick={(e) => handleClick(e, category)}
                        style={{color:selectedCategory.category_title === category.category_title ? "#ffb703" : "" }}
                      >
                        {category.category_title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterByCategorySectionDeals;

const CategoryItem = ({ item, navigate }) => {
  if (item.sub_categories && item.sub_categories.length > 0) {
    return (
      <div key={item.category_id}>
        <h2 className="accordion-header" id={`heading${item.category_id}`}>
          <button
            className="accordion-button collapsed" // Add the collapsed class here
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${item.category_id}`}
            aria-expanded="false"
            aria-controls={`collapse${item.category_id}`}
          >
            <Link
              to={`/category/${item.category_slug}`}
              style={{ color: "inherit" }}
              onClick={(e) => navigate(`/category/${item.category_slug}`)}
            >
              {item.category_title}
            </Link>
          </button>
        </h2>

        <div
          id={`collapse${item.category_id}`}
          className="accordion-collapse collapse"
          aria-labelledby={`heading${item.category_id}`}
        >
          <div className="accordion-body">
            {item.sub_categories.map((category) => {
              return (
                <CategoryItem
                  item={category}
                  navigate={navigate}
                  key={category.category_id + "categoryItem"}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Link
      key={item.category_id}
      onClick={(e) => handleClick(e, item.category_title)}
    >
      {item.category_title}
    </Link>
  );
};
