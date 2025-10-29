


import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
// import { privateRequest } from "../../../config/axios.config";
// import { networkErrorHandeller } from "../../../utils/helpers";



// Register chart components
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
  // const [apiData, setApiData] = useState([]);
  const [apiData, setApiData] = useState([
    {
      year: 2025,
      month: 1,
      month_name: "January 2025",
      monthly_count: 0,
      total_vendors_till_now: 0,
    },
    {
      year: 2025,
      month: 2,
      month_name: "February 2025",
      monthly_count: 0,
      total_vendors_till_now: 0,
    },
    {
      year: 2025,
      month: 3,
      month_name: "March 2025",
      monthly_count: 0,
      total_vendors_till_now: 0,
    },
    {
      year: 2025,
      month: 4,
      month_name: "April 2025",
      monthly_count: 0,
      total_vendors_till_now: 0,
    },
    {
      year: 2025,
      month: 5,
      month_name: "May 2025",
      monthly_count: 0,
      total_vendors_till_now: 0,
    },
    {
      year: 2025,
      month: 6,
      month_name: "June 2025",
      monthly_count: 0,
      total_vendors_till_now: 0,
    },
    {
      year: 2025,
      month: 7,
      month_name: "July 2025",
      monthly_count: 2,
      total_vendors_till_now: 2,
    },
    {
      year: 2025,
      month: 8,
      month_name: "August 2025",
      monthly_count: 0,
      total_vendors_till_now: 2,
    },
    {
      year: 2025,
      month: 9,
      month_name: "September 2025",
      monthly_count: 2,
      total_vendors_till_now: 4,
    },
    {
      year: 2025,
      month: 10,
      month_name: "October 2025",
      monthly_count: 1,
      total_vendors_till_now: 5,
    },
    {
      year: 2025,
      month: 11,
      month_name: "November 2025",
      monthly_count: 0,
      total_vendors_till_now: 5,
    },
    {
      year: 2025,
      month: 12,
      month_name: "December 2025",
      monthly_count: 0,
      total_vendors_till_now: 5,
    },
  ])

  console.log("apiData",apiData)


  // const [loading, setLoading] = useState(false);

  // // ✅ Fetch data
  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await privateRequest.get("admin/dashboard");
  //     if (response?.status === 200) {
  //       setApiData(response?.data?.data?.vendor_growth_analytics);
  //     }
  //   } catch (error) {
  //     networkErrorHandeller(error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // ✅ Extract vendor analytics safely
  const vendorData = apiData|| [];
  console.log("Vendor Growth Data:", vendorData);

  // if (loading) {
  //   return (
  //     <div className="bg-white shadow-md p-4 rounded-xl text-center">
  //       Loading data...
  //     </div>
  //   );
  // }

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

  // ✅ Assign colors
  const baseColors = [
    "#60a5fa",
    "#3b82f6",
    "#34d399",
    "#f59e0b",
    "#f43f5e",
    "#9ca3af",
    "#fbbf24",
    "#3b82f6"
  ];
  const colors = dataValues.map((_, i) => baseColors[i % baseColors.length]);

  // ✅ Chart.js dataset
  const chartData = {
    labels,
    datasets: [
      {
        label: "Vendors Joined",
        data: dataValues,
        backgroundColor: colors,
        borderRadius: 8,
      },
    ],
  };

  // ✅ Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Vendor Growth Analytics",
        font: { size: 18 },
        align: "start",
        color: "#000",
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#000",
        offset: -5,
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value) => (value === 0 ? "" : value),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 50 },
        title: { display: true, text: "Monthly Vendors" },
      },
      x: {
        title: { display: true, text: "Months" },
      },
    },
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ActiveClient;


