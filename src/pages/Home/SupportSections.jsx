import React from "react";
import boxImage from "../../assets/images/s-1.png";
import cupImage from "../../assets/images/s-2.png";
import cardImage from "../../assets/images/s-3.png";
import earphoneImage from "../../assets/images/s-4.png";
import { useSelector } from "react-redux";

const SupportSections = () => {
  const headerData = useSelector(
    (state) => state?.categoryReducerData.categories
  );

  return (
    <>
      {headerData?.length > 0 && (
        <section className="support-sec">
          <div className="container">
            <div className="row">
              <div className='class="col-xl-12 col-lg-12 col-md-12"'>
                <div className="support-inner">
                  <div className="s-box">
                    <img src={boxImage} alt="dilvery" />
                    <div className="mb-0">
                      <p>Fasted Delivery</p>
                      <span>Delivery in 24/H</span>
                    </div>
                  </div>
                  <div className="s-box">
                    <img src={cupImage} alt="return" />
                    <div className="mb-0">
                      <p>24 Hours Return</p>
                      <span>100% money-back guarantee</span>
                    </div>
                  </div>
                  <div className="s-box">
                    <img src={cardImage} alt="payment" />
                    <div className="mb-0">
                      <p>Secure Payment</p>
                      <span>Your money is safe</span>
                    </div>
                  </div>
                  <div className="s-box">
                    <img src={earphoneImage} alt="dilvery" />
                    <div className="mb-0">
                      <p>Support 24/7</p>
                      <span>Live contact/message</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SupportSections;
