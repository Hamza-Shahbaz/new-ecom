import React, { useEffect, useState } from "react";
import AdminSectionView from "./AdminSectionView";
import { BaseUrl } from "../../../utils/Api";

const AdminFeaturedSections = () => {
  
  const [adminSections, setAdminSections] = useState(null)

  useEffect(() => {
    async function getAdminDefinedSections() {
      const response = await fetch(BaseUrl+'get-sections')
      const newresposnse = await response.json()
      if(newresposnse.status) {
        setAdminSections(newresposnse.data.sections)
      }
    }
    getAdminDefinedSections()
  }, [])
  return (
    <>
        {adminSections?.length >0 && adminSections.map((section, index) => {
            return <AdminSectionView sectionInfo={section} key={section.section_id}/>
        })}
    </>
  );
};

export default AdminFeaturedSections;
