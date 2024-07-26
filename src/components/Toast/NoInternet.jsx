import React, { useEffect } from "react";
import nointernet from "../../assets/images/NoInternetIcon.jpg";

function NoInternet() {
  return (
    <div className="container justify-content-center mt-4">
      <div className="d-flex justify-content-center ">
        <img src={nointernet} style={{ width: "300px", height: "300px" }} />
      </div>
      <div className="d-flex justify-content-center my-4 mb-2">
        <p className="reviewTextStyle">No Internet detected!</p>
      </div>
    </div>
  );
}

export default NoInternet;
