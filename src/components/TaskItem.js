import React from "react";

function TaskItem({ task }) {
  return (
    <div className="task-item" draggable>
      {task}
    </div>
  );
}

export default TaskItem;
