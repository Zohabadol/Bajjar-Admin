import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaFileInvoice,
  FaCreditCard,
  FaWifi,
  FaBan,
} from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { privateRequest } from "../../config/axios.config";
import { networkErrorHandeller } from "../../utils/helpers";



const BillingCard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await privateRequest.get("admin/dashboard");
      if (response?.status === 200) {
        setData(response?.data?.data || {});
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Client",
      value: data?.total_client || 0,
      desc: "All over the number of clients at present.",
      icon: <FaUsers />,
      bg: "bg-gradient-to-r from-[#0e7490] to-[#06b6d4]",
      f_bg: "bg-cyan-900",
    },
    {
      title: "Running Clients",
      value: data?.running_clients || 0,
      desc: "Number of clients without Left/Out status.",
      icon: <FaUsers />,
      bg: "bg-gradient-to-r from-[#0e7490] to-[#06b6d4]",
      f_bg: "bg-cyan-900",
    },
    {
      title: "Inactive Clients",
      value: data?.inactive_clients || 0,
      desc: "Number of clients whose status are inactive.",
      icon: <FaUsers />,
      bg: "bg-gradient-to-r from-[#0e7490] to-[#06b6d4]",
      f_bg: "bg-cyan-900",
    },
    {
      title: "New Client",
      value: data?.new_client || 0,
      desc: "Monthly number of clients that are new.",
      icon: <FaUserPlus />,
      bg: "bg-gradient-to-r from-[#0e7490] to-[#06b6d4]",
      f_bg: "bg-cyan-500",
    },
    {
      title: "Billing Clients",
      value: data?.billing_clients || 0,
      desc: "Number of clients whom bill generated.",
      icon: <FaFileInvoice />,
      bg: "bg-gradient-to-r from-[#0e7490] to-[#06b6d4]",
      f_bg: "bg-cyan-500",
    },
    {
      title: "Paid Clients",
      value: data?.paid_clients || 0,
      desc: "Number of clients fully paid.",
      icon: <FaCreditCard />,
      bg: "bg-gradient-to-r from-[#0e7490] to-[#06b6d4]",
      f_bg: "bg-cyan-500",
    },
    {
      title: "Online Clients",
      value: data?.online_clients || 0,
      desc: "Number of connected clients.",
      icon: <FaWifi />,
      bg: "bg-gradient-to-r from-[#0e7490] to-[#06b6d4]",
      f_bg: "bg-cyan-500",
    },
    {
      title: "Blocked Clients",
      value: data?.blocked_clients || 0,
      desc: "Number of active & disabled clients.",
      icon: <FaBan />,
     bg: "bg-gradient-to-r from-[#0e7490] to-[#06b6d4]",
      f_bg: "bg-cyan-500",
    },
    {
      title: "Unpaid Clients",
      value: data?.unpaid_clients || 0,
      desc: "Number of clients fully unpaid.",
      icon: <MdOutlinePendingActions />,
     bg: "bg-gradient-to-r from-[#0e7490] to-[#06b6d4]",
      f_bg: "bg-cyan-500",
    },
  ];

  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-1">
  {stats.map((item, idx) => (
    <div
      key={idx}
      className={`flex flex-col justify-between  rounded-md shadow-md ${item.bg} text-white `}
    >
      {/* Top: Icon + title/value */}
      <div className="flex gap-4  px-3 py-0.5 rounded-md ">
        <div className="text-5xl">{item.icon}</div>
        <div>
          <p className="text-sm font-semibold  ">{item.title}</p>
          <p className="text-3xl font-bold -mt-1">{item.value}</p>
        </div>
      </div>

      {/* Bottom: Description */}
      <p className={`text-xs opacity-80 ${item.f_bg} text-center rounded-b-md`}>{item.desc}</p>
    </div>
  ))}
</div>

  );
};

export default BillingCard;
