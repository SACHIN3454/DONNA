import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ExpenseChart = ({ data }) => {
  const chartData = {
    labels: data.map((e) => e.category),
    datasets: [
      {
        label: "Expenses",
        data: data.map((e) => e.amount),
        backgroundColor: "#FBAB57",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ExpenseChart;
