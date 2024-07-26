import React from "react";
import { FaUserCircle } from "react-icons/fa";
import StarRating from "../../../components/StarRating/StarRating";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ImCross } from "react-icons/im";

function ReviewItem({ reviewerName, date, reviewContent, images, starRating }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => setSelectedImage(!selectedImage);

  return (
    <div className="review-body">
      <div className="client-review-img mb-2 mx-1 styled">
        {images?.map((productImage, index) => (
          <img
            key={index}
            src={productImage ? productImage : null}
            style={{ width: "150px", height: "100px", marginRight: "15px" , objectFit: 'fill', cursor: 'pointer'}}
            onClick={() => openImage(productImage)}
          />
        ))}
      </div>
      {selectedImage && (
        <>
          <Modal show={selectedImage} onHide={handleClose} centered>
            <Modal.Body>
              <div className="d-flex justify-content-end">
                <button className="btn btn-light" onClick={handleClose}>
                  <ImCross size={15} color="#219ebc" />
                </button>
              </div>
              <div
                className="justify-content-center d-flex w-100 mt-3"
                style={{ borderRadius: "20px" }}
              >
                <img
                  src={selectedImage}
                  style={{
                    height: "300px",
                    width: "100%",
                    borderRadius: "20px",
                  }}
                />
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
      <div className="review-sec">
        <FaUserCircle
          className="me-3"
          style={{ width: "50px", height: "40px" }}
        />
        <div className="review-left">
          <div className="review-header">
            <div>
              <span className="name">{reviewerName}</span>
              <span>{date}</span>
            </div>
            <div className="star">
              <StarRating rating={starRating} />
            </div>
          </div>
          <div className="review-content">
            <p className="mt-2">{reviewContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
