import React, { useState } from "react";
import minus from "../../assets/images/a-minus.png";
import plus from "../../assets/images/a-plus.png";
import TextShortener from "../../components/DynamicText/TextShortner";

const FAQItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="accordion-item">
        <h4 className="accordion-header">
          <button
            className={`accordion-button ${isExpanded ? "" : "collapsed"}`}
            onClick={(e) => setIsExpanded(!isExpanded)}
          >
            {item.question}
          </button>
        </h4>
        {isExpanded && <div className={`accordion-collapse ${isExpanded ? "" : ""}`}>
          <div className="accordion-body">
            <p>{item.answer}</p>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default FAQItem;
