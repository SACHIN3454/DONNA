import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function TaskCreator({ onCreate }) {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (title.trim()) {
      const task = {
        title,
        date: new Date().toISOString(),
        status: "pending"
      };

      try {
        await addDoc(collection(db, "tasks"), task);
        console.log("✅ Task added:", task);
        onCreate(task); // still calls parent state update
        setTitle("");
      } catch (error) {
        console.error("❌ Failed to add task:", error);
      }
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
    </div>
  );
}

export default TaskCreator;
