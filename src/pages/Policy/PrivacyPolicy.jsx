import React, { useEffect } from "react";
import Policy from ".";

function PrivacyPolicy() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);


  return (
    <div>
      <Policy head={"PrivacyPolicy"} />
    </div>
  );
}

export default PrivacyPolicy;
