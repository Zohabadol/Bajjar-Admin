import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helpers";
import { CiCamera } from "react-icons/ci";

export default function CreateBannerModal({ onClose, fetchBanner }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const modalRef = useRef();

  const [btnloading, setBtnLoading] = useState(false);
  const [imageName, setImageName] = useState("");

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
      if (data.banner_image && data.banner_image[0]) {
        formData.append("image", data.banner_image[0]);
      }
      formData.append("status",1)

      const response = await NetworkServices.Banner.store(formData);
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Banner created successfully!");
        fetchBanner();
        reset();
        onClose();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };
  const watchImage = watch("banner_image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageName(watchImage[0].name);
    }
  }, [watchImage]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/85 to-black  flex items-center justify-center z-50 px-4">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-md w-[400px] "
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Create A Banner
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="w-full block">
              <div
                className={`w-full px-4 py-2 border rounded-lg bg-white text-sm cursor-pointer flex items-center gap-2 pl-4 ${
                  errors.image
                    ? "border-red-500 text-red-500"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <CiCamera className="text-xl" />
                <span>{imageName || "Upload Image / Icon"}</span>
              </div>
              <input
                type="file"
                {...register("banner_image", { required: "Image is required" })}
                className="hidden"
              />
            </label>
            {errors.image && (
              <p className="text-red-500 text-sm mt-">{errors.banner_image.message}</p>
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
              {btnloading ? "Saving..." : "Save Banner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
