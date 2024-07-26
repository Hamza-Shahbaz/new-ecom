import React, { useEffect, useRef, useState } from 'react'

const sortOptions = ["Newest", "Low To High", "High To Low"]

const CategoriesSort = ({sortBy, setSortBy}) => {
    const [openSortingOptions, setOpenSortingOptions] = useState(false)

    const selectRef = useRef(null)

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
  return (
    <div className="sortby">
            <span className="text-black">Sort By :</span>
            <form>
              <select
                style={{ display: "none" }}
              >
                <option value={"Newest"}>Newest</option>
                <option value={"Low To High"}>Low To High</option>
                <option value={"High To Low"}>High To Low</option>
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
                <span className="current">{sortBy}</span>
                <ul className="list">
                  {sortOptions && sortOptions.map((item, index) => (
                    <li
                    className={`option ${sortBy === item ?  "selected focus" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortBy(item);
                      setOpenSortingOptions(false);
                    }}
                    key={index}
                  >
                    {item}
                  </li>
                  ))}
                </ul>
              </div>
            </form>
          </div>
  )
}

export default CategoriesSort