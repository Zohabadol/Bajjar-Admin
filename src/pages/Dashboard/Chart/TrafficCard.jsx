import { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const TrafficCard = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;

    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(168, 85, 247, 0.3)"); 
    gradient.addColorStop(1, "rgba(168, 85, 247, 0)");   

    const data = {
      labels: ["16", "18", "20", "22", "24", "26", "28", "30"],
      datasets: [
        {
          label: "Store Visits",
          data: [1200, 1000, 1600, 2500, 2100, 2000, 2200, 2400],
          borderColor: "#f97316", // Orange line
          backgroundColor: gradient, // Purple glow under the line
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#f97316",
        },
      ],
    };

    setChartData(data);
  }, []);

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { drawBorder: false } },
    },
  };

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-xl shadow-md w-full ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Traffic</h2>
        <button className="text-sm text-blue-500">More →</button>
      </div>

      <div className="flex justify-between gap-8 mb-4">
        <div className="bg-white shadow-xl w-[50%] px-5 py-4 flex justify-between rounded-md">
          <div>
            <p className="text-sm text-gray-500 pb-1">Store Visits</p>
            <p className="text-2xl font-bold">8950</p>
          </div>
          <div>
            <span className="text-green-500 text-sm">+22%</span>
          </div>
        </div>
        <div className="bg-white shadow-xl w-[50%] px-5 py-4 flex justify-between rounded-md">
          <div>
            <p className="text-sm text-gray-500 pb-1">Visitors</p>
            <p className="text-2xl font-bold">1520</p>
          </div>
          <div>
            <span className="text-green-500 text-sm">+22%</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-2">
        Jan 16 - Jan 30 store visits chart
      </p>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default TrafficCard;
