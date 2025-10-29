import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
import { NetworkServices } from "../../../network";
import { Toastify } from "../../../components/toastify";
// import { networkErrorHandeller } from "../../../utils/helpers/index";
import { RiArrowDropDownLine } from "react-icons/ri";
import { networkErrorHandeller } from "../../../utils/helpers";

export default function CreateSubCategoryModal({ onClose, fetchCategory }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const modalRef = useRef();
  //   const [imageName, setImageName] = useState("");
  const [btnloading, setBtnLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageName, setImageName] = useState("");
   const [loading, setLoading] = useState(false);

  console.log("categories", categories);

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

  // const fetchCategoryItem = useCallback(async () => {

  //   // setLoading(true);
  //   try {
  //     const response = await NetworkServices.Category.index();
  //     console.log("first", response);
  //     if (response && response.status === 200) {
  //       // setCategories(response?.data?.data);
  //       const categories = response?.data?.data?.categories?.data.map((item) => ({
  //         value: item.category_id,
  //         name: item.category_name,
  //       }));
  //       setCategories(categories);
  //     }
  //   } catch (error) {
  //     networkErrorHandeller(error);
  //   }
  //   // setLoading(false);
  // }, []);

  // // category api fetch
  // useEffect(() => {
  //   fetchCategoryItem();
  // }, [fetchCategoryItem]);

    const fetchCategoryItem = useCallback(async () => {
      setLoading(true);
      try {
        const response = await NetworkServices.Category.allCategory();
        console.log("first", response);
        if (response && response.status === 200) {
          // setCategories(response?.data?.data);
          const categories = response?.data?.data?.map((item) => ({
            value: item?.category_id,
            name: item.category_name,
          }));
          setCategories(categories);
        }
      } catch (error) {
        networkErrorHandeller(error);
      }
      setLoading(false);
    }, []);
  
    // category api fetch
    useEffect(() => {
      fetchCategoryItem();
    }, [fetchCategoryItem]);

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      setBtnLoading(true); // Loader চালু

      const formData = new FormData();
      formData.append("category_name", data.name);
      formData.append("parent_id", data.category);

      formData.append("status", data.status);
      if (data.image && data.image[0]) {
        formData.append("category_image", data.image[0]);
      }

      const response = await NetworkServices.Category.store(formData);
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success(" Successfully created the subcategory.");
        reset();
        onClose();
        fetchCategory();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageName(watchImage[0].name);
    }
  }, [watchImage]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/85 to-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-md w-[450px] "
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Create A New Sub Category
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Sub-Category Name"
              {...register("name", {
                required: "Sub-category name is required",
              })}
              className={`w-full px-4 py-2 border rounded-full focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <select
              {...register("category", {
                required: "Please select a parent category",
              })}
              className={`appearance-none w-full px-4 py-2 border rounded-full focus:outline-none text-gray-500 pr-8 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              defaultValue=""
              placeholder=""
            >
              <option value="" disabled>
                Select Parent Category
              </option>

              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div
              className={`pointer-events-none absolute right-3 ${
                errors.category ? "top-2" : "top-1/2 transform -translate-y-1/2"
              } text-gray-400`}
            >
              <RiArrowDropDownLine className="text-3xl" />
            </div>

            {errors.category && (
              <p className="text-red-500 text-sm mt-">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className=" ">
            <div className="relative ">
              <select
                {...register("status", { required: false })}
                className={`appearance-none w-full px-4 py-2 border rounded-full focus:outline-none text-gray-500 pr-8 ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
                defaultValue="1"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>

              <div
                className={`pointer-events-none absolute right-3 text-gray-400 ${
                  errors ? "top-2" : "top-1/2 transform -translate-y-1/2"
                }`}
              >
                <RiArrowDropDownLine className="text-3xl" />
              </div>

              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
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
                {...register("image")}
                className="hidden"
              />
            </label>
            {errors.image && (
              <p className="text-red-500 text-sm mt-">{errors.image.message}</p>
            )}
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4 cursor-pointer flex items-center justify-center gap-2"
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
              {btnloading ? "Saving..." : "Save Sub Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
