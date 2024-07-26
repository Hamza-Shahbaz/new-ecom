import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "../src/Styles/globalStyles.css";
import "react-phone-input-2/lib/style.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "../src/Styles/nice-select.css";
import "../src/Styles/font.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Main() {
  const [clientId, setClientId] = useState("demo");

  return (
    clientId && (
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <App setClientId={setClientId} />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
