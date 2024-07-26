import React from "react";
import { Link } from "react-router-dom";

const FilterByTags = ({ selecetdTag, setSelecetdTag, filterData }) => {
  const handleCheck = (tag) => {
    setSelecetdTag({type : "tag", payload : tag})
  };

  const transformedTags = filterData;
  return (
    <>
      {transformedTags?.length > 0 && (
        <div className="popular-tags">
          <span>Popular Tag</span>
          <div className="tag" key={Math.random()}>
            {transformedTags.map((tag) => {
                return <Link key={tag.tag_id} onClick={(e) => {e.preventDefault();handleCheck(tag)}} className={selecetdTag.some((curr_tag) => tag.tag_title === curr_tag.tag_title) ? "active" : ""}>{tag.tag_title}</Link>
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterByTags;
