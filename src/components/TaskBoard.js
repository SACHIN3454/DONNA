// src/components/TaskBoard.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "../styles/calendar.scss";

const predefinedTasks = [
  "Gym", "Work", "Record", "Video Edit", "Upload",
  "Website Upload", "Reels Edit"
];

function TaskBoard() {
  const [selectedTask, setSelectedTask] = useState("");
  const [customTask, setCustomTask] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const snap = await getDocs(collection(db, "tasks"));
    const data = snap.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      date: doc.data().date,
    }));
    setEvents(data);
  };

  const handleAddCustomTask = () => {
    if (!customTask.trim()) return;
    setSelectedTask(customTask);
    setCustomTask("");
    toast.success(`✅ "${customTask}" selected`);
  };

  const handleDateClick = async (date) => {
    if (!selectedTask) {
      toast.info("📌 Select a task first");
      return;
    }

    const newTask = {
      title: selectedTask,
      date,
      status: "scheduled",
    };

    const ref = await addDoc(collection(db, "tasks"), newTask);
    setEvents([...events, { ...newTask, id: ref.id }]);
    toast.success(`🗓️ ${selectedTask} added on ${date}`);
  };

  const handleDeleteTask = async (taskId) => {
    const confirm = window.confirm("❌ Delete this task?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setEvents(events.filter((e) => e.id !== taskId));
      toast.success("Task deleted ✅");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  // Generate calendar grid for current month
  const getCalendarDays = () => {
    const days = [];
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startDay = start.getDay();

    // Fill empty slots at beginning
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= end.getDate(); d++) {
      const fullDate = new Date(now.getFullYear(), now.getMonth(), d)
        .toISOString()
        .split("T")[0];
      days.push(fullDate);
    }

    return days;
  };

  return (
    <div className="task-board">
      <h3>📝 Select a Task</h3>
      <div className="task-options">
        {predefinedTasks.map((task) => (
          <button
            key={task}
            className={selectedTask === task ? "selected" : ""}
            onClick={() => setSelectedTask(task)}
          >
            {task}
          </button>
        ))}
        <input
          value={customTask}
          placeholder="Custom task"
          onChange={(e) => setCustomTask(e.target.value)}
        />
        <button onClick={handleAddCustomTask}>+ Add & Select</button>
      </div>

      <h3 style={{ marginTop: "2rem" }}>📅 This Month</h3>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div className="calendar-header" key={d}>{d}</div>
        ))}

        {getCalendarDays().map((date, idx) => (
          <div
            key={idx}
            className={`calendar-cell ${date ? "active" : ""}`}
            onClick={() => date && handleDateClick(date)}
          >
            {date && <div className="date-num">{new Date(date).getDate()}</div>}

            <div className="task-list">
              {events
                .filter((e) => e.date === date)
                .map((t) => (
                  <div
                    key={t.id}
                    className="task-bubble"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering date click
                      handleDeleteTask(t.id);
                    }}
                  >
                    {t.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;
