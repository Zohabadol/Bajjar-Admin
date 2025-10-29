import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import CreateSubCategoryModal from "./createSubCateModal";
import Header from "../../../components/heading/heading";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helpers";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import { Toastify } from "../../../components/toastify";
import SubCategoryUpdate from "./SubCategoryUpdate";
import ListLoading from "../../../components/loading/ListLoading";
import ListSkeleton from "../../../components/loading/ListLoading";

export default function SubCategoryTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  console.log("dghdgh", data);

  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // Fetch categories from API
  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);
      if (search) {
        queryParams.append("search", search);
      }
      const response = await NetworkServices.Category.index(
        queryParams.toString()
      );
      console.log("response", response);

      if (response?.status === 200) {
        setData(response?.data?.data?.subcategories?.data || []);
        setTotalRows(response?.data?.data?.subcategories?.total || 0);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [currentPage, perPage, search]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleToggle = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const destroy = (id) => {
    console.log("first", id);
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Category.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Category deleted successfully.");
                fetchCategory();
              }
            } catch (error) {
              networkErrorHandeller(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const columns = [
    // {
    //   name: "SN.",
    //   selector: (row) => row?.serial_num + ".",
    // },
    {
      name: "Image",
      selector: (row) => row?.category_image,
      cell: (row) => (
        <div className="w-12 h-10 bg-[#FFFFFF] shadow-md rounded-sm flex items-center justify-center transition-transform duration-300 hover:shadow-xl scale-105">
          <img
            className="w-8 h-6  "
            src={`${import.meta.env.VITE_API_SERVER}${row?.category_image}`}
            alt={row.name}
          />
        </div>
      ),
    },

    {
      name: "Child Name",
      selector: (row) => row?.category_name,
    },
    {
      name: "Category",
      selector: (row) => row?.parent?.category_name,
    },

    // {
    //   name: "Status",
    //   cell: (row) => (
    //     <button
    //       onClick={() => handleToggle(row.status)}
    //       className={`w-10 h-6 rounded-full flex items-center px-1 transition ${
    //         row?.status == 1 ? "bg-green-500" : "bg-gray-300"
    //       }`}
    //     >
    //       <div
    //         className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
    //           row?.status ? "translate-x-4" : ""
    //         }`}
    //       ></div>
    //     </button>
    //   ),
    // },
    {
      name: "Status",
      cell: (row) => <span>{row?.status === 1 ? "Active" : "Inactive"}</span>,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-3 text-lg cursor-pointer">
          <button
            title="Edit"
            onClick={() => {
              setSelectedCategoryId(row?.category_id);
              setUpdateModal(true);
            }}
            className=""
          >
            <RiEdit2Fill className="cursor-pointer" />
          </button>
          <button
            title="Delete"
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => destroy(row?.category_id)}
          >
            <FaTrashCan />
          </button>
        </div>
      ),
    },
  ];

  // if (loading) {
  //   <ListLoading></ListLoading>;
  // }

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
    document.title = "Admin | Sub-Category";
  }, []);

  return (
    <div className="mt-3 bg ">
      <Header
        title="All Sub Categories"
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        onAddClick={() => setShowModal(true)}
      />

      <div className=" bg-white  rounded overflow-y-auto mb-10">
        {loading ? (
          <ListSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            responsive
            highlightOnHover
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationDefaultPage={currentPage}
          />
        )}
      </div>
      {showModal && (
        <CreateSubCategoryModal
          onClose={() => setShowModal(false)}
          fetchCategory={fetchCategory}
          // onSubmit={handleAddCategory}
        />
      )}
      {updateModal && (
        <SubCategoryUpdate
          categoryId={selectedCategoryId}
          onClose={() => setUpdateModal(false)}
          // onSubmit={handleAddCategory}
          fetchCategory={fetchCategory}
        />
      )}
    </div>
  );
}
