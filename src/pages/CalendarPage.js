import React, { useState } from "react";
import TaskCreator from "../components/TaskCreator";
import CalendarView from "../components/CalendarView";

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);

  const handleCreate = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div>
      <h2>📅 Calendar Task Planner</h2>
      <TaskCreator onCreate={handleCreate} />
      <CalendarView tasks={tasks} />
    </div>
  );
};

export default CalendarPage;
