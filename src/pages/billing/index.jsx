import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import BillingCard from "./billCard";
import Header from "../../components/heading/heading";
import { CiSearch } from "react-icons/ci";

export default function BillingList() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy Payment Data
  const [data, setData] = useState([
    {
      id: 1,
      userName: "John Doe",
      email: "john@example.com",
      phone: "+880123456789",
      orderId: "ORD-1001",
      paymentMethod: "bKash",
      transactionId: "TX12345678",
      amount: 2500,
      status: "Paid",
      date: "2025-08-20 14:32",
    },
    {
      id: 2,
      userName: "Jane Smith",
      email: "jane@example.com",
      phone: "+8801987654321",
      orderId: "ORD-1002",
      paymentMethod: "Visa Card",
      transactionId: "TX87654321",
      amount: 1500,
      status: "Pending",
      date: "2025-08-21 10:15",
    },
    {
      id: 3,
      userName: "Rahim Uddin",
      email: "rahim@example.com",
      phone: "+880177778888",
      orderId: "ORD-1003",
      paymentMethod: "Nagad",
      transactionId: "TX99887766",
      amount: 3200,
      status: "Paid",
      date: "2025-08-22 19:05",
    },
  ]);

  const columns = [
    { name: "SN.", selector: (row, index) => index + 1, width: "60px" },
    { name: "Customer Name", selector: (row) => row.userName, sortable: true },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Order ID", selector: (row) => row.orderId },
    { name: "Payment Method", selector: (row) => row.paymentMethod },
    { name: "Transaction ID", selector: (row) => row.transactionId },
    { name: "Amount", selector: (row) => `${row.amount} ৳`, sortable: true },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`px-2 py-1  text-white rounded-md ${
            row.status === "Paid" ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { name: "Date", selector: (row) => row.date },
  ];
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "400",
        fontSize: "14px",
        color: "#8B8B8B",
      },
    },
    rows: {
      style: {
        minHeight: "64px",
        borderBottom: "1px solid #E5E7EB",
        color: "#33363F",
      },
    },
    cells: {
      style: {
        paddingTop: "8px",
        paddingBottom: "8px",
        color: "#33363F",
      },
    },
  };

  useEffect(() => {
    document.title = "Admin | Billing";
  }, []);

  return (
    <>
      <BillingCard />
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-5">
          <h2 className="text-xl font-semibold text-primary">All Vendors</h2>
          <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
            <div className="relative w-48">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border border-lightBorder rounded-full focus:outline-none text-sm"
                // placeholder="Search"
              />
              {
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400 pointer-events-none">
                  <CiSearch className="text-lg mr-1" />
                  <span className="text-sm">search</span>
                </div>
              }
            </div>
          </div>
        </div>

        <div className="bg-white rounded  mb-10 ">
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            responsive
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
}
