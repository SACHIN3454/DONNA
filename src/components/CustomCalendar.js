import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import TaskModal from "./TaskModal";
import "../styles/calendar.scss";

function CustomCalendar() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);

  const current = new Date();
  const displayDate = new Date(current.getFullYear(), current.getMonth() + monthOffset, 1);
  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const fetchTasks = async () => {
    const snap = await getDocs(collection(db, "tasks"));
    const taskData = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setTasks(taskData);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleAddTask = async (task) => {
    await addDoc(collection(db, "tasks"), task);
    fetchTasks();
  };

  const handleUpdateTask = async (id, updatedTask) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, updatedTask);
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  const renderCalendar = () => {
    const calendar = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const dateArray = [];

    // Fill empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
      dateArray.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      dateArray.push(d);
    }

    for (let i = 0; i < dateArray.length; i++) {
      const day = dateArray[i];
      const dateStr = day
        ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        : null;
      const dayTasks = tasks.filter((t) => t.date === dateStr);

      calendar.push(
        <div key={i} className="calendar-cell" onClick={() => dateStr && handleDateClick(dateStr)}>
          <div className="day-number">{day}</div>
          <ul className="task-list">
            {dayTasks.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>
      );
    }

    return calendar;
  };

  return (
    <div>
      <div className="calendar-header">
        <button onClick={() => setMonthOffset((prev) => prev - 1)}>←</button>
        <h2>
          {displayDate.toLocaleString("default", { month: "long" })} {currentYear}
        </h2>
        <button onClick={() => setMonthOffset((prev) => prev + 1)}>→</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div key={i} className="day-header">{d}</div>
        ))}
        {renderCalendar()}
      </div>

      {showModal && (
        <TaskModal
          date={selectedDate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default CustomCalendar;
