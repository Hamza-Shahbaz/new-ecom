import React from "react";
import CategoryMenuDropdown from "./CategoryMenuDropdown/CategoryMenuDropdown";
import { Link, useNavigate } from "react-router-dom";
import locationImage from "../../../assets/images/map-icon.png";
import customerSupportImage from "../../../assets/images/deals.png";
import infoImage from "../../../assets/images/info-icon.png";
import phoneImage from "../../../assets/images/phone-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGlobalId,
  handleIconId,
} from "../../../redux/actions/AuthAction";

const BottomHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  return (
    <section className="bottom-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-8 col-5">
            <div className="left">
              <CategoryMenuDropdown />
              <div className="support">
                <div className="support-inner">
                  <img src={customerSupportImage} alt="helpline" />
                  <span>
                    <Link to={"/today-deals"}>Today's Deals</Link>
                  </span>
                </div>
                <div
                  id="track-id"
                  className="support-inner"
                  onClick={(event) => {
                    const trackId = event.currentTarget.id;
                    if (loginData?.token) {
                      navigate("/my-account");
                      dispatch(handleGlobalId(trackId));
                      dispatch(handleIconId("v-pills-track"));
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  <img src={locationImage} alt="trackImage" />
                  <span>
                    <Link>Track Order</Link>
                  </span>
                </div>
                <div className="support-inner">
                  <img src={infoImage} alt="info" />
                  <span>
                    <Link to={"/help"}>Need Help</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-7">
            <div className="right">
              <img src={phoneImage} alt="phone" className="me-2" />
              <Link to={"/"}>
                <span>{siteSettingsData?.site_contact_no}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomHeader;
