import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const isLoginUser = Boolean(loginData?.token);
  return isLoginUser ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoutes;
