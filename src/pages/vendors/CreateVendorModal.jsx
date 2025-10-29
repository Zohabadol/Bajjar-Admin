import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";

export default function CreateVendorModal({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const modalRef = useRef();
  const [imageName, setImageName] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  

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
    try {
      setBtnLoading(true);

      const formData = new FormData();
      formData.append("store_name", data.store_name);
      formData.append("store_id", data.store_id);
      formData.append("category", data.category);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("address", data.address);
      formData.append("nid", data.nid);
      formData.append("license", data.license);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("status", data.status);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await NetworkServices.Vendor.store(formData);

      if (response && response.status === 200) {
        Toastify.Success("Vendor created successfully!");
        reset();
        onClose();
      } else {
        Toastify.Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("❌ Submission Error:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const onFormError = (error) => {
    console.warn("⚠️ Validation Errors:", error);
  };

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageName(watchImage[0].name);
    }
  }, [watchImage]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white px-4 md:px-8 py-5 rounded-2xl shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[95vh] overflow-y-auto mx-4"
      >
        <h2 className="text-center text-xl font-semibold mb-4">
          Create A New Vendor
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit, onFormError)} className="space-y-2">

          {/* Store Name & Category */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Store Name"
              {...register("store_name", { required: true })}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
            <select
              {...register("category", { required: true })}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none text-gray-500"
            >
              <option value="">Store Category</option>
              <option value="fashion">Fashion</option>
              <option value="grocery">Grocery</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          {/* Owner Name */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Owner First Name"
              {...register("first_name", { required: true })}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
            <input
              type="text"
              placeholder="Owner Last Name"
              {...register("last_name", { required: true })}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>

          {/* Address */}
          <input
            type="text"
            placeholder="Store Address"
            {...register("address", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />

          {/* NID & License */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Owner NID No."
              {...register("nid", { required: true })}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
            <input
              type="text"
              placeholder="Store License No."
              {...register("license", { required: true })}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />

          {/* Email */}
          <input
            type="text"
            placeholder="Email/Username"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Set Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />

          {/* Upload Image */}
          <label className="w-full block">
            <div className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-500 text-sm cursor-pointer flex items-center gap-2 pl-4">
              <CiCamera className="text-xl" />
              <span>{imageName || "Upload Store Image / Logo"}</span>
            </div>
            <input
              type="file"
              {...register("image", { required: true })}
              className="hidden"
            />
          </label>

          {/* Store ID & Status */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Store ID"
              {...register("store_id", { required: true })}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full text-gray-500 focus:outline-none"
            />
            <select
              {...register("status", { required: true })}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none text-gray-500"
            >
              <option value="active">Status: Active</option>
              <option value="inactive">Status: Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-[60%] md:w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4 cursor-pointer"
              disabled={btnLoading}
            >
              {btnLoading ? "Saving..." : "Save Vendors"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
