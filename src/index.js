import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './styles/global.css'; // Global styling
import './styles/DashboardPage.scss'; // Custom SASS for dashboard

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
