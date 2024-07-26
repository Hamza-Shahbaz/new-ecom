import React from "react";
import orderPlacedIcon from "../../../../assets/images/OrderPlacedIcon.png";
import onRoadIcon from "../../../../assets/images/OnRoadIcon.png";
import deliveredIcon from "../../../../assets/images/DeliveredIcon.png";
import cancelIcon from "../../../../assets/images/cancelIcon.png";
import { MdOutlineCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const TrackOrderTimeline = ({ status }) => {
  const steps = {
    2: ["pending"],
    1: ["pending", "unshipped"],
    3: ["pending", "unshipped", "shipped"],
    4: ["pending", "unshipped", "canceled"],
  };

  const activeSteps = steps[status] || [];

  return (
    <div className="order-processing mt-4">
      <div
        className={`step ${activeSteps.includes("pending") ? "active" : ""}`}
        style={{ position: "relative" }}
        id="pending"
      >
        {activeSteps.includes("pending") && status !== "canceled" && (
          <TiTick
            style={{
              position: "absolute",
              top: 0,
              marginLeft: "4px",
              marginTop: "4px",
            }}
            size={22}
            color="white"
          />
        )}
        <div className="icon">
          <img
            src={orderPlacedIcon}
            alt="Pending"
            style={{ width: "35px", marginTop: "45px" }}
            className="d-flex"
          />
        </div>
        <span className="mt-5 orderTextStyle">Pending</span>
      </div>
      <div
        className={`step ${activeSteps.includes("unshipped") ? "active" : ""}`}
        id="unshipped"
      >
        {activeSteps.includes("unshipped") && status !== "canceled" && (
          <TiTick
            style={{
              position: "absolute",
              top: 0,
              marginLeft: "4px",
              marginTop: "4px",
            }}
            size={22}
            color="white"
          />
        )}
        <div className="icon">
          <img
            src={onRoadIcon}
            alt="Unshipped"
            style={{ width: "35px", marginTop: "45px" }}
            className="d-flex"
          />
        </div>
        <span className="mt-5 orderTextStyle">Unshipped</span>
      </div>
      {!activeSteps.includes("canceled") && (
        <div
          className={`step ${activeSteps.includes("shipped") ? "active" : ""}`}
          id="shipped"
        >
          {activeSteps.includes("shipped") && status !== "canceled" && (
            <TiTick
              style={{
                position: "absolute",
                top: 0,
                marginLeft: "4px",
                marginTop: "4px",
              }}
              size={22}
              color="white"
            />
          )}
          <div className="icon">
            <img
              src={deliveredIcon}
              alt="Shipped"
              style={{ width: "35px", marginTop: "45px" }}
              className="d-flex"
            />
          </div>
          <span className="mt-5 orderTextStyle">Shipped</span>
        </div>
      )}

      {activeSteps.includes("canceled") && (
        <div className={"step active cancelled"} id="canceled">
          {activeSteps.includes("canceled") && (
            <RxCross2
              style={{
                position: "absolute",
                top: 0,
                marginLeft: "5px",
                marginTop: "5px",
              }}
              size={20}
              color="white"
            />
          )}
          <div className="icon">
            <img
              src={cancelIcon}
              alt="Shipped"
              style={{ width: "35px", marginTop: "45px" }}
              className="d-flex"
            />
          </div>
          <span className="mt-5 orderTextStyle">Cancelled</span>
        </div>
      )}
    </div>
  );
};

export default TrackOrderTimeline;
