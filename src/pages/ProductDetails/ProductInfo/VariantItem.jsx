import React, { useEffect, useRef, useState } from "react";
import { GetColorName } from "hex-color-to-color-name";

const VariantItem = ({ variant, selectedVariant, setSelectedVariants }) => {
  const [openSortingOptions, setOpenSortingOptions] = useState(false);

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpenSortingOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  let selected = variant.values.filter((item) =>
    selectedVariant.includes(String(item.variant_id))
  )[0];
  if (variant.display_style_id === 4) {
    return (
      <div className="thumbnail">
        <p>
          {variant.key} : {selected?.variant_title}
        </p>
        <div
          className=" d-flex align-items-center justify-content-start flex-wrap"
          style={{ gap: "20px" }}
        >
          {variant.values.length > 0 &&
            variant.values.map((imageVariant, index) => {
              return (
                <img
                  src={imageVariant.image_path}
                  key={index}
                  className={`image-variant ${
                    imageVariant?.variant_id === selected?.variant_id
                      ? "image-variant-selected"
                      : ""
                  }`}
                  style={{ maxHeight: "100px" }}
                  onClick={(e) =>
                    setSelectedVariants((currentVariant) => {
                      let index = currentVariant.indexOf(
                        String(selected?.variant_id)
                      );
                      let tempVariants = [...currentVariant];
                      tempVariants[index] = String(imageVariant.variant_id);
                      return tempVariants;
                    })
                  }
                />
              );
            })}
        </div>
      </div>
    );
  }
  if (variant.display_style_id === 2) {
    return (
      <div className="color">
        <p>Color : {GetColorName(selected.variant_title)}</p>
        <div className="form-group d-flex">
          {variant.values.length > 0 &&
            variant.values.map((option, index) => (
              <div
                className="userInitials "
                style={{
                  background: `${option.variant_title}`,
                  cursor: "pointer",
                }}
                key={"color-variant" + index}
                onClick={(e) =>
                  setSelectedVariants((currentVariant) => {
                    let index = currentVariant.indexOf(
                      String(selected?.variant_id)
                    );
                    let tempVariants = [...currentVariant];
                    tempVariants[index] = String(option.variant_id);
                    return tempVariants;
                  })
                }
              ></div>
            ))}
        </div>
      </div>
    );
  }
  if (variant.display_style_id === 3) {
    return (
      <div className="color">
        <p>{variant.key}</p>
        <div className="form-group d-flex" style={{ gap: "10px" }}>
          {variant.values.length > 0 &&
            variant.values.map((option, index) => (
              <div
                className="button-variant"
                key={index}
                onClick={(e) =>
                  setSelectedVariants((currentVariant) => {
                    let index = currentVariant.indexOf(
                      String(selected?.variant_id)
                    );
                    let tempVariants = [...currentVariant];
                    tempVariants[index] = String(option.variant_id);
                    return tempVariants;
                  })
                }
              >
                {option?.variant_title}
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="size">
      <p>{variant.key}</p>
      <select style={{ display: "none" }}>
        {variant.values.length > 0 &&
          variant.values.map((option, index) => {
            return <option key={index}>{option?.variant_title}</option>;
          })}
      </select>
      <div
        className={`nice-select ${openSortingOptions ? "open" : ""}`}
        ref={selectRef}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpenSortingOptions(!openSortingOptions);
        }}
      >
        <span className="current">{selected?.variant_title}</span>
        <ul className="list">
          {variant.values.length > 0 &&
            variant.values.map((option, index) => {
              return (
                <li
                  key={`${index}${option.variant_id}`}
                  className={
                    option.variant_id === selected?.variant_id
                      ? "option selected focus"
                      : "option"
                  }
                  onClick={(e) =>
                    setSelectedVariants((currentVariant) => {
                      let index = currentVariant.indexOf(
                        String(selected?.variant_id)
                      );
                      let tempVariants = [...currentVariant];
                      tempVariants[index] = String(option.variant_id);
                      return tempVariants;
                    })
                  }
                >
                  {option.variant_title}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default VariantItem;
