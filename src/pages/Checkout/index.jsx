import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import CheckoutCart from "./CheckoutCart/CheckoutCart";

const Checkout = () => {
  const [activeSection, setActiveSection] = useState("Address");
  const [allowNavigation, setAllowNavigation] = useState(false);

  useEffect(() => {
    if (activeSection === "Address") {
      setAllowNavigation(false);
    }
  }, [activeSection]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <section className="checkout">
      <div className="container">
        <div className="row align-items-md-start">
          <CheckoutForm
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setAllowNavigation={setAllowNavigation}
          />
          <CheckoutCart
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            allowNavigation={allowNavigation}
          />
        </div>
      </div>
    </section>
  );
};

export default Checkout;
