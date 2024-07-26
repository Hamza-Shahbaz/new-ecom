import React from "react";
import dummmyImage from "../../../../assets/images/no-image1.png";

function TrackProductItem({
  productImage,
  productName,
  productPrice,
  productQuantity,
  totalProduct,
  productDiscount,
}) {
  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };
  return (

    <div className="order-information">
      <div className="product-info">
        <img
          src={productImage ? productImage : dummmyImage}
          onError={handleImageError}
        />
        <div className="mb-0">
          {/* <Link>{productName && productName}</Link> */}
          <p>{productName && productName}</p>
        </div>
      </div>
      <div className="price-info">
        <span className="d-lg-none">Price: </span>
        <span>
          {productPrice === productDiscount ? (
            <span>{productPrice || "0"}</span>
          ) : (
            <>
              <del>{productPrice}</del> {productDiscount || "0"}
            </>
          )}
        </span>
      </div>
      <div className="product-quantity">
        <span className="d-lg-none">Quantity: </span>
        <span>{productQuantity}</span>
      </div>
      <div className="product-sub-total">
        <span className="d-lg-none">Sub Total: </span>
        <span>{totalProduct || null}</span>
      </div>
    </div>
  );
}

export default TrackProductItem;
