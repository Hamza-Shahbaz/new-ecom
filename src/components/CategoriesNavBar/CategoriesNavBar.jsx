import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logoForHeader from "../../assets/images/logo.png";
import { useState } from "react";
import TextShortener from "../DynamicText/TextShortner";

function CategoriesNavBar({
  show,
  onHide,
  buttonOnClick,
  modalFalse,
  setShow,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  const headerData = useSelector(
    (state) => state?.categoryReducerData.categories
  );

  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  return (
    <>
      <Offcanvas show={show} onHide={onHide}>
        <Offcanvas.Header className="mt-2 mx-1">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Link
              to="/"
              onClick={() => {
                setShow(!show);
              }}
            >
              {siteSettingsData ? (
                <img
                  src={siteSettingsData?.site_logo || logoForHeader}
                  onError={(event) => {
                    event.target.src = logoForHeader;
                    event.onerror = null;
                  }}
                  style={{ height: logoForHeader ? "30px" : "50px", width: "110px" }}
                />
              ) : null}
            </Link>
            <button
              className="btn-close text-reset"
              onClick={buttonOnClick}
            ></button>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item dropdown">
                <button
                  className="btn btn-category w-100 show"
                  onClick={(e) => setShowCategories(!showCategories)}
                >
                  All Category
                  <i className="fa fa-angle-down" />
                </button>
                {showCategories && headerData?.length > 0 && (
                  <ul
                    className="dropdown-menu show"
                    style={{
                      position: "relative",
                      inset: "-50px auto auto 0px",
                      margin: "0px",
                      transform: "translate(0px, 50px)",
                    }}
                  >
                    {headerData?.length > 0 && (
                      <DropdownSubMenu
                        categories={headerData}
                        categorySlug={""}
                        childNumber={0}
                        onHide={onHide}
                      />
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CategoriesNavBar;

function DropdownSubMenu({ categories, categorySlug, childNumber, onHide }) {
  return (
    <>
      {categories.map((category) => {
        if (category.sub_categories && category.sub_categories.length > 0) {
          return (
            <li
              className="dropdown-submenu"
              key={category.category_id}
              onClick={onHide}
            >
              <Link
                to={`/category/${category.category_slug}`}
                className="dropdown-item d-flex align-items-center justify-content-between"
              >
                <TextShortener
                  text={category.category_title}
                  textLimit={15}
                  component={""}
                />
                <i
                  className="fa fa-angle-right"
                  style={{ marginLeft: "10px" }}
                />
              </Link>
              {childNumber < 4 ? (
                <ul className="dropdown-menu">
                  <DropdownSubMenu
                    categories={category.sub_categories}
                    categorySlug={
                      childNumber == 0 ? category.category_slug : categorySlug
                    }
                    childNumber={childNumber + 1}
                    onHide={onHide}
                  />
                </ul>
              ) : (
                <ul className="dropdown-menu" style={{ display: "block" }}>
                  <li key={category.sub_categories[0].category_id}>
                    <Link
                      to={`/category/${categorySlug}`}
                      className="dropdown-item"
                    >
                      <TextShortener
                        text={"More Options"}
                        textLimit={15}
                        component={""}
                      />
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          );
        }
        return (
          <li key={category.category_id}>
            <Link
              to={`/category/${category.category_slug}`}
              className="dropdown-item d-flex align-items-center justify-content-between"
            >
              {category.category_title}
            </Link>
          </li>
        );
      })}
    </>
  );
}
