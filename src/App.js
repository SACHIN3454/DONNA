import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import DashboardPage from "./pages/DashboardPage";
import CalendarPage from "./pages/CalendarPage";
import ExpensesPage from "./pages/ExpensesPage";
import DarkModeToggle from "./components/DarkModeToggle";

function App({ darkMode, setDarkMode }) {
  return (
    <Router>
      <div style={{ padding: "1rem" }}>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<DashboardPage />} /> {/* Dashboard is landing */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
