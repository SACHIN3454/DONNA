import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import "../styles/taskmodal.scss";

const categories = ["Work", "Gym", "Edit", "Upload", "Record", "Other"];
const priorities = ["Low", "Medium", "High"];

function TaskModal({ date, onClose }) {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const snap = await getDocs(collection(db, "tasks"));
      const filtered = snap.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((t) => t.date === date);
      setTasks(filtered);
    };
    fetchTasks();
  }, [date]);

  const handleAdd = async () => {
    if (!taskName || !category || !priority) return;

    const newTask = { name: taskName, category, priority, date };
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    setTasks((prev) => [...prev, { ...newTask, id: docRef.id }]);

    // Reset form
    setTaskName("");
    setCategory("");
    setPriority("Medium");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <h3>📅 {new Date(date).toDateString()}</h3>

        <div className="task-scrollable">
          <ul className="task-list">
            {tasks.map((t) => (
              <li key={t.id}>
                {t.name || "_"} – {t.category || "_"} – {t.priority || "_"}
                <button className="delete-btn" onClick={() => handleDelete(t.id)}>🗑️</button>
              </li>
            ))}
          </ul>

          <input
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <h4>Select Category</h4>
          <div className="grid">
            {categories.map((cat) => (
              <button
                key={cat}
                className={category === cat ? "selected" : ""}
                onClick={() => {
                  setCategory(cat);
                  if (!taskName) setTaskName(cat);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <h4>Select Priority</h4>
          <div className="grid">
            {priorities.map((p) => (
              <button
                key={p}
                className={priority === p ? "selected" : ""}
                onClick={() => setPriority(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="bottom-buttons">
          <button onClick={handleAdd}>+ Add Task</button>
          <button onClick={onClose}>❌ Close</button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
