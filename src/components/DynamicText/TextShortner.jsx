import React, { useState, useRef } from "react";

const TextShortener = ({
  text,
  textLimit,
  component,
  tooltipColor,
  className,
  tooltipClassname,
  tooltipStyle,
  imgSrc,
  parentClassName,
  onError,
  textStyle,
}) => {
  const tooltipId = Math.random().toString(36).substring(7);
  const Component = component;
  const timeoutRef = useRef();

  const [active, setActive] = useState(false);

  const showTip = () => {
    timeoutRef.current = setTimeout(() => {
      setActive(true);
    }, 400);
  };

  const hideTip = () => {
    clearTimeout(timeoutRef.current);
    setActive(false);
  };

  if (component === "img") {
    return (
      <div
        className={`Tooltip-Wrapper ${parentClassName || ""}`}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
      >
        <img src={imgSrc} onError={onError} className={className} alt="category" />
        {active && (
          <div className={`Tooltip-Tip top ${tooltipClassname}`} style={{ ...tooltipStyle }}>
            {text}
          </div>
        )}
      </div>
    );
  }

  if (component === "") {
    return text.length > textLimit ? (
      <div
        className="Tooltip-Wrapper"
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
      >
        {text.substring(0, textLimit - 3) + "..."}
        {active && (
          <div className={`Tooltip-Tip top ${tooltipClassname}`} style={{ ...tooltipStyle }}>
            {text}
          </div>
        )}
      </div>
    ) : (
      <>{text}</>
    );
  }

  return text?.length > textLimit ? (
    <Component
      className="Tooltip-Wrapper toolTipClass"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      style={{...textStyle}}
    >
      {text.substring(0, textLimit - 3) + "..."}
      {active && (
        <span style={{ ...tooltipStyle }} className={`Tooltip-Tip top ${tooltipClassname}`}>
          {text}
        </span>
      )}
    </Component>
  ) : (
    <Component style={{...textStyle}} className={className}>{text}</Component>
  );
};

export default TextShortener;
