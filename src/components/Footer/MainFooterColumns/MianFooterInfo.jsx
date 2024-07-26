import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logoForHeader from "../../../assets/images/logo.gif";

const MianFooterInfo = () => {
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );
  return (
    <div className="col-xl-3 col-lg-3 col-md-12">
      <div className="footer-logo">
        <Link to={"/"}>
          {siteSettingsData ? (
            <img
              src={siteSettingsData?.site_logo || logoForHeader}
              onError={(event) => {
                event.target.src = logoForHeader;
                event.onerror = null;
              }}
              style={{
                height: "50px",
                width: "110px",
              }}
            />
          ) : null}
        </Link>
        <div className="mb-4">
          <p>Customer Supports:</p>
          <span>{siteSettingsData?.site_contact_no}</span>
        </div>
        <div className="mb-4">
          <p>{siteSettingsData?.physical_address}</p>
          <span>{siteSettingsData?.site_email}</span>
        </div>
      </div>
    </div>
  );
};

export default MianFooterInfo;
