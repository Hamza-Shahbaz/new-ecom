import React from 'react'

const FilterByDiscount = ({ selecetdDiscount, setSelecetdDiscount, filterData }) => {
    const handleCheck = (discount) => {
      setSelecetdDiscount({type:"discount", payload:discount})
    };
  
    return (
    <>
    {filterData?.length > 0 && (
      <div className="price-range" style={{borderTop:"none"}} key={"discount"}>
        <span>Discount</span>
        {filterData.map((discount, index) => {
          return (
            <div className="form-check" key={"pricing" + index}>
              <input
                key={index + "input"}
                className="form-check-input"
                checked={selecetdDiscount?.includes(discount)}
                onChange={(e) => {
                  handleCheck(discount);
                }}
                type="checkbox"
              />
              <label key={index + "label"} className="form-check-label">
                {discount}
              </label>
            </div>
          );
        })}
      </div>
    )}
  </>
)
  };
export default FilterByDiscount