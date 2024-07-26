import React from "react";
import { BeatLoader } from "react-spinners";

function CustomLoader({ size, className, style, color }) {
  return (
    <div className={className}>
      <BeatLoader
        size={size}
        color={color || "#708090"}
        style={style}
      />
    </div>
  );
}

export default CustomLoader;
