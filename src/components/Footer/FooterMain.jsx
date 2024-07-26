import React, { useEffect } from "react";
import MianFooterInfo from "./MainFooterColumns/MianFooterInfo";
import FooterCategoriesInfo from "./MainFooterColumns/FooterCategoriesInfo";
import MainFooterLinks from "./MainFooterColumns/MainFooterLinks";
import MainFooterAppDownload from "./MainFooterColumns/MainFooterAppDownload";
import MainFooterTags from "./MainFooterColumns/MainFooterTags";

const FooterMain = () => {
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <MianFooterInfo/>
          <FooterCategoriesInfo/>
          <MainFooterLinks/>
          <MainFooterAppDownload/>
          <MainFooterTags/>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
