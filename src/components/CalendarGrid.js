import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import TaskModal from "./TaskModal";
import "../styles/calendar.scss";

function CalendarGrid() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const snap = await getDocs(collection(db, "tasks"));
      const items = snap.docs.map(doc => doc.data());
      setTasks(items);
    };
    fetchTasks();
  }, []);

  const handleDateClick = (dateStr) => {
    setSelectedDate(dateStr);
    setModalOpen(true);
  };

  const addTask = async (title) => {
    const newTask = {
      title,
      date: selectedDate,
      createdAt: new Date().toISOString(),
    };
    await addDoc(collection(db, "tasks"), newTask);
    setTasks(prev => [...prev, newTask]);
    setModalOpen(false);
  };

  const getTasksForDate = (dateStr) => tasks.filter(t => t.date === dateStr);

  const renderCalendar = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed
    const cal = new Array(42).fill(null);
    const date = new Date(year, month, 1);
    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < daysInMonth; i++) {
      cal[startDay + i] = i + 1;
    }

    return cal.map((day, i) => {
      const dateStr = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : null;
      return (
        <div key={i} className="day-cell" onClick={() => dateStr && handleDateClick(dateStr)}>
          <div className="day-number">{day}</div>
          <div className="task-bubbles">
            {getTasksForDate(dateStr).map((t, j) => (
              <div key={j} className="bubble">{t.title}</div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">March 2025</div>
      <div className="day-names">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div key={i} className="day-name">{d}</div>
        ))}
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
      {modalOpen && (
        <TaskModal date={selectedDate} onClose={() => setModalOpen(false)} onSave={addTask} />
      )}
    </div>
  );
}

export default CalendarGrid;
