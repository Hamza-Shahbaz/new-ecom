import React from "react";

function OrderActivityItem({orderMessage, duration , image}) {
  return (
    <>
      <div className="activity-sec">
        <img src={image} alt="" style={{width: '50px'}}/>
        <div className="mb-0">
          <span>
            {orderMessage}
          </span>
          <p>{duration}</p>
        </div>
      </div>
    </>
  );
}

export default OrderActivityItem;
