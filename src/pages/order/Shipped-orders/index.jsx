import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helpers";
import ListSkeleton from "../../../components/loading/ListLoading";
import CreateRider from "../../../components/createRider/createRider";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

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

const ShippedOrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState(""); // search filter
  const [date, setDate] = useState(""); // created_at filter
  const [filterSearch, setFilterSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterSearch(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterDate(date);
    }, 1000);

    return () => clearTimeout(timer);
  }, [date]);

  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };
  const handleAssignClick = () => {
    setShowModal(true);
  };

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);
      queryParams.append("order_status", "shipped");
      if (filterSearch) queryParams.append("search", filterSearch);
      if (filterDate) queryParams.append("created_at", filterDate);
      const response = await NetworkServices.Order.index(
        queryParams.toString()
      );
      console.log("res", response);

      if (response?.status === 200) {
        setData(response?.data?.data?.data || []);
        setTotalRows(response?.data?.data?.total || 0);
      }
    } catch (error) {
      // console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [currentPage, perPage,filterSearch,filterDate]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const getStatusBadge = (status) => {
    const colorMap = {
      pending: "bg-[#FF6600] text-white rounded-full px-3",
      shipped: "bg-[#A600FF] text-white rounded-full px-3",
      delivered: "bg-[#13BF00] text-white rounded-full px-3",
      cancelled: "bg-[#DC2626] text-white rounded-full px-3",
      processing: "bg-[#3ABFEF] text-white rounded-full px-3",
    };
    return (
      <span className={`px-2 py-1 rounded text-sm ${colorMap[status] || ""}`}>
        {status}
      </span>
    );
  };

  const columns = [
    { name: "Order No.", selector: (row) => ` #${row.id}` },
    {
      name: "Date",
      sortable: true,
      cell: (row) => {
        const date = new Date(row.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        });

        return <div className="font-medium">{date}</div>;
      },
    },

    { name: "Customer", selector: (row) => row?.user?.name },
    {
      name: "Phone",
      cell: (row) => (
        <div className="whitespace-normal break-words ">{row?.user?.phone}</div>
      ),
    },

    { name: "Price", selector: (row) => row.total_amount },

    {
      name: "Order Status",
      cell: (row) => (
        <div className="text-nowrap">{getStatusBadge(row?.order_status)}</div>
      ),
    },
    {
      name: "Delivery Man",
      cell: (row) =>
        row.deliveryMan || (
          <button
            onClick={() => handleAssignClick(row)}
            className="text-blue-500 underline"
          >
            Assign
          </button>
        ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <Link to={`/dashboard/shipped-order/${row.id}`} title="Show Details">
            <button className="text-blue-600 text-xl cursor-pointer">
              <FaEye />
            </button>
          </Link>
        </div>
      ),
    },
  ];
  useEffect(() => {
    document.title = "Admin | Shipped-Order";
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 mt-5">
        {/* <div className="relative inline-block ">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="appearance-none w-full border border-lightBorder px-4 py-2 rounded-full bg-white focus:outline-none "
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <FiChevronDown className="text-gray-500 w-4 h-4" />
                  </div>
                </div> */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="    border border-lightBorder 
                px-3 py-2 
                rounded-full 
                outline-none 
                focus:outline-none 
                focus:ring-0
                focus:border-lightBorder"
        />
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

      <div className=" bg-white  rounded overflow-y-auto mb-10">
        {loading ? (
          <ListSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            highlightOnHover
            responsive
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationDefaultPage={currentPage}
          />
        )}
        {showModal && (
          <CreateRider
            onClose={() => setShowModal(false)}
            // fetchCategory={fetchCategory}
            // onSubmit={handleAddCategory}
          />
        )}
      </div>
    </>
  );
};

export default ShippedOrderList;
