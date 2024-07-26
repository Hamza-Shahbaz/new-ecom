import React from "react";
import {
  handleCheckoutPath,
  handleDashboardPath,
  handleGlobalId,
  handleIconId,
  handlePath,
  handleSelectedAddressId,
  handleSetAddAddress,
} from "../../../../redux/actions/AuthAction";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import dashboardIcon1 from "../../../../assets/images/DashboardIcon1.png";
import dashboardIcon2 from "../../../../assets/images/DashboardIcon2.png";
import dashboardIcon3 from "../../../../assets/images/DashboardIcon3.png";
import TextShortener from "../../../../components/DynamicText/TextShortner";

function UserInfo({ infoHeading, type, location }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  const dashboardData = useSelector(
    (state) => state.dashboardReducerData?.dashboardData
  );

  const address = dashboardData?.shipping_address?.[0];

  return (
    <>
      <div className="top-heading">
        <span>{infoHeading}</span>
      </div>

      {type === "Account Info" ? (
        <div
          className="info-inner "
          style={{
            minHeight: "270px",
          }}
        >
          <div className="d-flex align-items-center pb-3">
            <FaUserCircle
              style={{ width: "50px", height: "45px", marginRight: "6px" }}
            />

            <div className="mb-0">
              <span>
                {(loginData &&
                  loginData?.first_name + " " + (loginData?.last_name || "")) ||
                  ""}
              </span>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center mt-2">
            <span style={{ paddingRight: "13px" }}>Email:</span>
            <TextShortener
              text={(loginData && loginData?.email) || null}
              textLimit={26}
              component={"p"}
              className={"ms-2 toolTipClass"}
              tooltipStyle={{
                color: "white",
                fontSize: "14px",
                fontWeight: 400,
              }}
            />
          </div>

          <div className="d-flex align-items-center mt-3">
            <span>Phone:</span>
            <p className="ms-2">
              {(loginData && (loginData?.phone_number || loginData?.phone)) ||
                null}
            </p>
          </div>
          <div
            onClick={() => {
              dispatch(handleIconId("v-pills-settings"));
            }}
          >
            <Link id="edit-account-btn" className="btn btn-theme-outline mt-3">
              EDIT ACCOUNT
            </Link>
          </div>
        </div>
      ) : type === "Billing Info" ? (
        <div
          className="info-inner"
          style={{
            minHeight: "270px",
          }}
        >
          {address?.street_address && address?.phone_number ? (
            <>
              <span className="mb-2 d-block">
                {(dashboardData && address?.name) ||
                  address?.first_name + " " + (address?.last_name || "") ||
                  ""}
              </span>

              <TextShortener
                text={
                  (dashboardData &&
                    address &&
                    (address?.street_address
                      ? `${address?.street_address}, ${address?.city}, ${address?.state}, ${address?.country}`
                      : "")) ||
                  ""
                }
                textLimit={70}
                component={"p"}
                className={"mb-2"}
                tooltipStyle={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              />

              <div className="d-flex align-items-center mt-3">
                <span style={{ paddingRight: "13px" }}>Email:</span>

                <TextShortener
                  text={(dashboardData && address?.email) || null}
                  textLimit={26}
                  component={"p"}
                  className={"ms-2"}
                  tooltipStyle={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                />
              </div>
              <div className="d-flex align-items-center mt-3">
                <span>Phone:</span>
                <p className="ms-2">
                  {dashboardData && address?.phone_number
                    ? address.phone_number
                    : null}
                </p>
              </div>

              <div
                id="edit-address-id"
                onClick={(event) => {
                  const addressId = event.currentTarget.id;
                  navigate("/my-account");
                  dispatch(handleGlobalId(addressId));
                  dispatch(handleIconId("v-pills-address"));
                  dispatch(handleSetAddAddress(true));
                  dispatch(handleSelectedAddressId(address?.address_id));
                  dispatch(handlePath(location || "/my-account"));
                  dispatch(handleDashboardPath(location || "/my-account"));
                }}
              >
                <Link
                  id="edit-address-btn"
                  className="btn btn-theme-outline mt-3"
                >
                  EDIT ADDRESS
                </Link>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <span style={{ fontSize: "18px", color: "#219ebc" }}>
                No address Found
              </span>
            </div>
          )}
        </div>
      ) : type === "Order Data" ? (
        <>
          <div className="total-orders">
            <img src={dashboardIcon1} alt="" style={{ width: "55px" }} />
            <div className="mb-0">
              <span>
                {(dashboardData &&
                  dashboardData?.orders_count &&
                  dashboardData?.orders_count?.total) ||
                  "0"}
              </span>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="pending-orders">
            <img src={dashboardIcon2} alt="" style={{ width: "55px" }} />
            <div className="mb-0">
              <span>
                {(dashboardData &&
                  dashboardData?.orders_count &&
                  dashboardData?.orders_count?.unshipped) ||
                  "0"}
              </span>
              <p>Unshipped Orders</p>
            </div>
          </div>
          <div className="completed-orders">
            <img src={dashboardIcon3} alt="" style={{ width: "55px" }} />
            <div className="mb-0">
              <span>
                {(dashboardData &&
                  dashboardData?.orders_count &&
                  dashboardData?.orders_count?.shipped) ||
                  "0"}
              </span>
              <p>Completed Orders</p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default UserInfo;
