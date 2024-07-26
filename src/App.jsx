"use client";

import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "../src/Styles/responsive.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { handleGetSiteSettings } from "./redux/actions/AuthAction";
import NoInternet from "./components/Toast/NoInternet";
import { GET_FAVORITES, POST_ERROR_ON_SERVER } from "./redux/constant/constants";
import loader from "./assets/images/loader.gif";
import AppRoutes from "./Routes";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import "react-internet-meter/dist/index.css"; // Ensure the path is correct
import { MyToast } from "./components/Toast/MyToast";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

function App({ setClientId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [status, setStatus] = useState(true);
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  useEffect(() => {
    dispatch(handleGetSiteSettings());
    dispatch({ type: GET_FAVORITES });
  }, [dispatch]);

  useEffect(() => {
    const favicon = document.getElementById("favicon-icon");
    if (favicon && siteSettingsData) {
      favicon.setAttribute("href", siteSettingsData?.site_favicon);
    }
  }, [siteSettingsData?.site_favicon]);

  useEffect(() => {
    if (siteSettingsData && siteSettingsData.google_client_id) {
      setClientId(siteSettingsData.google_client_id);
    }
  }, [siteSettingsData?.google_client_id]);

  const listeners = useCallback(() => {
    window.addEventListener("online", () => setStatus(true));
    window.addEventListener("offline", () => setStatus(false));
    return () => {
      window.removeEventListener("online", () => setStatus(true));
      window.removeEventListener("offline", () => setStatus(false));
    };
  }, []);

  useEffect(() => {
    listeners();
  }, [listeners]);

  const onReset = useCallback(() => {
    // Reset any state or perform any necessary cleanup here
    // Example: You might want to reset some state to its initial value
    navigate("/")
    dispatch(handleGetSiteSettings());
    dispatch({ type: GET_FAVORITES });
  }, [dispatch]);

  const logError = (error, info) => {
    // Do something with the error, e.g. log to an external API
    let fileName = ""
    const errorMessage = Object.values(error)?.[0]
  
    let errorInfo = {}
  
    if (error instanceof ReferenceError) {
      errorInfo.module = "This is a ReferenceError."
    } else if (error instanceof TypeError) {
       errorInfo.module = "This is a TypeError."
    } else if (error instanceof SyntaxError) {
       errorInfo.module = "This is a SyntaxError."
    } else {
       errorInfo.module = "This is a different type of error:" + error?.constructor?.name
    }
  
    errorInfo.message = error.message
    errorInfo.stack = info?.componentStack
    dispatch({type : POST_ERROR_ON_SERVER, data : errorInfo})

  
  };
  

  const Loader = () => (
    <div style={loaderStyle}>
      <img src={loader} alt="Loading..." style={{ width: "100px" }} />
    </div>
  );

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const throttledToast = throttle(MyToast, 1);

  return (
    <ErrorBoundary fallbackRender={fallbackRender} onReset={onReset} onError={logError}>
      <ReactInternetSpeedMeter
        txtSubHeading="Internet is too slow"
        outputType="empty"
        customClassName={null}
        txtMainHeading="Opps..."
        pingInterval={3000} // milliseconds
        thresholdUnit="kilobyte" // "byte" , "kilobyte", "megabyte"
        threshold={30} // 50 kbps
        imageUrl="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        downloadSize="6000" // bytes (size of the Google logo image)
        callbackFunctionOnNetworkTest={(speed) => {
          if (speed <= 30) {
            toast.clearWaitingQueue();
            throttledToast(
              "Internet speed is too low",
              "error",
              "rgba(217,92,92,.95)"
            );
          }
        }}
        callbackFunctionOnError={() => {}}
        callbackFunctionOnNetworkDown={(speed) => {}}
      />
      <Header />
      {status ? (

          <AppRoutes />
      ) : (
        <NoInternet />
      )}
      <Footer />
      <ToastContainer limit={1} />
    </ErrorBoundary>

  );
}

export default App;

function throttle(func, limit) {
  let calls = 0;
  let startTime = Date.now();

  return function (...args) {
    const currentTime = Date.now();

    // Reset the calls count and startTime after 1 minute
    if (currentTime - startTime > 60000) {
      calls = 0;
      startTime = currentTime;
    }
    if (calls < limit) {
      calls++;
      return func(...args);
    }
  };
}

function fallbackRender({ error, resetErrorBoundary }) {
  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <p style={headingStyle}>Something went wrong:</p>
      <pre style={errorStyle}>{error.message}</pre>
      <button style={buttonStyle} onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

const containerStyle = {
  backgroundColor: "#f8d7da",
  border: "1px solid #f5c6cb",
  borderRadius: "4px",
  padding: "20px",
  marginBottom: "20px",
};

const headingStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const errorStyle = {
  color: "red",
  whiteSpace: "pre-wrap", // Ensures that the error message wraps correctly
};
