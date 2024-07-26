import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import image1 from "../../../assets/images/medal.png";
import image2 from "../../../assets/images/truck.png";
import image3 from "../../../assets/images/handshake.png";
import image4 from "../../../assets/images/headphones.png";
import image5 from "../../../assets/images/creditcard.png";
import { amoutRateConversion } from "../../../utils/Helper";

const ProductDescription = ({ productInfo }) => {
  const shippingInfo = useMemo(() => {
    const shippingInfo = Object.values(productInfo.shipping_template_options);
    return shippingInfo || [];
  }, [productInfo?.product_head?.[0]?.product_id]);

  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  return (
    <div
      className="tab-pane fade active show"
      id="product-description"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <div className="row mt-3">
        <div className="col-xl-6 col-lg-6 col-md-4">
          <h2>Description</h2>
          {/* <p className="desc" style={{ whiteSpace: "pre-wrap" }}>
            {text}
          </p> */}
          <DescriptionComponent description={productInfo?.product_head[0]?.ldesc} />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-4">
          <h2>Feature</h2>
          <div className="feature-info">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src={image1} alt="warranty" />
              <span>Free 1 Year Warranty</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src={image3} alt="moneyback" />
              <span>100% Money-back guarantee</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src={image4} alt="support" />
              <span>24/7 Customer support</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src={image5} alt="paymentsecurity" />
              <span>Secure payment method</span>
            </div>
          </div>
        </div>
        {shippingInfo.length > 0 && (
          <div className="col-xl-3 col-lg-3 col-md-4">
            <h2>Shipping Information</h2>
            {shippingInfo.map((item) => (
              <div
                className="shipping-info"
                key={item.shipping_template_option_id}
              >
                <p>
                  {`${item.shipping_title}: `}
                  <span>
                    {" "}
                    {`${item.transit_time}, ${amoutRateConversion(
                      item.shipping_price,
                      currencyRate,
                      currencyCode
                    )}`}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;

// const DescriptionComponent = ({ description }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   // Split the description into lines
//   const lines = description.split("\n");

//   // Function to toggle the expanded state
//   const toggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   // Determine if the description exceeds 7 lines or 300 characters
//   const exceedsLineLimit = lines.length > 5;
//   const exceedsCharLimit = description.length > 300;

//   // Determine if the show more button should be displayed
//   const shouldShowMoreButton = exceedsLineLimit || exceedsCharLimit;

//   // Content to display based on expansion state
//   const content = isExpanded
//     ? description
//     : description.length > 300
//     ? `${description.slice(0, 300)}...`
//     : lines.slice(0, 5).join("\n");

//   return (
//     <div>
//       <p className="desc" style={{ whiteSpace: "pre-wrap" }}>
//         {content}
//       </p>
//       {shouldShowMoreButton && (
//         <button onClick={toggleExpand} className="btn btn-theme-outline mt-1">
//           {isExpanded ? "Show Less" : "Show More"}
//         </button>
//       )}
//     </div>
//   );
// };

// const DescriptionComponent = ({ description }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   // Split the description into lines
//   const lines = description.split('\n');

//   // Function to toggle the expanded state
//   const toggleExpand = () => {
//     setIsExpanded(prev => !prev);
//   };

//   // Determine if the description exceeds 5 lines or 300 characters
//   const exceedsLineLimit = lines.length > 5;
//   const exceedsCharLimit = description.length > 300;

//   // Determine if the show more button should be displayed
//   const shouldShowMoreButton = exceedsLineLimit || exceedsCharLimit;

//   // Content to display based on expansion state
//   let content;
//   if (isExpanded) {
//     content = description;
//   } else {
//     // Calculate content based on line and character limit
//     let charCount = 0;
//     const truncatedLines = [];
//     for (let i = 0; i < lines.length; i++) {
//       if (charCount + lines[i].length > 300 || truncatedLines.length >= 5) {
//         break;
//       }
//       truncatedLines.push(lines[i]);
//       charCount += lines[i].length;
//     }
//     content = truncatedLines.join('\n');
//     if (description.length > charCount) {
//       content += '...';
//     }
//   }

//   return (
//     <div>
//       <p className="desc" style={{ whiteSpace: 'pre-wrap' }}>
//         {content}
//       </p>
//       {shouldShowMoreButton && (
//         <button onClick={toggleExpand} className="btn btn-theme-outline mt-1">
//           {isExpanded ? 'Show Less' : 'Show More'}
//         </button>
//       )}
//     </div>
//   );
// };

const DescriptionComponent = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [exceeds, setExceeds] = useState(false);

  // Split the description into lines
  const lines = description.split('\n');

  // Check if the description exceeds 300 characters
  const checkExceedsLimits = () => {
    if (description.length > 300) {
      setExceeds(true);
    } else {
      const first300Chars = description.slice(0, 300);
      const first300Lines = first300Chars.split('\n');
      if (first300Lines.length > 5) {
        setExceeds(true);
      } else {
        setExceeds(false);
      }
    }
  };

  // Use effect to check the limits initially
  useEffect(() => {
    checkExceedsLimits();
  }, [description]);

  // Content to display based on expansion state
  let content;
  if (isExpanded) {
    content = description;
  } else {
    // Get the first 300 characters
    const first300Chars = description.slice(0, 300);
    // Split them into lines
    const first300Lines = first300Chars.split('\n');
    // Limit to the first 5 lines
    const limitedLines = first300Lines.slice(0, 5);
    content = limitedLines.join('\n');
    // Add ellipsis if the content exceeds limits
    if (exceeds) {
      content += '...';
    }
  }

  return (
    <div>
      <p className="desc" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </p>
      {exceeds && (
        <button onClick={() => setIsExpanded(prev => !prev)} className="btn btn-theme-outline mt-1">
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

