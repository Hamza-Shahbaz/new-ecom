import React from "react";
import { Link } from "react-router-dom";
import cartImage from "../../../assets/images/shoppingcart.png";
import favoriteImage from "../../../assets/images/heart.png";
import userImage from "../../../assets/images/user.png";
import SearchInput from "./SearchInput/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { handleRemoveIconId } from "../../../redux/actions/AuthAction";
import logoForHeader from "../../../assets/images/logo.gif";

const CenterHeader = () => {
  const dispatch = useDispatch();
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );
  const favourites = useSelector((state) => state?.handleCartItem?.favorites);
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  return (
    <section className="center-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-4 col-7 order-1 order-xl-1 order-lg-1 order-md-1">
            <div className="top-logo">
              <nav className="navbar-expand-lg">
                <Link
                  to={"/"}
                  className="navbar-brand"
                  onClick={() => {
                    dispatch(handleRemoveIconId("v-pills-dashboard"));
                  }}
                >
                  {siteSettingsData ? (
                    <img
                      src={siteSettingsData?.site_logo || logoForHeader}
                      onError={(event) => {
                        event.target.src = logoForHeader;
                        event.onerror = null;
                      }}
                      style={{ height: "50px", width: "160px" }}
                    />
                  ) : null}
                </Link>
              </nav>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-5 col-12 order-3 order-xl-2 order-lg-2 order-md-2">
            <SearchInput />
          </div>
          <div className="col-xl-2 col-lg-2 col-md-3 col-5 order-2 order-xl-3 order-lg-3 order-md-3">
            <div className="top-icon">
              <ul className="d-flex list-unstyled justify-content-end align-items-center mb-0">
                <li className="right">
                  {" "}
                  <Link to="/my-cart">
                    <img src={cartImage} alt="cart" />
                    {cartData.length > 0 && <span>{cartData.length}</span>}
                  </Link>
                </li>
                <li className="right px-1">
                  {" "}
                  <Link to="/my-favorites">
                    <img src={favoriteImage} alt="fav" />
                    {favourites.length > 0 && <span>{favourites.length}</span>}
                  </Link>
                </li>
                {loginData?.token ? (
                  // <Link
                  //   role="button"
                  //   className="btn p-0 userInitialsStyle border-0 "
                  // >
                  //   <div className="userInitials mx-1">
                  //     {loginData?.first_name?.[0]}
                  //     {loginData?.last_name?.[0]}
                  //   </div>
                  // </Link>
                  <li className="right">
                    <Link
                      to="/my-account"
                      className="btn p-0 userInitialsStyle border-0 "
                    >
                      <div className="userInitials">
                        {loginData?.first_name?.[0]?.toUpperCase() || null}
                        {loginData?.last_name?.[0]?.toUpperCase() || null}
                      </div>
                    </Link>
                  </li>
                ) : (
                  <li className="right">
                    <Link to="/login">
                      <img src={userImage} alt="user" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CenterHeader;
