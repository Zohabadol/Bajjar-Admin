import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";

const PaymentModal = ({ onClose }) => {
    const [btnLoading,setBtnLoading]=useState(false)
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
        <h2 className="text-xl font-semibold text-center mb-10">
          Vendor Payment
        </h2>



        {/* Data Table */}
        <DataTable
          columns={columns}
          data={data}
          noHeader
          pagination={false}
          highlightOnHover
          dense
        />

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[30%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full  cursor-pointer flex items-center justify-center gap-2 mt-14"
            >
              {btnLoading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {btnLoading ? "Saving..." : "Confirm Payment"}
            </button>
          </div>


      </div>
    </div>
  );
};

export default PaymentModal;
