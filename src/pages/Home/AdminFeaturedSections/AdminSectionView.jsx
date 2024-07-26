import React from "react";
import AdminSectionElement from "./AdminSectionElement";
import { Link } from "react-router-dom";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const AdminSectionView = ({ sectionInfo }) => {
  return (
    <>
      {sectionInfo.sub_sections &&
        sectionInfo.sub_sections.length > 0 && (
          <section className="explore">
            <div className="container">
              <div className="border-line">
                <div className="row align-items-center">
                  <SectionHeader title={sectionInfo.section_title} navigationLink={`category/${sectionInfo.category_slug}`} />
                </div>
                <div className="row align-items-center">
                  {sectionInfo.sub_sections.map((category, index) => {
                    return (
                      <AdminSectionElement element={category} key={index} />
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
    </>
  );
};

export default AdminSectionView;
