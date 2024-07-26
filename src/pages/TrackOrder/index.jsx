import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TabLink from "../../components/Header/MyAccount/TabLink";
import trackOrderIcon from "../../assets/images/TrackOrderIcon.png";
import TabContent from "../../components/Header/MyAccount/TabContent";
import { handleIconId } from "../../redux/actions/AuthAction";
import TrackOrder from "../MyAccount/MyAccountContent/TrackOrder/TrackOrder";

const TrackOrderSection = () => {
  const dispatch = useDispatch();

  const iconID = useSelector((state) => state.tabsId?.id); 

  const handleTabClick = (id) => {
    dispatch(handleIconId(id));
  };

  const tabsLinkData = [
    {
      type: "tab",
      targetId: "#track",
      id: "v-pills-track",
      label: "Track Order",
      icon: trackOrderIcon,
    },
  ];

  const tabsContentData = [
    { id: "track", arialabelledbyID: "v-pills-track", content: <TrackOrder /> },
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
                  {tabsLinkData.map((tab, index) => (
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
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-8">
            <div className="account-body">
              <div className="tab-content" id="v-pills-tabContent">
                {tabsContentData.map((tab) => (
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

export default TrackOrderSection;
