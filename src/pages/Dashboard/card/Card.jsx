import { useEffect, useState } from "react";
import { FaShoppingBag, FaTruck, FaMoneyBillWave } from "react-icons/fa";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helpers";
import { privateRequest } from "../../../config/axios.config";



const Card = () => {
   const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    console.log("dd",data)
    
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await privateRequest.get("admin/dashboard")
      // console.log("responeeeese",response)
      if (response?.status === 200) {
        setData(response?.data?.data);
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
    title: "Todays Order",
    value: data?.today_orders || 0,
    bgColor: "bg-gradient-to-r from-[#86D32C] to-[#2E8900]",
    icon: <FaShoppingBag size={80} />,
  },
  {
    title: "Shipped Today",
    value: data?.today_shipped || 0,
    bgColor: "bg-gradient-to-r from-[#6BAAFC] to-[#305FEC]",
    icon: <FaTruck size={80} />,
  },
  {
    title: "Pending Today",
    value: data?.today_pending || 0,
    bgColor: "bg-gradient-to-r from-[#D623FE] to-[#A530F2]",
    icon: <FaShoppingBag size={80} />,
  },
  {
    title: "Total Orders",
    value: data?.total_orders || 0,
    bgColor: "bg-gradient-to-r from-[#86D32C] to-[#2E8900]",
    icon: <FaShoppingBag size={80} />,
  },
  {
    title: "Total Shipped",
    value: data?.total_shipped || 0,
    bgColor: "bg-gradient-to-r from-[#6BAAFC] to-[#305FEC]",
    icon: <FaTruck size={80} />,
  },
  {
    title: "Canceled Orders",
    value: data?.total_cancelled || 0,
    bgColor: "bg-gradient-to-r from-[#FA6464] to-[#DC2626]",
    icon: <FaShoppingBag size={80} />,
  },
  {
    title: "Sold Today",
    value: data?.today_sold || 0,
    bgColor: "bg-gradient-to-r from-[#F8BB21] to-[#FFA100]",
    icon: <FaMoneyBillWave size={80} />,
  },
  {
    title: "Total Sold",
    value: data?.total_sold || 0,
    bgColor: "bg-gradient-to-r from-[#F8BB21] to-[#FFA100]",
    icon: <FaMoneyBillWave size={80} />,
  },
  {
    title: "Total Revenue",
    value: data?.admin_revenue || 0,
    bgColor: "bg-gradient-to-r from-[#F8BB21] to-[#FFA100]",
    icon: <FaMoneyBillWave size={80} />,
  },
  {
    title: "Total User",
    value: data?.user_count || 0,
    bgColor: "bg-gradient-to-r from-[#F8BB21] to-[#FFA100]",
    icon: <FaMoneyBillWave size={80} />,
  },
  {
    title: "Total Vendor",
    value: data?.vendor_count || 0,
    bgColor: "bg-gradient-to-r from-[#F8BB21] to-[#FFA100]",
    icon: <FaMoneyBillWave size={80} />,
  },
  {
    title: "Total Rider",
    value: data?.rider_count || 0,
    bgColor: "bg-gradient-to-r from-[#F8BB21] to-[#FFA100]",
    icon: <FaMoneyBillWave size={80} />,
  },
];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-1">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className={`relative overflow-hidden rounded-xl text-white shadow-md ${item.bgColor} p-1 min-h-[100px] flex  pl-20`}
        >
          {/* Background icon */}
          <div className="absolute opacity-10 text-[100px] left-3 bottom-1 pointer-events-none -rotate-25">
            {item.icon}
          </div>

          {/* Centered content vertically */}
          <div className="relative z-10 flex h-full py-2">
            <p className="text-md font-semibold">{item.title}</p>
            <h2 className="text-[40px] font-bold mt-8">{item.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
