import React from "react";

const TabContent = ({ id, content, onClick, isShow, arialabelledbyID }) => {
  return (
    <div
      onClick={onClick}
      className={`tab-pane fade ${isShow ? "show active" : ""}`}
      id={id}
      role="tabpanel"
      aria-labelledby={arialabelledbyID}
    >
      {content}
    </div>
  );
};

export default TabContent;
