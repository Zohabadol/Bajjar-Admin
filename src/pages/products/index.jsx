import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import ListSkeleton from "../../components/loading/ListLoading";
import { Toastify } from "../../components/toastify";
import { IoDocumentTextOutline } from "react-icons/io5";
import Confirmation from "../../components/Confirmation/Confirmation";
import { Link } from "react-router-dom";

export default function ProductTable() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [data, setData] = useState([]);
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

  console.log("data", data);

  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);
      if (filterSearch) {
        queryParams.append("search", filterSearch);
      }
      const response = await NetworkServices.Product.index(
        queryParams.toString()
      );
      console.log("response", response);

      if (response?.status === 200) {
        setData(response?.data?.data.data || []);
        setTotalRows(response?.data?.data?.total || 0);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [currentPage, perPage, filterSearch]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleToggleStatus = async (ProductId, currentStatus) => {
    try {
      setStatusLoading(true);
      const formData = new FormData();
      formData.append("status", currentStatus === 1 ? 0 : 1);
      formData.append("_method", "PUT");

      const response = await NetworkServices.Product.update(
        ProductId,
        formData
      );
      if (response && response.status === 200) {
        Toastify.Success("Product status updated!");
        fetchProduct();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setStatusLoading(false);
    }
  };

  const destroy = (id) => {
    const dialog = Confirmation({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Product?",
      onConfirm: async () => {
        try {
          const response = await NetworkServices.Product.destroy(id);
          if (response?.status === 200) {
            Toastify.Info("Product deleted successfully.");
            fetchProduct();
          }
        } catch (error) {
          networkErrorHandeller(error);
        }
      },
    });

    dialog.showDialog();
  };

  // Columns for the table
  const columns = [
    {
      name: "SN",
      selector: (row, index) => `${(index + 1).toString().padStart(2, "0")}.`,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Vendor",
      selector: (row) => row?.vendor?.company_name,
      sortable: true,
    },

    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Sold",
      selector: (row) => row.sold,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center gap-4 items-center text-lg">
          <button
            title="Status"
            onClick={() => handleToggleStatus(row?.id, row?.status)}
            className={`w-10 h-6 rounded-full flex items-center px-1 transition cursor-pointer ${
              row.status == 1 ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform  ${
                row?.status == 1 ? "translate-x-4" : ""
              }`}
            ></div>
          </button>
          <div className="mt-2">
            <Link
              to={`/dashboard/product/${row.id}`}
              title="Show Details"
            >
              <button className="text-blue-600 text-xl cursor-pointer">
                <FaEye />
              </button>
            </Link>
          </div>
          <button
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
    document.title = "Admin | All-Product";
  }, []);

  return (
    <div className=" bg-white rounded-md mt-3">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-5">
        <h2 className="text-xl font-semibold text-primary">All Products</h2>
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

      <div className="bg-white  rounded overflow-y-auto mb-10">
        {loading ? (
          <ListSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            // customStyles={customStyles}
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
  );
}
