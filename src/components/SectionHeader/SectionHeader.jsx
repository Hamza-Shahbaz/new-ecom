import React from "react";
import { Link } from "react-router-dom";
import TextShortener from "../DynamicText/TextShortner";

const SectionHeader = ({ title, navigationLink, viewall = null }) => {
  return (
    <>
      <div className="col-xl-10 col-lg-10 col-md-10 col-7">
        <div className="left">
          <TextShortener text={title} textLimit={40} component={"h2"} tooltipColor={"#77878f"} className={""}/>
        </div>
      </div>
      <div className="col-xl-2 col-lg-2 col-md-2 col-5">
        <div className="right">
          <Link to={navigationLink}>
          {viewall === null ? (
            <span>
              View All
              <i className="fa fa-angle-right ms-2" />
            </span>
          ) : (
            ''
          )}
            {/* View All  */}
          </Link>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12">
        <hr className="hr-new" />
      </div>
    </>
  );
};

export default SectionHeader;
