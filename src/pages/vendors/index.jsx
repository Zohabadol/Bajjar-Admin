import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import ListSkeleton from "../../components/loading/ListLoading";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiWallet3Fill } from "react-icons/ri";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import Confirmation from "../../components/Confirmation/Confirmation";
import { Toastify } from "../../components/toastify";
import { Link } from "react-router-dom";

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

export default function AllVendorsTable() {
  // const [showModal, setShowModal] = useState(false);
  // const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterSearch(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  console.log("searchxx", search);

  console.log("totalRows", totalRows);
  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // Fetch vendor from API
  const fetchVendor = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);
      if (filterSearch) {
        queryParams.append("search", filterSearch);
      }
      const response = await NetworkServices.Vendor.index(
        queryParams.toString()
      );
      console.log("response", response);

      if (response?.status === 200) {
        setVendor(response?.data?.data.data || []);
        setTotalRows(response?.data?.data?.total || 0);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [currentPage, perPage, filterSearch]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  const destroy = (id) => {
    const dialog = Confirmation({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Vendor?",
      onConfirm: async () => {
        try {
          const response = await NetworkServices.Vendor.destroy(id);
          if (response?.status === 200) {
            Toastify.Info("Vendor deleted successfully.");
            fetchVendor();
          }
        } catch (error) {
          networkErrorHandeller(error);
        }
      },
    });

    dialog.showDialog();
  };

  const handleToggleStatus = async (vendorId, currentStatus) => {
    try {
      setStatusLoading(true);
      const formData = new FormData();
      formData.append("is_active", currentStatus === 1 ? 0 : 1);
      formData.append("_method", "PUT");

      const response = await NetworkServices.Vendor.update(vendorId, formData);
      if (response && response.status === 200) {
        Toastify.Success("Vendor status updated!");
        fetchVendor();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setStatusLoading(false);
    }
  };

  const columns = [
    {
      name: "SN.",
      selector: (row, index) => `${(index + 1).toString().padStart(2, "0")}.`,
      width: "70px",
      center: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          // src={row.logo}
          src={`${import.meta.env.VITE_API_SERVER}${row?.logo}`}
          alt={row?.name}
          className="w-14 h-14 rounded-full object-cover shadow-2xl p-2 transform scale-105 z-10"
        />
      ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row?.company_name,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row?.company_location,
      sortable: true,
    },
    // {
    //   name: "Available Products",
    //   selector: (row) => row.products,
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center items-center gap-4 text-lg ">
          <button
            title="Status"
            onClick={() => handleToggleStatus(row?.id, row?.is_active)}
            className={`w-10 h-6 rounded-full flex items-center px-1 transition cursor-pointer ${
              row.is_active == 1 ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform  ${
                row?.is_active == 1 ? "translate-x-4" : ""
              }`}
            ></div>
          </button>
          <div className="mt-2">
            <Link
              to={`/dashboard/vendors/${row.id}`}
              title="Show Details"
            >
              <button className="text-blue-600 text-xl cursor-pointer">
                <FaEye />
              </button>
            </Link>
          </div>

          <button
            title="Delete"
            onClick={() => destroy(row?.id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    document.title = "Admin | Vendor";
  }, []);

  return (
    <>
      <div className=" bg-white rounded-lg  mt-3">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-5">
          <h2 className="text-xl font-semibold text-primary">All Vendors</h2>
          <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
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
        {statusLoading && (
          <div className="fixed  inset-0 bg-black/80  z-[9999] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="bg-white  rounded overflow-y-auto mb-10">
          {loading ? (
            <ListSkeleton />
          ) : (
            <DataTable
              columns={columns}
              data={vendor}
              customStyles={customStyles}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              paginationPerPage={perPage}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              paginationDefaultPage={currentPage}
              responsive
              highlightOnHover
            />
          )}
        </div>
      </div>
    </>
  );
}
