import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import TaskModal from "./TaskModal";
import "../styles/calendar.scss";

function CustomCalendar() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const fetchTasks = async () => {
    const snap = await getDocs(collection(db, "tasks"));
    const taskData = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
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
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayTasks = tasks.filter(t => t.date === dateStr);
      calendar.push(
        <div key={day} className="calendar-cell" onClick={() => handleDateClick(dateStr)}>
          <div className="day-number">{day}</div>
          <ul className="task-list">
            {dayTasks.map(task => (
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
      <h2>📆 Custom Calendar View</h2>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div key={i} className="day-header">{d}</div>
        ))}
        {renderCalendar()}
      </div>

      {showModal && (
        <TaskModal
          date={selectedDate}
          tasks={tasks.filter(t => t.date === selectedDate)}
          onClose={() => setShowModal(false)}
          onAdd={handleAddTask}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default CustomCalendar;
