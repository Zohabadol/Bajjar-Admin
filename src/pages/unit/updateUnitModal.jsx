import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import { Toastify } from "../../components/toastify";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";
import UpdateSkeleton from "../../components/loading/updateLoading";

export default function UnitUpdateModal({ onClose, id, fetchUnit }) {
  const { register, handleSubmit, reset,  setValue } = useForm();
  const modalRef = useRef();
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [unit, setUnit] = useState([]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Fetch the category details from the API and populate the form
  const fetchUnitList = async (id) => {
    setLoading(true);
    try {
      const response = await NetworkServices.Unit.show(id);
      console.log("response", response.data.data);
      if (response && response.status === 200) {
        const unit = response?.data?.data;
        setUnit(unit);

        setValue("name", unit.name);
      }
    } catch (error) {
      // console.error("Error fetching category:", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchUnitList(id);
    }
  }, [id]);

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      setBtnLoading(true); // Loader চালু

      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("_method", "PUT");

      const response = await NetworkServices.Unit.update(id, formData);
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Color Update successfully!");
        reset();
        onClose();
        fetchUnit();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/85 to-black  flex items-center justify-center z-50 px-4">
            {loading ? (
        <UpdateSkeleton />
      ) : (
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-md w-[400px] "
      >
        <h2 className="text-center text-xl font-semibold mb-6">Update Unit</h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Color Name"
            {...register("name", { required: false })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              {btnloading && (
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
              {btnloading ? "Saving..." : "Update Unit"}
            </button>
          </div>
        </form>

      </div>
      )}
    </div>
  );
}
