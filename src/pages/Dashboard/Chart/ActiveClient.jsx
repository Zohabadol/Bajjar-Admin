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

const ActiveClient = () => {
  const [apiData, setApiData] = useState([]);

  console.log("apiData", apiData);

  const [loading, setLoading] = useState(false);

  // ✅ Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await privateRequest.get("admin/dashboard");
      if (response?.status === 200) {
        setApiData(response?.data?.data?.vendor_growth_analytics);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Extract vendor analytics safely
  const vendorData = apiData || [];
  console.log("Vendor Growth Data:", vendorData);

  if (loading) {
    return (
      <div className="bg-white shadow-md p-4 rounded-xl text-center">
        Loading data...
      </div>
    );
  }

  if (!vendorData.length) {
    return (
      <div className="bg-white shadow-md p-4 rounded-xl text-center">
        No data available
      </div>
    );
  }

  // ✅ Prepare chart labels & values
  const labels = vendorData.map((item) => item.month_name);
  const dataValues = vendorData.map((item) => item.monthly_count);

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
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Company Performance (Active Client)",
        font: { size: 18 },
        align: "start",
        color: "#000000",
        padding: {
          bottom: 30,
        },
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
          if (value === 0) return null;
          return value;
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 50 },
      },
    },
  };

  return (
    <div className="bg-white shadow-md p-4 ">
      {/* <Bar data={data} options={options} /> */}
      <div className="overflow-x-auto">
        <div className="min-w-[500px] md:min-w-full h-[400px]">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ActiveClient;
