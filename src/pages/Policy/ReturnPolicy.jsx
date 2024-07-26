import React, { useEffect } from "react";
import Policy from ".";

function ReturnPolicy() {
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div>
      <Policy head={"ReturnPolicy"} />
    </div>
  );
}

export default ReturnPolicy;
