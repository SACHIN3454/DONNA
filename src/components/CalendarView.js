import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const localizer = momentLocalizer(moment);

function CalendarView({ tasks }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await getDocs(collection(db, "tasks"));
      const items = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          title: data.title,
          start: new Date(data.date),
          end: new Date(data.date),
          allDay: true,
        });
      });
      setEvents(items);
    };
    fetchTasks();
  }, [tasks]);

  const handleSelectSlot = async ({ start }) => {
    const title = prompt("Enter Task:");
    if (title) {
      await addDoc(collection(db, "tasks"), {
        title,
        date: start.toISOString(),
      });
      setEvents([...events, { title, start, end: start, allDay: true }]);
    }
  };

  return (
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      defaultView="month"
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectSlot={handleSelectSlot}
    />
  );
}

export default CalendarView;
