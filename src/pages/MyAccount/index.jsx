import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TabLink from "../../components/Header/MyAccount/TabLink";
import dashboardIcon from "../../assets/images/DashboardIcon.png";
import orderHistoryIcon from "../../assets/images/OrderHistoryIcon.png";
import trackOrderIcon from "../../assets/images/TrackOrderIcon.png";
import voucherIcon from "../../assets/images/voucher-icon.png";
import shoppingCartIcon from "../../assets/images/CartIcon.png";
import wishlistIcon from "../../assets/images/FavouriteIcon.png";
import addressIcon from "../../assets/images/Cards&AddIcon.png";
import settingIcon from "../../assets/images/SettingsIcon.png";
import changepassIcon from "../../assets/images/ChangePassIcon.png";
import logoutIcon from "../../assets/images/LogoutIcon.png";
import TabContent from "../../components/Header/MyAccount/TabContent";
import OrderHistory from "./MyAccountContent/OrderHistory/OrderHistory";
import BrowsingHistory from "./MyAccountContent/BrowsingHistory";
import ChangePassword from "./MyAccountContent/ChangePassword";
import {
  clearAddressData,
  handleDashboardData,
  handleIconId,
  handleRemoveGlobalId,
  handleRemoveIconId,
  handleSetAddAddress,
  logoutHandlerAction,
} from "../../redux/actions/AuthAction";
import {
  clearOrderDataHandler,
  clearShipAddressHandler,
} from "../../redux/actions/OrderAction";
import { clearCart } from "../../redux/actions/CategoryActions";
import Dashboard from "./MyAccountContent/Dashboard/Dashboard";
import Settings from "./MyAccountContent/Settings";
import loader from "../../assets/images/loader.gif";
import TrackOrder from "./MyAccountContent/TrackOrder/TrackOrder";
import { CLEAR_FAVORITES } from "../../redux/constant/constants";
import Coupons from "./MyAccountContent/Coupons";
import CardnAddress from "./MyAccountContent/Address/CardnAddress";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const iconID = useSelector((state) => state.tabsId?.id);
  const globalID = useSelector((state) => state.tabsId?.globalID);

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const [dataloading, setDataLoading] = useState(false);

  useEffect(() => {
    if (loginData?.token) {
      dispatch(
        handleDashboardData(
          loginData?.token,
          navigate,
          dispatch,
          setDataLoading
        )
      );
    }
  }, [loginData?.token]);

  useEffect(() => {
    if (!loginData?.token) {
      navigate("/login");
    }
  }, []);

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    dispatch(handleRemoveGlobalId());
  }, [globalID]);

  useEffect(() => {
    if (!globalID) {
      dispatch(handleRemoveIconId("v-pills-dashboard"));
    } else {
      dispatch(handleRemoveGlobalId());
    }
  }, []);

  const handleTabClick = (id) => {
    onTop();
    dispatch(handleIconId(id));
  };

  const clearCookies = () => {
    document.cookie = "__stripe_mid=;  path=/;";
    document.cookie = "__stripe_sid=;  path=/;";
    document.cookie = "mypswd=;  path=/;";
  };

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(logoutHandlerAction());
    clearCookies();
    dispatch(clearAddressData());
    dispatch(handleRemoveIconId("v-pills-dashboard"));
    dispatch(clearOrderDataHandler());
    dispatch(clearCart());
    dispatch(clearShipAddressHandler());
    dispatch({ type: CLEAR_FAVORITES });
  };

  if (dataloading) {
    return (
      <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center my-4">
        <img
          src={loader}
          alt="Loading Related Products"
          style={{ maxWidth: "100px" }}
        />
      </div>
    );
  }

  const tabsLinkData = [
    {
      type: "tab",
      targetId: "#dashboard",
      id: "v-pills-dashboard",
      label: "Dashboard",
      icon: dashboardIcon,
    },
    {
      type: "tab",
      targetId: "#order",
      id: "v-pills-order",
      label: "Order History",
      icon: orderHistoryIcon,
    },
    {
      type: "tab",
      targetId: "#voucher",
      id: "v-pills-voucher-tab",
      label: "Coupons",
      icon: voucherIcon,
    },
    {
      type: "tab",
      targetId: "#track",
      id: "v-pills-track",
      label: "Track Order",
      icon: trackOrderIcon,
    },
    {
      type: "link",
      to: "/my-cart",
      label: "Shopping Cart",
      icon: shoppingCartIcon,
    },
    {
      type: "link",
      to: "/my-favorites",
      label: "Wishlist",
      icon: wishlistIcon,
    },
    {
      type: "tab",
      targetId: "#address",
      id: "v-pills-address",
      label: "Address",
      icon: addressIcon,
    },
    // {
    //   type: "tab",
    //   targetId: "#browsing",
    //   id: "v-pills-browsing",
    //   label: "Browsing History",
    //   icon: browseHistoryIcon,
    // },
    {
      type: "tab",
      targetId: "#settings",
      id: "v-pills-settings",
      label: "Settings",
      icon: settingIcon,
    },
    {
      type: "tab",
      targetId: "#password",
      id: "v-pills-password",
      label: "Change Password",
      icon: changepassIcon,
    },
    {
      type: "link",
      label: "Logout",
      icon: logoutIcon,
      logoutHandler: logoutHandler,
      to: "/",
    },
  ];

  const tabsContentData = [
    {
      id: "dashboard",
      arialabelledbyID: "v-pills-dashboard",
      content: <Dashboard location={location?.pathname} />,
    },
    {
      id: "order",
      arialabelledbyID: "v-pills-order",
      content: <OrderHistory />,
    },
    {
      id: "voucher-tab",
      arialabelledbyID: "v-pills-voucher-tab",
      content: <Coupons />,
    },
    { id: "track", arialabelledbyID: "v-pills-track", content: <TrackOrder /> },
    {
      id: "address",
      arialabelledbyID: "v-pills-address",
      content: <CardnAddress location={location?.pathname} />,
    },
    {
      id: "browsing",
      arialabelledbyID: "v-pills-browsing",
      content: <BrowsingHistory />,
    },
    {
      id: "settings",
      arialabelledbyID: "v-pills-settings",
      content: <Settings />,
    },
    {
      id: "password",
      arialabelledbyID: "v-pills-password",
      content: <ChangePassword />,
    },
  ];

  return (
    <section className="user-account">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-4">
            <div className="account-tabs sticky-md-top">
              <div className="d-block align-items-start">
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {tabsLinkData.map((tab, index) =>
                    tab?.type === "tab" ? (
                      <TabLink
                        key={tab.id}
                        targetId={tab.targetId}
                        id={tab.id}
                        to={tab.targetId}
                        label={tab.label}
                        icon={tab.icon}
                        Active={iconID === tab.id}
                        onClick={() => handleTabClick(tab.id)}
                      />
                    ) : (
                      <Link
                        key={index}
                        to={tab.to}
                        className="nav-link"
                        type="button"
                        onClick={tab.logoutHandler}
                      >
                        <img
                          src={tab.icon}
                          className="me-2"
                          alt={tab.label}
                          style={{ width: "20px" }}
                        />
                        {tab.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-8">
            <div className="account-body">
              <div className="tab-content" id="v-pills-tabContent">
                {tabsContentData
                  .filter((item) => iconID === `v-pills-${item.id}`)
                  .map((tab) => (
                    <TabContent
                      key={tab.id}
                      id={tab.id}
                      arialabelledbyID={tab.arialabelledbyID}
                      content={tab.content}
                      isShow={iconID === `v-pills-${tab.id}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
