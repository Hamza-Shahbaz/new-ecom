import React from "react";
import FAQItem from "./FAQItem";
import faqImage from "../../assets/images/faqs.jpg";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  const Questions = [
    {
      question: "How do I track my order?",
      answer:
        'Once your order has been shipped, you will receive an email with a tracking number and a link to the courier’s website where you can monitor the status of your shipment. You can also log into your account on our website and view the tracking information in the "Track Order" section.',
    },
    {
      question: "What is your return policy?",
      answer: (
        <>
          We offer a 30-day <Link to="/return-policy">return policy</Link> for
          most items. If you are not satisfied with your purchase, you can
          return the product within 30 days of receipt for a full refund or
          exchange according to our policy. Please ensure the item is in its
          original condition and packaging. For detailed instructions on how to
          return an item, please visit our <Link to="/return-policy">Returns & Exchanges page</Link>.
        </>
      ),
    },
    {
      question: "How can I contact customer support?",
      answer: (
        <>
          You can reach our customer support team through various channels. For
          immediate assistance, use our live chat feature available on our
          website. Alternatively, you can email us at{" "}
          {siteSettingsData?.site_email && (
            <strong>{siteSettingsData.site_email}</strong>
          )}{" "}
          or call us at{" "}
          {siteSettingsData?.site_contact_no && (
            <strong>{siteSettingsData.site_contact_no}</strong>
          )}
          . Our support team is available 24/7 to assist you.
        </>
      ),
    },
    {
      question: "Do Kings Distributer offer international shipping?",
      answer:
        "Yes, we offer international shipping to many countries worldwide. Shipping costs and delivery times vary depending on the destination. To find out if we ship to your country and for detailed shipping rates, please visit our Shipping Information page or contact our customer support team.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods for your convenience, including major credit and debit cards (Visa, MasterCard), and Google Pay.",
    },
    {
      question: "How can I change or cancel my order?",
      answer:
        "If you need to change or cancel your order, please contact our customer support team as soon as possible. We process orders quickly, so the sooner you reach out, the better. Once an order has been shipped, it cannot be canceled. However, you can return the item once you receive it.",
    },
  ];

  return (
    <section className="need-help">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-7 col-md-6">
            <div className="left-heading">
              <h1>Frequently Asked Questions</h1>
            </div>
            <div className="faqs-box">
              <div className="accordion">
                <div className="row justify-content-center">
                  {Questions.length > 0 &&
                    Questions.map((item, index) => (
                      <FAQItem item={item} key={index} />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-6">
            <div
              className="right-col d-flex justify-content-center"
              style={{ maxHeight: "80em", maxWidth: "38em" }}
            >
              <img
                src={faqImage}
                style={{ maxWidth: "27em", borderRadius: "15px" }}
                className="py-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
