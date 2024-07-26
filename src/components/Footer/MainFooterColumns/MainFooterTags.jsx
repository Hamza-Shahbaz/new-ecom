import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BaseUrl, EndPoints } from "../../../utils/Api";

const MainFooterTags = () => {
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  const featuredCategoryData = useSelector(
    (state) => state.categoryReducerData.categories
  );

  const [tags, setTags] = useState([])

  useEffect(() => {

    async function getTagsByApi() {
      try {
        const response = await fetch(BaseUrl+EndPoints.get_tags, 
          {method:'GET'}
        )
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json()
        if(data?.data?.length > 0) {
          setTags(data.data)
        }
      }
      catch(error) {

      }
    }
    getTagsByApi()
    
  }, []);
  return (
    <div className="col-xl-3 col-lg-3 col-md-6 col-6">
      <div className="footer-links">
        <h6>Popular Tag</h6>
        <div className="tag">
            {tags && tags.length > 0 && tags.map((tag, index) => (
                <Link to={`/category/${tag.category_slug}`} state={{tag}} key={index}>{tag.tag_title}</Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainFooterTags;
