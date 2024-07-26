import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const [ratingStar, setRatingStar] = useState(rating);

  return (
    <div className="d-flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <div key={index}>
            <label className="star-rating" style={{ paddingRight: "2px" }}>
              <input
                type="radio"
                value={currentRating}
                style={{ display: "none" }}
                // onClick={() => setRatingStar(currentRating)}
              />
              {ratingStar >= currentRating ? (
                <FaStar size={16} color="#ff9017" />
              ) : (
                <FaRegStar size={16} style={{ color: "#ff9017", stroke: "#ff9017" }} />
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
