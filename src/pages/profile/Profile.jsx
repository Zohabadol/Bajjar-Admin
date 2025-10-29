import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import { ImageUpload, TextInput } from "../../components/input/index.";
import { useForm } from "react-hook-form";
// import { ImageUpload, TextInput } from '../../components/input';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Admin.Profail();
      console.log("response", response);
      if (response?.status === 200) {
        setData(response?.data?.data || null);
      }
    } catch (error) {
      console.error(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  useEffect(() => {
    if (data) {
      setValue("name", data?.name);
      setValue("phone", data?.phone);
      setValue("is_active", data?.is_active);
    }
  }, [data, setValue]);

  const openEditModal = () => {
    setEditForm(data); // Pre-fill form with existing data
    setIsEditOpen(true);
  };
  const handleUpdate = async (formData) => {
    console.log("clicked:", formData);

    try {
      const payload = new FormData();

      payload.append("name", formData.name);

      if (formData.logo instanceof File) {
        payload.append("image", formData.logo);
      }

      payload.append("_method", "PUT");

      for (let [key, val] of payload.entries()) {
        console.log(key, val);
      }

      // Send request
      const response = await NetworkServices.Admin.ProfailUpdate(payload);

      if (response?.status === 200 || response?.status === 201) {
        setIsEditOpen(false);
        fetchProfile();
      } else {
        console.error("Update failed", response);
      }
    } catch (error) {
      console.error(error);
      networkErrorHandeller(error);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10">
        <h1>loading</h1>
      </div>
    );
  if (!data)
    return (
      <div className="text-center mt-10 text-red-500">
        No profile data found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6  border border-primary rounded-xl relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
        <button
          onClick={openEditModal}
          className="px-4 py-2 bg-primary hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow"
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Content */}
      <div className="flex flex-col md:flex-row gap-6   items-center ">
        <img
          src={`${import.meta.env.VITE_API_SERVER}${data?.image}`}
          alt="Vendor Logo"
          className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow"
        />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <ProfileRow label="Admin Name" value={data.name} />
          {/* <ProfileRow label="Email" value={data.email} /> */}
          <ProfileRow label="Phone" value={data.phone} />

          {/* <ProfileRow
            label="Date of Birth"
            value={new Date(data.date_of_birth).toLocaleDateString()}
          /> */}
          {/* <ProfileRow label="NID" value={data.nid} /> */}
          {/* <ProfileRow label="Shop Type" value={data.shoptype ?? "N/A"} /> */}
          {/* <div>
            <p className="text-gray-500 text-sm">Status</p>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                data.is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {data.is_active ? "Active" : "Inactive"}
            </span>
          </div> */}
        </div>
      </div>

      {/* Images & Contact */}
      {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className={`text-lg  font-semibold  mb-2`}>Trade License</h3>
          <img
            src={`${import.meta.env.VITE_API_SERVER}${data?.tread_licence}`}
            alt="Trade License"
            className=" h-32 object-contain border rounded-md"
          />
        </div>
        <div>
          <h3 className={`text-lg font-semibold  mb-2`}>Owner Contact</h3>
          <p className="text-gray-600">
            <strong>Name:</strong> {data.contact_persone_name ?? "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {data.contact_persone_email ?? "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> {data.contact_persone_phone ?? "N/A"}
          </p>
        </div>
      </div> */}

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="bg-white p-6  rounded-xl w-full max-w-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold ">Edit Profile</h2>
            <div className="w-full max-w-4xl mx-auto ">
              <div className=" grid grid-cols-1 items-center gap-4">
                <TextInput
                  name="name"
                  label="Name"
                  placeholder="Enter Name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  error={errors.name?.message}
                />
                <div className="mt-">
                  <ImageUpload
                    name="logo"
                    control={control}
                    label="Logo"
                    onUpload={(file) => setValue("logo", file)}
                    imgUrl={data?.image}
                    error={errors.logo?.message}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default Profile;
