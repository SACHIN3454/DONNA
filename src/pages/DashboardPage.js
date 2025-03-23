import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Import the new components
import MoodTracker from "../components/MoodTracker";
import WeeklyStats from "../components/WeeklyStats";

const DashboardPage = () => {
  const [greeting, setGreeting] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning ☀️");
    else if (hour < 18) setGreeting("Good Afternoon 🌤️");
    else setGreeting("Good Evening 🌙");

    const fetchTasks = async () => {
      const snap = await getDocs(collection(db, "tasks"));
      setTaskCount(snap.size);
    };

    const fetchExpenses = async () => {
      const snap = await getDocs(collection(db, "expenses"));
      const total = snap.docs.reduce((sum, doc) => sum + parseFloat(doc.data().amount || 0), 0);
      setExpenseTotal(total);
    };

    fetchTasks();
    fetchExpenses();
  }, []);

  return (
    <div className="dashboard">
      <h1>{greeting}</h1>
      <h2>Welcome to <span className="highlight">DONNA</span> 🌸</h2>

      <div className="dashboard-grid">
        <div className="card">
          <h3>📋 Total Tasks</h3>
          <p>{taskCount}</p>
          <Link to="/calendar" className="btn">Go to Calendar</Link>
        </div>

        <div className="card">
          <h3>💸 Total Expenses</h3>
          <p>₹ {expenseTotal.toFixed(2)}</p>
          <Link to="/expenses" className="btn">View Expenses</Link>
        </div>

        <div className="card mood">
          <h3>😊 Mood Tracker</h3>
          <MoodTracker />
        </div>

        <div className="card quick">
          <h3>⚡ Quick Actions</h3>
          <Link to="/calendar" className="btn small">+ Add Task</Link>
          <Link to="/expenses" className="btn small">+ Add Expense</Link>
        </div>
      </div>

      {/* Weekly task statistics below */}
      <WeeklyStats />
    </div>
  );
};

export default DashboardPage;
