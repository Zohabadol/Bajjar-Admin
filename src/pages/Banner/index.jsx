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
import CreateBannerModal from "./CreateModal";
import BannerUpdateModal from "./update";


export default function BannerTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("selectedId",selectedId)

  // Fetch categories from API
  const fetchBanner = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Banner.index();
      console.log("response", response);

      if (response?.status === 200) {
        setData(response?.data?.data || []);
      }
    } catch (error) {
      // console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  console.log("search", search);

  const destroy = (id) => {
    console.log("first", id);
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Banner?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Banner.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Banner deleted successfully.");
                fetchBanner();
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
      name: "Image",
      cell: (row) => (
        <img
          src={`${import.meta.env.VITE_API_SERVER}${row?.banner_image}`}
          alt={row?.name}
          className="w-40 h-14  object-cover shadow-2xl p-2 transform scale-105 z-10"
        />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-3 text-lg ">
          <button
            title="Edit"
            onClick={() => {
                setSelectedId(row?.banner_id);
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
            <FaTrashCan onClick={() => destroy(row?.banner_id)} />
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
    document.title = "Admin | Banner";
  }, []);

  return (
    <div className="mt-3 bg ">
      <Header
        title="All Banner"
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
          />
        )}
      </div>
      {showModal && (
        <CreateBannerModal
          onClose={() => setShowModal(false)}
          // onSubmit={handleAddCategory}
          fetchBanner={fetchBanner}
        />
      )}

      {updateModal && (
        <BannerUpdateModal
          id={selectedId}
          onClose={() => setUpdateModal(false)}
          fetchBanner={fetchBanner}
        />
      )}
    </div>
  );
}
