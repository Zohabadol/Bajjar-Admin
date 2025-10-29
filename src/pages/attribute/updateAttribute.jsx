import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import { Toastify } from "../../components/toastify";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";
import UpdateSkeleton from "../../components/loading/updateLoading";

export default function AttributUpdateModal({ onClose, id, fetchAttribute }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const modalRef = useRef();

  const [btnloading, setBtnLoading] = useState(false);
  const [unit, setUnit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);

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

  const fetchUnit = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Unit.index();
      console.log("runoit", response);

      if (response?.status === 200) {
        setData(response?.data?.data.data || []);
      }
    } catch (error) {
      // console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUnit();
  }, [fetchUnit]);

  // Fetch the category details from the API and populate the form
  const fetchColorList = async (id) => {
    // setLoading(true);
    try {
      const response = await NetworkServices.Attribute.show(id);
      console.log("response", response.data.data);
      if (response && response.status === 200) {
        const unit = response?.data?.data;
        setUnit(unit);

        setValue("name", unit.name);
        setValue("unit", unit.unit_id);
      }
    } catch (error) {
      // console.error("Error fetching category:", error);
      networkErrorHandeller(error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchColorList(id);
    }
  }, [id]);

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      setBtnLoading(true); // Loader চালু

      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("unit_id", data.unit);

      formData.append("_method", "PUT");

      const response = await NetworkServices.Attribute.update(id, formData);
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Attribute Update successfully!");
        reset();
        onClose();
        fetchAttribute();
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
        <h2 className="text-center text-xl font-semibold mb-6">
          Update Attribute
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Color Name"
            {...register("name", { required: false })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />


          <div className="relative w-full ">
            <select
              {...register("unit", { required: true })}
              className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none text-gray-500 pr-8 "
              defaultValue="active"
            >
              <option value="0">Select Attribute</option>
              {data &&
                data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <div
              className={`pointer-events-none absolute right-3 text-gray-400 ${
                errors ? "top-2" : "top-1/2 transform -translate-y-1/2"
              }`}
            >
              <RiArrowDropDownLine className="text-3xl " />
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm mt-">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4 flex items-center justify-center gap-2"
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
              {btnloading ? "Saving..." : "Update Attribute"}
            </button>
          </div>
        </form>

      </div>
      )}
    </div>
  );
}
