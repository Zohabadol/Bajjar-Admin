import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { confirmAlert } from "react-confirm-alert";
import { Toastify } from "../../components/toastify";
import DataTable from "react-data-table-component";
import ListSkeleton from "../../components/loading/ListLoading";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";
import Header from "../../components/heading/heading";
import { networkErrorHandeller } from "../../utils/helpers";
import CreateUnitModal from "./CreateModal";
import UnitUpdateModal from "./updateUnitModal";

export default function UnitTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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
  const fetchUnit = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);
      if (search) {
        queryParams.append("search", search);
      }
      const response = await NetworkServices.Unit.index(queryParams.toString());
      console.log("response", response);

      if (response?.status === 200) {
        setData(response?.data?.data?.data || []);
        setTotalRows(response?.data?.data?.total || 0);
      }
    } catch (error) {
      // console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [perPage, currentPage, search]);

  useEffect(() => {
    fetchUnit();
  }, [fetchUnit]);

  console.log("search", search);

  const destroy = (id) => {
    console.log("first", id);
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Unit?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Unit.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Unit deleted successfully.");
                fetchUnit();
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
    {
      name: "SN.",
      selector: (row, index) => `${(index + 1).toString().padStart(2, "0")}.`,
    },

    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-3 text-lg ">
          <button
            title="Edit"
            onClick={() => {
              setSelectedId(row?.id);
              setUpdateModal(true);
            }}
            className="cursor-pointer"
          >
            <RiEdit2Fill />
          </button>
          <button
            title="Delete"
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <FaTrashCan onClick={() => destroy(row?.id)} />
          </button>
        </div>
      ),
    },
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
    document.title = "Admin | Unit";
  }, []);
  return (
    <div className="mt-3 bg ">
      <Header
        title="All Unit"
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
        <CreateUnitModal
          onClose={() => setShowModal(false)}
          // onSubmit={handleAddCategory}
          fetchUnit={fetchUnit}
        />
      )}

      {updateModal && (
        <UnitUpdateModal
          id={selectedId}
          onClose={() => setUpdateModal(false)}
          fetchUnit={fetchUnit}
        />
      )}
    </div>
  );
}
