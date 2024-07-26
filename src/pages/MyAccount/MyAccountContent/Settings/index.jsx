import React from "react";
import AccountInfoForm from "./AccountInfoForm";

function Settings() {
  return (
    <div className="settings">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <AccountInfoForm />
        </div>

        {/* <div className="col-xl-6 col-lg-6 col-md-6">
          <BillingAddressForm />
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6">
          <ShippingAddressForm />
        </div> */}
      </div>
    </div>
  );
}

export default Settings;
