import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const WeeklyStats = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeekDates = () => {
      const now = new Date();
      return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(now);
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split("T")[0];
      });
    };

    const fetchTasks = async () => {
      try {
        const snap = await getDocs(collection(db, "tasks"));
        const data = snap.docs.map((doc) => doc.data());
        const week = getWeekDates();

        const counts = week.map((day) =>
          data.filter((task) => task.date?.startsWith(day)).length
        );

        setChartData({
          labels: week.map((d) =>
            new Date(d).toLocaleDateString("en-IN", { weekday: "short" })
          ),
          datasets: [
            {
              label: "Tasks",
              data: counts,
              backgroundColor: "#FBAB57",
              borderRadius: 6,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="weekly-stats">
      <h3>📊 Weekly Task Stats</h3>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading chart...</p>
      ) : chartData?.datasets?.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p style={{ textAlign: "center" }}>No task data to display.</p>
      )}
    </div>
  );
};

export default WeeklyStats;
