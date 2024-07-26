import React, { useEffect, useState } from "react";
import { fetchCategoriesRequest } from "../../../../redux/actions/CategoryActions";
import { useDispatch, useSelector } from "react-redux";
import CategoryMenuList from "./CategoryMenuList";
import toggleImage from "../../../../assets/images/toggle-img.png";
import CategoriesNavBar from "../../../CategoriesNavBar/CategoriesNavBar";

const CategoryMenuDropdown = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const headerData = useSelector(
    (state) => state?.categoryReducerData.categories
  );

  useEffect(() => {
    if (!headerData || headerData.length === 0) {
      dispatch(fetchCategoriesRequest());
    }
  }, [headerData, dispatch]);

  const handleCloseOffCanvas = () => {
    if (show) {
      setShow(false);
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      // Close off-canvas when the screen size changes
      handleCloseOffCanvas();
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [show]);

  if (!headerData.length || headerData.length < 0) {
    return <></>;
  }
  
  return (
    <div className={`all-category ${showMenu ? "show" : ""}`}>
      <div className="dropdown d-xl-block d-lg-block d-none">
        <button
          className="btn btn-category"
          type="button"
          aria-expanded={showMenu}
          data-bs-toggle="dropdown"
          id="dropdownMenuButton1"
          onMouseOver={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          All Category
          <i className="fa fa-angle-down" />
        </button>
        <ul
          className={`dropdown-menu w-100 ${showMenu ? "show" : ""}`}
          aria-labelledby="dropdownMenuButton"
          onMouseOver={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
          style={{
            position: "absolute",
            inset: "-5px auto auto 0px",
            margin: "0px",
            transform: "translate(0px, 50px)",
          }}
        >
          {headerData?.length > 0 && (
            <CategoryMenuList categories={headerData} setShowMenu={() => setShowMenu(false)} />
          )}
        </ul>
      </div>
      <nav>
        <button className="navbar-toggler d-xl-none d-lg-none d-block" onClick={() => setShow(!show)}>
          <img src={toggleImage} alt="toggleCategory" />
        </button>
      </nav>
      {show && (
        <div className="offcanvas offcanvas-start show">
          <CategoriesNavBar
            onHide={() => setShow(false)}
            show={show}
            buttonOnClick={() => setShow(false)}
            modalFalse={setShow}
            setShow={setShow}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryMenuDropdown;
