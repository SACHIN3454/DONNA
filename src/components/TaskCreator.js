import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function TaskCreator({ onCreate }) {
  const [title, setTitle] = useState("");
  const [recentTasks, setRecentTasks] = useState([]);

  const handleAdd = async () => {
    if (!title.trim()) {
      toast.error("Task cannot be empty");
      return;
    }

    const task = {
      title,
      date: new Date().toISOString(),
      status: "pending",
    };

    try {
      await addDoc(collection(db, "tasks"), task);
      toast.success("✅ Task added");
      onCreate(task);
      setRecentTasks((prev) => [task, ...prev.slice(0, 2)]);
      setTitle("");
    } catch (error) {
      toast.error("Error adding task");
    }
  };

  return (
    <div>
      <input
        placeholder="Create Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>+ Create</button>

      {recentTasks.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h4>🕓 Recently Added Tasks:</h4>
          <ul>
            {recentTasks.map((t, i) => (
              <li key={i}>{t.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TaskCreator;
