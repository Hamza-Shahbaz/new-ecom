import React from "react";
import TextShortener from "../../../../components/DynamicText/TextShortner";
import CustomLoader from "../../../../components/Toast/CustomLoader";

function AddressItem({
  username,
  address,
  phone,
  onClickremoveAddress,
  removeDataloading,
  onClickEditAddress,
}) {
  return (
    <div className="col-xl-4 col-lg-4 col-md-12">
      <div
        className="billing-info "
        style={
          {
            // backgroundColor: "pink",
          }
        }
      >
        <div
          className="info-inner"
          style={{
            borderTop: "1px solid #e4e7e9",
            borderRadius: "8px",
            minHeight: "250px",
          }}
        >
          <span className="mb-2 d-block" style={{ fontSize: "18px" }}>
            {username}
          </span>

          <TextShortener
            text={address}
            textLimit={75}
            component={"p"}
            className={"mb-2 toolTipClass"}
            tooltipStyle={{
              color: "white",
              fontSize: "14px",
              fontWeight: 400,
            }}
          />

          <div className="d-flex align-items-center mt-3">
            <span>Phone:</span>
            <p className="ms-2">{phone}</p>
          </div>

            <div
              id="edit-address-btn"
              className="btn btn-theme-outline mt-3 "
              onClick={onClickEditAddress}
              style={{padding: '8px 22px'}}
            >
              EDIT
            </div>

            <div
              id="edit-address-btn"
              className="btn btn-theme-outline mt-3 buttonStyleAddress"
              onClick={onClickremoveAddress}
              style={{padding: '8px 22px'}}

            >
              {removeDataloading ? (
                <CustomLoader
                  size={10}
                  style={{ padding: "10px 11px" }}
                  color={"#ffb703"}
                />
              ) : (
                <>REMOVE</>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default AddressItem;
