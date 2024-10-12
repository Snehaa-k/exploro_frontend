import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Adminprotected = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const atoken = localStorage.getItem("admin_accessToken");
  const location = useLocation();
  const isAuthenticated = !!token;
  const isAdAuth = !!atoken;

  if (isAuthenticated) {
    // console.log(isAuthenticated);
    return <Navigate to="/" state={{ from: location }} />;
  }
  if (!isAuthenticated) {
    // console.log(isAuthenticated);
    return children;
  }

  if (isAdAuth) {
    return <Navigate to="/request" state={{ from: location }} />;
  }
  if (!isAdAuth) {
    return children;
  }
};

export default Adminprotected;
