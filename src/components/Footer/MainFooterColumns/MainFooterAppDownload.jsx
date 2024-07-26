import React from "react";
import { Link } from "react-router-dom";
import googlePlayImage from "../../../assets/images/google-play.png";
import appleStoreImage from "../../../assets/images/app-store.png"
import { useSelector } from "react-redux";

const MainFooterAppDownload = () => {
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );
  
  const featuredCategoryData = useSelector(
    (state) => state.categoryReducerData.categories
  );


  return (
    <div className={featuredCategoryData.length >0 ? "col-xl-2 col-lg-2 col-md-6 col-6" : "col-xl-3 col-lg-3 col-md-6 col-6"}>
      <div className="footer-links">
        <h6>Download APP</h6>
        <Link to={siteSettingsData?.playstore_link || "/"}>
          <img src={googlePlayImage} alt="Google Play" style={{height: '47px' , width: '116px'}} className="footerImgStyle"/>
        </Link>
        <Link to={siteSettingsData?.applestore_link || "/"}>
          <img src={appleStoreImage} alt="Apple Store" style={{height: '47px'}}/>
        </Link>
      </div>
    </div>
  );
};

export default MainFooterAppDownload;
