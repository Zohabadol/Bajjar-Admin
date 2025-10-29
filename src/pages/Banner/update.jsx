import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import { Toastify } from "../../components/toastify";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";
import UpdateSkeleton from "../../components/loading/updateLoading";

export default function BannerUpdateModal({ onClose, id, fetchBanner }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const modalRef = useRef();
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [banner, setBanner] = useState([]);

  console.log("bannry", banner);

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
  const fetchBannerList = async (id) => {
    setLoading(true);
    try {
      const response = await NetworkServices.Banner.show(id);
      console.log("responseeeee", response.data.data);
      if (response && response.status === 200) {
        const banner = response?.data?.data;
        setBanner(banner);

        setValue("banner_image", banner.banner_image);
      }
    } catch (error) {
      // console.error("Error fetching category:", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchBannerList(id);
    }
  }, [id]);

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      setBtnLoading(true); // Loader চালু
      const formData = new FormData();

      formData.append("banner_image", data.banner_image[0]);

      formData.append("status", 1);

      formData.append("_method", "PUT");

      const response = await NetworkServices.Banner.update(id, formData);
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Banner Update successfully!");
        reset();
        onClose();
        fetchBanner();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const watchImage = watch("banner_image");

  console.log("watchImage", watchImage);

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageName(watchImage[0].name);
    }
  }, [watchImage]);

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
            Update Banner
          </h2>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <label className="w-full block">
              <div className="w-full   border border-gray-300 rounded-lg bg-white text-gray-500 text-sm cursor-pointer flex items-center gap-2 ">
                {imageName ? (
                  <>
                    <div className="flex items-center gap-2 px-3">
                      <CiCamera className="text-xl" />
                      <span className="py-2">{imageName}</span>
                    </div>
                  </>
                ) : banner.banner_image ? (
                  <img
                    src={`${import.meta.env.VITE_API_SERVER}${
                      banner.banner_image
                    }`}
                    alt="Current Category"
                    className="w-10 h-[38px]  rounded"
                  />
                ) : (
                  <span className="py-2 px-3">Upload Image / Icon</span>
                )}
              </div>
              <input
                type="file"
                {...register("banner_image", { required: false })}
                className="hidden"
              />
            </label>

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
                {btnloading ? "Saving..." : "Update Banner"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
