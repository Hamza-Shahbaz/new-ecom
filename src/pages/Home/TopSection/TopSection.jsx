import React, { lazy, Suspense } from "react";
import TopSectionSlider from "./TopSectionSlider";
import loader from "../../../assets/images/loader.gif";

// const TopSectionSlider = lazy(() => import("./TopSectionSlider"));

const TopSection = () => {
  return (
    <section className="top-section">
      <div className="container">
        <div className="row">
          <TopSectionSlider />
        </div>
      </div>
    </section>
  );
};

export default TopSection;

const Loader = () => (
  <div style={loaderStyle}>
    <img src={loader} alt="Loading..." style={{ width: "100px" }} />
  </div>
);

const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};
