import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>👋 Welcome to DONNA</h1>
      <p>Your personal productivity assistant.</p>
      <Link to="/calendar">📆 Go to Calendar</Link><br />
      <Link to="/expenses">💰 Go to Expenses</Link>
    </div>
  );
};

export default HomePage;
