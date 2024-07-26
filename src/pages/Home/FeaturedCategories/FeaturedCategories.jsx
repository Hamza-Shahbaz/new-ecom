import React, { useEffect, useState } from "react";
import { BaseUrl, EndPoints } from "../../../utils/Api";
import FeaturedCategoryItem from "./FeaturedCategoryItem";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedCategories } from "../../../redux/actions/CategoryActions";

const FeaturedCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const featuredCategoryData = useSelector((state) => state.categoryReducerData.featuredCategories)
  if(featuredCategoryData?.length < 1) {
    return <></>
  }
  return (
    <section className="featured-sec">
      <div className="container">
        <div className="border-line">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="center-heading">
                <h1>Featured Categories</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="featured-body">
                {featuredCategoryData &&
                  featuredCategoryData.length > 0 &&
                  featuredCategoryData.map((category, index) => {
                    return <FeaturedCategoryItem category = { category } key={index}/>;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
