import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
