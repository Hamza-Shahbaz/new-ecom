import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BaseUrl, EndPoints } from "../../../utils/Api";
import { useParams } from "react-router-dom";
import loader from "../../../assets/images/loader.gif";
import MemoizedCard from "../../../components/ProductCard/ProductCard";

const RelatedProducts = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const productID = params?.id
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setData({});
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        const response = await fetch(
          `${BaseUrl}${EndPoints.similar_products}${productID}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productID) {
      fetchData();
    }
  }, [productID]);

  const dataTransformationFunction = (data) => {
    const tempData = data?.data?.products_data || {};
    return Object.values(tempData);
  };

  const transformedData = dataTransformationFunction(data);

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center ">
            <img
              src={loader}
              alt="Loading Related Products"
              style={{ maxWidth: "100px" }}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {(transformedData?.length > 0 || isLoading) && (
        <section className="related-products">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="center-heading">
                  <h3>Related Products</h3>
                </div>
              </div>
            </div>
            <div className="row">
              {isLoading ? (
                <img
                  src={loader}
                  alt="Loading Related Products"
                  style={{ maxWidth: "100px" }}
                />
              ) : (
                <>
                  {transformedData.map((product) => {
                    return (
                      <div key={product.product_id} className="col-xl-3 col-lg-3 col-md-6">
                        <MemoizedCard productInfo={product} />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedProducts;
