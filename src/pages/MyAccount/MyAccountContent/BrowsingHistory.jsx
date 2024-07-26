import React from "react";

function BrowsingHistory() {
  return (
    <div className="browsing-history">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="browsing-inner">
            <div className="browsing-top">
              <span>BROWSING HISTORY</span>
              <form>
                <div className="form-check form-switch">
                  <label className="form-check-label" 
                  // htmlFor="turn"
                  >
                    Turn Browsing History on/off
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="turn"
                  />
                </div>
              </form>
            </div>
            <div className="browsing-search">
              <form
                method="POST"
                action=""
                className="needs-validation"
                noValidate=""
              >
                <div className="row">
                  <div className="col-xl-6 col-md-6">
                    <div className="mb-4 position-relative">
                      <i className="fa fa-search" />
                      <input
                        type="text"
                        className="form-control ps-5"
                        name="name"
                        placeholder="Search in browsing history"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    <div className="mb-4">
                      <input type="date" className="form-control" name="name" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="browsing-product">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="browsing-sec">
                    <div className="top-heading">
                      <span>03 APR, 2024</span>
                    </div>
                    <div className="info-inner pb-1">
                      <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6">
                          <div className="product-card">
                            <div className="product-img">
                              <a href="product-detail.php">
                                <span className="product-badge">Hot</span>
                                <img
                                  src="../assets/images/product-1.png"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="desc">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-0">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <span>4.5</span>
                                </div>
                              </div>
                              <span className="price">
                                $99.50 <del>$1128.00</del>
                              </span>
                              <p>
                                TOZO T6 True Wireless Earbuds Bluetooth
                                Headphon...
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                          <div className="product-card">
                            <div className="product-img">
                              <a href="product-detail.php">
                                <img
                                  src="../assets/images/product-7.png"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="desc">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-0">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <span>4.5</span>
                                </div>
                              </div>
                              <span className="price">
                                $99.50 <del>$1128.00</del>
                              </span>
                              <p>
                                TOZO T6 True Wireless Earbuds Bluetooth
                                Headphon...
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                          <div className="product-card">
                            <div className="product-img">
                              <a href="product-detail.php">
                                <span className="product-badge">Hot</span>
                                <img
                                  src="../assets/images/product-2.png"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="desc">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-0">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <span>4.5</span>
                                </div>
                              </div>
                              <span className="price">
                                $99.50 <del>$1128.00</del>
                              </span>
                              <p>
                                TOZO T6 True Wireless Earbuds Bluetooth
                                Headphon...
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                          <div className="product-card">
                            <div className="product-img">
                              <a href="product-detail.php">
                                <img
                                  src="../assets/images/product-3.png"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="desc">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-0">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <span>4.5</span>
                                </div>
                              </div>
                              <span className="price">
                                $99.50 <del>$1128.00</del>
                              </span>
                              <p>
                                TOZO T6 True Wireless Earbuds Bluetooth
                                Headphon...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="browsing-sec">
                    <div className="top-heading">
                      <span>03 APR, 2024</span>
                    </div>
                    <div className="info-inner pb-1">
                      <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6">
                          <div className="product-card">
                            <div className="product-img">
                              <a href="product-detail.php">
                                <img
                                  src="../assets/images/product-1.png"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="desc">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-0">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <span>4.5</span>
                                </div>
                              </div>
                              <span className="price">
                                $99.50 <del>$1128.00</del>
                              </span>
                              <p>
                                TOZO T6 True Wireless Earbuds Bluetooth
                                Headphon...
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                          <div className="product-card">
                            <div className="product-img">
                              <a href="product-detail.php">
                                <span className="product-badge">Hot</span>
                                <img
                                  src="../assets/images/product-7.png"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="desc">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-0">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <span>4.5</span>
                                </div>
                              </div>
                              <span className="price">
                                $99.50 <del>$1128.00</del>
                              </span>
                              <p>
                                TOZO T6 True Wireless Earbuds Bluetooth
                                Headphon...
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                          <div className="product-card">
                            <div className="product-img">
                              <a href="product-detail.php">
                                <span className="product-badge">Hot</span>
                                <img
                                  src="../assets/images/product-2.png"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="desc">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-0">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <span>4.5</span>
                                </div>
                              </div>
                              <span className="price">
                                $99.50 <del>$1128.00</del>
                              </span>
                              <p>
                                TOZO T6 True Wireless Earbuds Bluetooth
                                Headphon...
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                          <div className="product-card">
                            <div className="product-img">
                              <a href="product-detail.php">
                                <img
                                  src="../assets/images/product-3.png"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="desc">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-0">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <span>4.5</span>
                                </div>
                              </div>
                              <span className="price">
                                $99.50 <del>$1128.00</del>
                              </span>
                              <p>
                                TOZO T6 True Wireless Earbuds Bluetooth
                                Headphon...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-loader text-center">
              <button type="button" className="btn btn-theme-outline mb-2 mt-2">
                <i className="fa fa-spinner me-2" />
                LOAD MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowsingHistory;
