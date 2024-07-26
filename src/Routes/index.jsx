import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Category from '../pages/Categories'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Cart from '../pages/Cart'
import MyFavorites from '../pages/MyFavorites'
import Login from '../pages/Login'
import MyAccount from '../pages/MyAccount'
import ForgotPassword from '../pages/Login/ForgotPassword/ForgotPassword'
import Checkout from '../pages/Checkout'
import OrderHistoryDetail from '../pages/OrderHistoryDetail'
import TrackOrderSection from '../pages/TrackOrder'
import BestSelling from '../pages/BestSelling'
import AboutUs from '../pages/Policy/AboutUs'
import ReturnPolicy from '../pages/Policy/ReturnPolicy'
import PrivacyPolicy from '../pages/Policy/PrivacyPolicy'
import OrderConfirm from '../pages/Checkout/OrderConfirm/OrderConfirm'
import Help from '../pages/Help/Index'
import ResetPassword from '../pages/Login/ResetPassword/ResetPassword'
import DealsProducts from '../pages/DealsProducts/DealsProducts'
import CouponsAndDealsModal from '../components/Header/CenterHeader/CouponsAndDealsModal/CouponsAndDealsModal'

const AppRoutes = () => {
  const location = useLocation()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(true)
  }, [location])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/track-order" element={<TrackOrderSection />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
        <Route path="/order-history-detail" element={<OrderHistoryDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/help" element={<Help />} />
        <Route path="/best-selling-products" element={<BestSelling />} />
        <Route path="/today-deals" element={<DealsProducts />} />
      </Routes>
    </>
  )
}

export default AppRoutes
