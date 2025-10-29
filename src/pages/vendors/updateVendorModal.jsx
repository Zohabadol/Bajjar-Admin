import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
// import { networkErrorHandeller } from "../../../utils/helpers/index";
import { RiArrowDropDownLine } from "react-icons/ri";
import { networkErrorHandeller } from "../../utils/helpers";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";

// import { useNavigate } from "react-router-dom";

export default function VendorUpdateModal({ onClose, id }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const modalRef = useRef();
  const [btnloading, setBtnLoading] = useState(false);
  const [vendor, setVendor] = useState({});

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

  const fetchVendor = async () => {
    // setLoading(true);
    try {
      const response = await NetworkServices.Vendor.show(id);
      console.log("response", response);
      if (response && response.status === 200) {
        const vendor = response?.data?.data;
        setVendor(vendor);

        setValue("status", vendor?.is_active == 1 ? "1" : "0");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchVendor();
  }, [id]);

  const onFormSubmit = async (data) => {
  
    try {
      setBtnLoading(true); // Loader চালু

      const formData = new FormData();

      formData.append("is_active", data.status);
      formData.append("_method", "PUT");
      const response = await NetworkServices.Vendor.update(id, formData);
      

      if (response && response.status === 200) {
        Toastify.Success("Vendor Update successfully!");
        reset();
        onClose();
        fetchVendor();
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
          Update Vendor
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative  w-full">
              <select
                {...register("status", { required: false })}
                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none text-gray-500 pr-8"
                defaultValue="active"
              >
                <option className="text-gray-500" value="1">
                  Status : Active
                </option>
                <option className="text-gray-500" value="0">
                  Status : Inactive
                </option>
              </select>

              {/* Dropdown icon on the left */}
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <RiArrowDropDownLine className="text-3xl" />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4 cursor-pointer"
            >
              Update Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
