import React, { useEffect, useRef } from "react";
import DataTable from "react-data-table-component";

 const DeliveryEarningsModal = ({ onClose }) => {
  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const data = [
    {
      date: "12 May 2025",
      fromTo: "Bakhtiar Fashion - Hasan Taluker",
      address: "Grap Town, Savar",
      fee: "30 TK",
      commission: 10,
    },
    {
      date: "12 May 2025",
      fromTo: "Bakhtiar Fashion - Hasan Taluker",
      address: "Grap Town, Savar",
      fee: "30 TK",
      commission: 10,
    },
  ];

  const columns = [
    {
      name: "SN",
      cell: (row, index) => (
        <div>{String(index + 1).padStart(2, "0")}.</div>
      ),
      width: "60px",
    },
    { name: "Date", selector: (row) => row.date, sortable: true },
    { name: "Order From - To", selector: (row) => row.fromTo, wrap: true },
    {
      name: "Delivery Address",
      selector: (row) => row.address,
      wrap: true,
    },
    { name: "Delivery Fee", selector: (row) => row.fee },
    {
      name: "Commission",
      selector: (row) => `${row.commission} TK`,
    },
  ];

  const totalCommission = data.reduce(
    (acc, curr) => acc + Number(curr.commission),
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-[20px] p-6 w-[95%] max-w-4xl"
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Delivery Earnings
        </h2>

        {/* Filter Dropdown */}
        <div className="flex justify-center mb-4">
          <select className="border px-4 py-2 rounded-full text-sm text-center text-gray-700">
            <option>Commission Status (Done/Pending)</option>
            <option>Done</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={data}
          noHeader
          pagination={false}
          highlightOnHover
          dense
        />

        {/* Total */}
        <div className="flex justify-end mt-4 pr-4">
          <span className="text-lg font-semibold">
            Total: {totalCommission} TK
          </span>
        </div>


      </div>
    </div>
  );
};

export default DeliveryEarningsModal;
