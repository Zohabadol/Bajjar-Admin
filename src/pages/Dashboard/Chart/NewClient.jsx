import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const NewClient = () => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dataValues = [20, 0, 22, 5, 7, 3, 3, 8, 17, 19, 18, 22];
  const colors = [
    "#60a5fa",
    "#3b82f6",
    "#34d399",
    "#34d399",
    "#9ca3af",
    "#3b82f6",
    "#f59e0b",
    "#f43f5e",
    "#f59e0b",
    "#34d399",
    "#fbbf24",
    "#fbbf24",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Active Clients",
        data: dataValues,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly New Client",
        font: { size: 18 },
        align: "start",
        color: '#000000',
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#000",
        offset: -25,
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value) => {
          if (value === 0) return null; // don't show label if value is 0
          return value;
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 25,
        ticks: {
          stepSize: 5, // step size between ticks, adjust as you like
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md p-4 ">
      <Bar data={data} options={options} />
    </div>
  );
};

export default NewClient;
