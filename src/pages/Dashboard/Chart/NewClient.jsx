import React, { useEffect, useState } from "react";
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
import { privateRequest } from "../../../config/axios.config";
import { networkErrorHandeller } from "../../../utils/helpers";

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
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await privateRequest.get("admin/dashboard");
      if (response?.status === 200) {
        setApiData(response?.data?.data?.monthly);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const vendorData = apiData || [];

  if (loading)
    return (
      <div className="bg-white shadow-md p-4 rounded-xl text-center">
        Loading data...
      </div>
    );

  if (!vendorData.length)
    return (
      <div className="bg-white shadow-md p-4 rounded-xl text-center">
        No data available
      </div>
    );

  const labels = vendorData.map((item) => item.month_name);
  const dataValues = vendorData.map((item) => item.new_vendors);

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
    maintainAspectRatio: false, // ✅ important for scroll responsiveness
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly New Client",
        font: { size: 18 },
        align: "start",
        color: "#000000",
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
        formatter: (value) => (value === 0 ? null : value),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: { stepSize: 5 },
      },
    },
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      {/* ✅ Scroll container */}
      <div className="overflow-x-auto">
        <div className="min-w-[500px] md:min-w-full h-[400px]">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default NewClient;
