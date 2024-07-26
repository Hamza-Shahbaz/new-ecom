import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProductDetailsImages from "./ProductDetailsImages";
import StarRating from "../../../components/StarRating/StarRating";
import minusImage from "../../../assets/images/minus.png";
import plusImage from "../../../assets/images/plus.png";
import whishlistImage from "../../../assets/images/wishlist.png";
import gauranteeImage from "../../../assets/images/payment.png";
import { BaseUrl, EndPoints } from "../../../utils/Api";
import ProductReveiw from "../ProductReview/ProductReveiw";
import loader from "../../../assets/images/loader.gif";
import ProductInfo from "../ProductInfo/ProductInfo";
import { productBreadcrumbsHandler } from "../../../redux/actions/BreadcrumbActions";

const ProductView = () => {
  const params = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariant, setSelectedVariants] = useState([]);
  const dispatch = useDispatch();

  const categoriesFromState = useSelector(
    (state) => state?.categoryReducerData.categories
  );

  const productId = params?.id;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setData({});
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        const response = await fetch(
          `${BaseUrl}${EndPoints.singleproduct}${productId}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        if (result.data.has_variants_selected) {
          setSelectedVariants(
            Object.keys(result.data?.variant_combo_reference || {})?.[0]?.split(
              ","
            )
          );
          console.log(Object.keys(result.data?.variant_combo_reference || {})?.[0]?.split(
            ","
          ), (Object.keys(result.data?.variant_combo_reference || {})), result.data?.variant_combo_reference)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  const dataTransformationFunction = (data) => {
    return data?.data;
  };

  const transformedData = dataTransformationFunction(data);

  const breadcrumbsFromState = useSelector(
    (state) => state.BreadcrumbReducerData.breadcrumbs || []
  );

  const lastCrumbPath = breadcrumbsFromState?.pop()?.path;

  useEffect(() => {
    if (transformedData?.product_head?.[0]?.product_id) {
      dispatch(
        productBreadcrumbsHandler(
          categoriesFromState,
          transformedData?.product_head[0]
        )
      );
    }
  }, [transformedData?.product_head?.[0]?.product_id, lastCrumbPath]);

  const isVariant = transformedData?.has_variants_selected === 1;

  let currentVariant = {};
  if (isVariant) {
    currentVariant =
      transformedData?.variant_combo_reference?.[
        selectedVariant.join(",")
      ];
  }

  if (isLoading) {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center ">
            <img src={loader} alt="Loading Related Products" />
          </div>
        </div>
      </div>
    );
  }

  console.log(selectedVariant)

  return (
    <>
      {(isLoading || Object.keys(transformedData || {})?.length > 0) && (
        <section className="product-detail">
          <div className="container">
            <div className="row">
              <ProductDetailsImages
              key={'product-images'}
                images={
                  isVariant
                    ? transformedData?.product_images?.[
                        currentVariant?.variant_combo_id
                      ]
                    : transformedData?.product_images
                }
              />
              <div key={'product-info-div'} className="col-xl-7 col-lg-7 col-md-7">
                <ProductInfo
                key={'product-info'}
                  transformedData={transformedData}
                  selectedVariant={selectedVariant}
                  setSelectedVariants={setSelectedVariants}
                />
              </div>
            </div>
          </div>
          <div className="container"></div>
        </section>
      )}
      {Object.keys(transformedData || {})?.length > 0 > 0 && (
        <ProductReveiw key={'product-review'} productInfo={transformedData} />
      )}
    </>
  );
};

export default ProductView;
