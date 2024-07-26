import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainFooterLinks = () => {
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  const featuredCategoryData = useSelector(
    (state) => state.categoryReducerData.categories
  );

  useEffect(() => {
    onTop();
  });

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const linkItems = [
    // { name: " Shop Product", link: "/" , onClick: onTop},
    { name: " Shoping Cart", link: "/my-cart", onClick: onTop },
    { name: " Wishlist", link: "/my-favorites", onClick: onTop },
    { name: " Return Policy", link: "/return-policy", onClick: onTop },
    { name: " Privacy Policy", link: "/privacy-policy", onClick: onTop },
    { name: " About Us", link: "/about-us", onClick: onTop },
  ];
  return (
    <div className={featuredCategoryData.length >0 ? "col-xl-2 col-lg-2 col-md-6 col-6" : "col-xl-3 col-lg-3 col-md-12"}>
      <div className="footer-links">
        <h6>Quick links</h6>
        <ul className="list-unstyled">
          {linkItems.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.link} onClick={item.onClick}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainFooterLinks;
