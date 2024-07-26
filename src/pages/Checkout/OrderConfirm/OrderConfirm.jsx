import React from 'react'
import confirmOrder from "../../../assets/images/OrderSuccessfulIcon.png";


const OrderConfirm = () => {
  const handleContinueShopping = () => {
    window.location.href = '/'; // Redirect to the home page and reload
  };
  return (
      <div className="container justify-content-center my-4">
        <div className="d-flex justify-content-center ">
          <img src={confirmOrder} style={{ width: "360px", height: "350px" }} />
          
        </div>
        <div className="d-flex justify-content-center mt-5 ">
          <button className="btn btn-info text-white" style={{fontSize:"18px",width:"250px",height:"50px",background:"#219ebc"}} onClick={handleContinueShopping}>
              Continue Shopping
          </button>
        </div>
      
      </div>
      
  )
}

export default OrderConfirm
