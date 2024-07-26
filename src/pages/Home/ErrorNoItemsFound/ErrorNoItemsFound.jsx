import React from "react";
import noProductImage from "../../../assets/images/no-products.png";
import { useSelector } from "react-redux";

const ErrorNoItemsFound = () => {
  const headerData = useSelector(
    (state) => state?.categoryReducerData.categories
  );
  return (
    <>
      {headerData?.length < 1 && (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ textAlign: "center", color: "#555" }}
        >
          <img
            src={noProductImage}
            alt="Sorry, no results found!"
            style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}
          />
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: "0" }}>
            Sorry, No Items Found
          </h1>
          <p style={{ fontSize: "1rem", marginTop: "10px", color: "#777" }}>
            Please try a different search or check back later.
          </p>
        </div>
      )}
    </>
  );
};

export default ErrorNoItemsFound;
