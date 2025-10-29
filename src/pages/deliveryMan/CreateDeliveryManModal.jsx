import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";

export default function CreateDeliveryManModal({ onClose }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const modalRef = useRef();
  const [imageName, setImageName] = useState("");

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      const formData = new FormData();
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("address", data.address);
      formData.append("nid", data.nid);
      formData.append("license", data.license);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("status", data.status);

      if (data.photo && data.photo[0]) {
        formData.append("photo", data.photo[0]);
      }

      const response = await NetworkServices.DeliveryMan.store(formData);
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Delivery Man created successfully!");
        reset();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const watchImage = watch("photo");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageName(watchImage[0].name);
    }
  }, [watchImage]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-[500px] max-h-screen overflow-y-auto"
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Create A New Delivery Man
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: true })}
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: true })}
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-full"
            />
          </div>

          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="NID No."
              {...register("nid", { required: true })}
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-full"
            />
            <input
              type="text"
              placeholder="Store License No."
              {...register("license", { required: true })}
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-full"
            />
          </div>

          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full"
          />

          <input
            type="email"
            placeholder="Email/Username"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full"
          />

          <input
            type="password"
            placeholder="Set Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full"
          />

          <label className="w-full block cursor-pointer">
            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-500 text-sm flex items-center gap-2">
              <CiCamera className="text-xl" />
              <span>{imageName || "Upload Photo"}</span>
            </div>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="hidden"
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value="DM ID: 982156"
              disabled
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-full text-gray-400"
            />
            <div className="relative w-full sm:w-1/2">
              <select
                {...register("status", { required: true })}
                defaultValue="active"
                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-full text-gray-500 pr-8"
              >
                <option value="active">Status : Active</option>
                <option value="inactive">Status : Inactive</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <RiArrowDropDownLine className="text-3xl" />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4"
            >
              Save Delivery Man
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
