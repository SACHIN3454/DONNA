import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.scss";
import "./styles/DashboardPage.scss";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <App darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
