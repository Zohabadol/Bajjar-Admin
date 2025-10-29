import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helpers";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";

export default function CreateColorModal({ onClose,fetchColor }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const modalRef = useRef();

  const [btnloading, setBtnLoading] = useState(false);

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

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      setBtnLoading(true); // Loader চালু

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("hex_code", data.code);
      formData.append("is_active", data.status);


      const response = await NetworkServices.Color.store(formData);
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Color created successfully!");
        fetchColor()
        reset();
        onClose();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };

  



  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/85 to-black  flex items-center justify-center z-50 px-4">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-md w-[400px] "
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Create A New Color
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Category Name */}
          <div>
            <input
              type="text"
              placeholder="Color Name"
              {...register("name", { required: "Color name is required" })}
              className={`w-full px-4 py-2 border rounded-full focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm ">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Color Code"
              {...register("code", { required: "Color code is required" })}
              className={`w-full px-4 py-2 border rounded-full focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm ">{errors.code.message}</p>
            )}
          </div>

            <div className="relative w-full ">
              <select
                {...register("status", { required: true })}
                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none text-gray-500 pr-8 cursor-pointer "
                defaultValue=""
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option className="text-gray-500" value="1">
                   Active
                </option>
                <option className="text-gray-500" value="0">
                 Inactive
                </option>
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

          {/* Submit Button */}
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
              {btnloading ? "Saving..." : "Save Color"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
