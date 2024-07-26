import React from "react";

function TabLink({ Active, id, onClick, label, targetId, icon }) {
  return (
    <button
      className={`nav-link border-0 bg-white ${Active ? "active" : ""}`}
      id={`${id}-tab`}
      data-bs-toggle="pill"
      data-bs-target={targetId}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected="true"
      onClick={onClick}
    >
      <img src={icon} className="me-2" alt="" style={{ width: "20px" }} />
      {label}
    </button>
  );
}

export default TabLink;
