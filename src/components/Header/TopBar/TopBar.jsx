import React from "react";
import { useSelector } from "react-redux";
import CurrencySelect from "./CurrencySelect";
import SelectLanguage from "./SelectLanguage";

const TopBar = () => {
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  const formatUrl = (url) => {
    if (!url) return undefined;
    return url.startsWith("http") ? url : `https://${url}`;
  };
  return (
    <section className="top-bar">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="welcome">
              <p>Welcome to {siteSettingsData?.website_name || "King Distributor"} </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="social">
              <div className="left d-xl-block d-none">
                <span>Follow us :</span>
                <a
                  href={formatUrl(siteSettingsData?.facebook_link)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href={formatUrl(siteSettingsData?.instagram_link)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href={formatUrl(siteSettingsData?.x_link)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={formatUrl(siteSettingsData?.youtube_link)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
              <div className="right">
                <SelectLanguage />
              </div>
              <div className="right">
                <CurrencySelect />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
