// EarningsTable.jsx
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import PaymentModal from "./paymentModal";
import ListSkeleton from "../../components/loading/ListLoading";

const earningsData = [
  {
    id: 1,
    sn: "01.",
    vendor: "Bokhtiar Fashion",
    phone: "01778955196",
    totalSold: "250 TK",
    availableBalance: "250 TK",
    requestMoney: "200 TK",
    status: "Pending",
  },
  {
    id: 2,
    sn: "02.",
    vendor: "Shibly Juice Bar",
    phone: "01878955196",
    totalSold: "130 TK",
    availableBalance: "30 TK",
    requestMoney: "100 TK",
    status: "Sent",
  },
];

const columns = [
  {
    name: "SN",
    selector: (row) => row.sn,
    sortable: true,
    width: "70px",
  },
  {
    name: "Vendor",
    selector: (row) => row.vendor,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phone,
  },
  {
    name: "Total Sold",
    selector: (row) => row.totalSold,
  },
  {
    name: "Available Balance",
    selector: (row) => row.availableBalance,
  },
  {
    name: "Request Money",
    selector: (row) => row.requestMoney,
  },
  {
    name: "Status",
    cell: (row) =>
      row.status === "Pending" ? (
        <span className="text-orange-500 flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-orange-500 inline-block" />
          Pending
        </span>
      ) : (
        <span className="text-green-500 flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
          Sent
        </span>
      ),
  },
  // {
  //   name: "Action",
  //   cell: (row) =>
  //     row.status === "Sent" ? (
  //       <MdSend className="text-fuchsia-600 text-xl" title="Sent Icon" />
  //     ) : null,
  //   center: true,
  //   width: "80px",
  // },
];

export default function EarningsTable() {
  const [search, setSearch] = useState([]);
  const [showmodal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin | Earning";
  }, []);
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex  justify-between">
        <h1 className="text-red-600 text-xl font-bold mb-4">Earnings</h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <select className="border border-lightBorder  px-4 py-2 w-full md:w-48 rounded-full">
            <option>All Vendor</option>
          </select>

          <div className="relative w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-lightBorder rounded-full focus:outline-none text-sm"
              // placeholder="Search"
            />
            {
              <div className="absolute left-28 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400 pointer-events-none">
                <CiSearch className="text-lg mr-1" />
                <span className="text-sm">search</span>
              </div>
            }
          </div>
        </div>
      </div>

      {/* DataTable */}

      {loading ? (
        <ListSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={earningsData}
          pagination={false}
          highlightOnHover
          striped
          responsive
        />
      )}
      <div className="text-end">
        <button
          onClick={() => setShowModal(true)}
          className="text-[#D623FE] mt-4 "
        >
          sent icon here
        </button>
      </div>
      {showmodal && <PaymentModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
