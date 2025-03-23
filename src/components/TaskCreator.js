import React, { useState } from "react";

function TaskCreator({ onCreate }) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      onCreate({ title });
      setTitle("");
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
