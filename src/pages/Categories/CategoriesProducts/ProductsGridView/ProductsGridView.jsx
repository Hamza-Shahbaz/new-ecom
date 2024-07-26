import React from "react";
import MemoizedCard from "../../../../components/ProductCard/ProductCard";

const ProductsGridView = ({ products, isListView }) => {
  if(isListView) {
    return (
      <>
        {products.length > 0 && (
          <div className="row">
            {products.map((product) => {
              return (
                <div
                  key={product.product_id}
                  className="col-xl-12 col-lg-12 col-md-12"
                >
                  <MemoizedCard productInfo={product} isListView={isListView}/>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
  return (
    <>
      {products.length > 0 && (
        <div className="row">
          {products.map((product) => {
            return (
              <div
                key={product.product_id}
                className="col-xl-4 col-lg-4 col-md-6"
              >
                <MemoizedCard productInfo={product} isListView={isListView}/>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductsGridView;
