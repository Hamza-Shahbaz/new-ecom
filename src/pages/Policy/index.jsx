import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Policy = ({ head }) => {
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  let content = null;

  const openEmailClient = () => {
    const email = siteSettingsData?.site_email;
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  switch (head) {
    case "PrivacyPolicy":
      content = (
        <div className="container policy">
          <h2>Privacy Policy!</h2>

          <h5>We respect your privacy!</h5>
          <p>
            Any and all the information collected on this site will be kept
            strictly confidential and will not be sold, reused, rented,
            disclosed, or loaned!
          </p>
          <p>
            Any information you give us will be held with the utmost care and
            will not be used in ways that you have not consented to. We do not
            use your information to send any unsolicited emails, or give your
            information to third parties for the purposes of sending unsolicited
            emails. You do not need to opt in for email announcements in order
            to place an order on this site. However, you will receive emails
            pertaining to specific orders you place.
          </p>
          <p>
            If you have any questions, please feel free to call or email us. You
            may also use the Contact Us form on this site.
          </p>
          <h3>What information do we collect?</h3>
          <p>
            When you visit{" "}
            <Link className="highlightedText" to="/">
              Kingsdistributor.com
            </Link>{" "}
            You may provide us with two types of information: personal
            information you knowingly choose to disclose that is collected on an
            individual basis and Web site use information collected on an
            aggregate basis as you and others browse{" "}
            <Link className="highlightedText" to="/">
              Kingsdistributor.com .
            </Link>{" "}
          </p>
          <h4>Personal Information You Choose to Provide</h4>
          <p>
            Credit Card Information.
            <br />
            If you choose to purchase products from us, you need to give
            personal information and authorization so that we can obtain
            information from various credit services. For example, you may need
            to provide the following information:
          </p>
          <ul>
            <li>Name</li>
            <li>Billing address</li>
            <li>Shipping address</li>
            <li>Email address</li>
            <li>Credit card number</li>
            <li>Home or business phone number</li>
            <li>Other personal information (as reasonably necessary)</li>
          </ul>
          <p>
            This information is used only for those products you choose to
            purchase and for servicing your orders.
          </p>
          <p>
            Email Information.
            <br />
            When you order from our Web site, automated emails are sent to you
            during the fulfillment and shipping processes. Occasionally, we may
            need to contact you via email with questions about your order or the
            information you provided.
          </p>
          <p>
            If you become a member or opt in to our mailing list, we may notify
            you about important changes to our Web site, new products, and
            special offers we think you will find valuable. The lists used to
            send you offers are developed and managed under our traditional
            corporate standards designed to safeguard the security and privacy
            of your personal information. As a member, you will be given the
            opportunity to notify us of your desire not to receive these offers.
          </p>
          <p>
            If you choose to correspond further with us through email, we may
            retain the content of your email messages together with your email
            address and our responses. We provide the same protections for these
            electronic communications that we employ in the maintenance of
            information received by mail and telephone.
          </p>
        </div>
      );
      break;
    case "ReturnPolicy":
      content = (
        <div className="container policy">
          <h2>Return Policy!</h2>
          <p>
            In order to return merchandise, you must obtain an RMA number from
            our customer service department.
          </p>
          <p>
            You may return any unopened merchandise (except perfume mini’s, Bath
            Body) in its original condition, including original packaging and
            packing slip within 14 days of receipt and you will receive a full
            refund less shipping and any gift wrapping charges.
          </p>
          <p>
            We charge a 20% restocking fee for any merchandise not returned in
            its original condition and packaging.
          </p>
          <p>
            Any shipping cost you incur to return the product to us will not be
            refunded.
          </p>
          <p>
            Shipping cost is non-refundable for undelivered, unclaimed or
            returned packages, unless we made an error.
          </p>
          <p>
            We do not offer refunds or exchanges on Perfume Mini’s and Bath &
            Body items due to health reasons. Please make your selections
            carefully.
          </p>
          <p>
            We require the following information to process your return. (If
            this information is not included, we will be unable to process your
            return).
          </p>
          <ul>
            <li>RMA number</li>
            <li>Full name and address</li>
            <li>Phone number</li>
            <li>E-mail address</li>
            <li>Packing slip</li>
            <li>Original Order Confirmation Number</li>
            <li>Your reason for returning the merchandise</li>
          </ul>
          <p>
            Please return the merchandise to:
            <Link className="highlightedText" to="/">
              <br />
              Kingsdistributor.com
              <br />
            </Link>
            {siteSettingsData && siteSettingsData?.physical_address
              ? siteSettingsData?.physical_address
              : null}
          </p>

          <p>
            Tel:{" "}
            {siteSettingsData && siteSettingsData?.site_contact_no ? (
              <Link
                className="highlightedText"
                to={`tel:${siteSettingsData?.site_contact_no}`}
              >
                {siteSettingsData?.site_contact_no}
              </Link>
            ) : null}
          </p>

          <p>
            Email: {""}
            <Link className="highlightedText" onClick={openEmailClient}>
              {siteSettingsData && siteSettingsData?.site_email
                ? siteSettingsData?.site_email
                : null}
            </Link>
          </p>

          <p>
            All returns must be shipped back to Kingsdistributor using a
            traceable courier. (UPS, FedEx, USPS Delivery Confirmation)
          </p>
          <p>
            Any package that has not been received by Kingsdistributor and
            tracking information cannot be provided, will be the sole
            responsibility of the shipper.
          </p>
          <p>
            <strong>
              Please allow up to 7 business days to process your return or
              exchange.
            </strong>
          </p>
          <p>
            If your package is returned to Kingsdistributor marked as “refused”,
            “unclaimed”, or “undeliverable”, and you would like to have it
            re-shipped, we will unfortunately need to charge a $8.95 re-shipping
            fee.
          </p>
          <h2>Cancel Your Order</h2>
          <p>
            Since we use automated order processing and warehouse systems, we
            are unable to cancel or modify your order once it has been
            submitted. If you have any other questions, please contact a
            Customer Care Representative.
          </p>
          <p>
            Contact us at:{" "}
            <b className="highlightedText" onClick={openEmailClient}>
              {siteSettingsData && siteSettingsData?.site_email
                ? siteSettingsData?.site_email
                : null}{" "}
            </b>
            ||{" "}
            <Link
              className="highlightedText"
              to={`tel:${siteSettingsData?.site_contact_no}`}
            >
              {siteSettingsData && siteSettingsData?.site_contact_no
                ? siteSettingsData?.site_contact_no
                : null}
            </Link>
          </p>
          <p>Monday-Friday: 9:00am-5:00pm EST</p>
          <h2>Claims</h2>
          <p>
            You must notify us within 7 days from the date of your order if you
            did not receive it.
          </p>
        </div>
      );
      break;
    case "Aboutus":
      content = (
        <div className="container policy">
          <h2>About Us</h2>
          <p>
            <Link className="highlightedText" to="/">
              Kingsdistributor.com
            </Link>{" "}
            was created to provide the public with access to the largest
            inventory of genuine, brand name fragrances like Burberry, Alfred
            Dunhill, Creed, Guess, D&G and many more at low prices. We have
            shipped over 20 million packages and have sold over $1 billion in
            beauty products. We carry 17,000 genuine, brand name fragrances, all
            at discount prices. We offer Free Shipping in U.S. with a minimum
            order.
          </p>
          <h2>Product Guarantee</h2>
          <p>
            All of the products showcased throughout{" "}
            <Link className="highlightedText" to="/">
              Kingsdistributor.com
            </Link>{" "}
            are 100% original brand names. We only carry genuine name brand
            perfumes and colognes. Absolutely NO imitations or knock-offs.
          </p>
          <h2>Our Commitment</h2>
          <p>
            We work hard to ensure that your shopping experience is completely
            satisfying and enjoyable. Along with great selection and prices, our
            number one concern is offering superior customer service and our
            staff is here to serve you. If you have any questions or concerns,
            please feel free to contact us at{" "}
            <p className="highlightedText" onClick={openEmailClient}>
              {(!siteSettingsData && siteSettingsData?.site_email
                ? siteSettingsData?.site_email
                : "")}
            </p>
          </p>
          <p>
            <Link className="highlightedText" to="/">
              Kingsdistributor.com
            </Link>{" "}
            is a distributor of genuine brand name fragrances.
          </p>
          <p>
            Please note that we are not the manufacturer of any of the products
            we carry.
          </p>
        </div>
      );
      break;
    default:
      content = null;
  }

  return content;
};

export default Policy;
