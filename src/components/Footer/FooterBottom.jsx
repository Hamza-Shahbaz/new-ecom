import React from "react";
import { useSelector } from "react-redux";

const FooterBottom = () => {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );
  return (
    <div className="footer-bottom">
      <div className="container">
        <div className="row align-items-center mt-0 pt-2 pb-2">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="footer-bootom-links">
              <p>
                © Copyright {currentYear} . {siteSettingsData?.website_name ? (siteSettingsData?.website_name + " . ") : ""} All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
