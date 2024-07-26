import React, { useEffect, useState } from "react";
import techCompanyImage from "../../assets/images/company-logo.png";
import { useDispatch } from "react-redux";
import { subscribeToNewsletter } from "../../redux/actions/AuthAction";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const pattern = /^[^\s@]+@[a-zA-Z]+[^0-9@]+\.[cC][oO][mM]$/;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pattern.test(email)) {
      setError("Please enter a valid email");
    } else {
      dispatch(subscribeToNewsletter(email, setError, setSuccess , dispatch, setIsLoading));
    }
  };

  useEffect(() => {
    if(success) {
      setEmail("")
    }
  },[success])

  return (
    <section className="subscribe-sec">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8 col-md-10">
            <div className="center-heading">
              <h3>Subscribe to our newsletter</h3>
              {/* <p>
                Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
                libero et cursus. Donec non quam urna. Quisque vitae porta
                ipsum.
              </p> */}
              <form onSubmit={(e) => handleSubmit(e)}>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="subscribe-inner">
                  <input
                    type="text"
                    className="form-control subsTextStyle"
                    name="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error || success) {
                        setError("");
                        setSuccess("")
                      }
                    }}
                  />
                  <button type="submit" onSubmit={(e) => handleSubmit(e)} disabled={isLoading}>
                    Subscribe <i className="fa fa-arrow-right ms-2" />
                  </button>
                </div>
              </form>
              <img
                src={techCompanyImage}
                alt="tech-companies"
                className="w-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
