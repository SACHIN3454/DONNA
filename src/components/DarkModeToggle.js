import React from "react";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div className="dark-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className="slider round"></span>
      </label>
      <span style={{ marginLeft: "10px" }}>{darkMode ? "🌙 Dark" : "☀️ Light"}</span>
    </div>
  );
};

export default DarkModeToggle;
