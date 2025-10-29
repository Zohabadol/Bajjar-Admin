import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import DetailsSkeleton from "../../components/loading/detailsLoading";
// import { FaUser, FaUserTag, FaWifi, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

const VendorDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState(null);
  // const [mikrotikStatus, setMikrotikStatus] = useState(true);

  const fetchVendor = async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Vendor.show(id);
      if (response?.status === 200) {
        setVendor(response?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchVendor();
    }
  }, [id]);

  if (loading) {
    return <DetailsSkeleton></DetailsSkeleton>;
  }

  return (
    <>
      {/* <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg border">
      
        <div className="bg-blue-900 h-20 rounded-t-lg flex items-center justify-center relative">
          <div className="absolute -bottom-10 w-20 h-20 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
            <FaUser className="text-gray-500 text-4xl" />
          </div>
        </div>


        <div className="mt-12 p-5 text-center">
          <h2 className="text-lg font-semibold">5048@@fahim</h2>

          <div className="mt-4 space-y-3 text-left">
            <p className="flex items-center gap-2 text-sm">
              <FaUserTag className="text-gray-600" />{" "}
              <span className="font-semibold">Client Code:</span> 0007
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaUser className="text-gray-600" />{" "}
              <span className="font-semibold">Client ID/IP:</span> 5048@@fahim
            </p>
            <p className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Billing Status:</span>
              <span className="text-green-600 font-semibold">Active</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaWifi className="text-gray-600" />
              <span className="font-semibold">Mikrotik Status:</span>
              <label className="inline-flex items-center cursor-pointer ml-2">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={mikrotikStatus}
                  onChange={() => setMikrotikStatus(!mikrotikStatus)}
                />
                <div className="relative w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500">
                  <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5"></span>
                </div>
              </label>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaCalendarAlt className="text-gray-600" />{" "}
              <span className="font-semibold">Creation Date:</span> 16 Sep 2024
            </p>
          </div>

          
          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-blue-900 text-white px-3 py-2 rounded text-sm">
                Update Information
              </button>
              <button className="bg-blue-900 text-white px-3 py-2 rounded text-sm">
                Status Scheduler
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-blue-900 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1">
                <FaEnvelope /> Send Email/Message
              </button>
              <button className="bg-blue-900 text-white px-3 py-2 rounded text-sm">
                Package Scheduler
              </button>
            </div>
            <button className="w-full bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm font-semibold">
              Download Information
            </button>
            <button className="w-full bg-blue-900 text-white px-3 py-2 rounded text-sm">
              Go To Client List
            </button>
          </div>
        </div>
      </div> */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Personal Information */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">
            Personal Contact Information
          </h2>
          <p>
            <span className="font-semibold text-gray-600">Phone:</span>{" "}
            {vendor?.phone_number}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Email:</span>{" "}
            {vendor?.email}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Date of Birth:</span>{" "}
            {new Date(vendor?.date_of_birth).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-gray-600">NID:</span>{" "}
            {vendor?.nid}
          </p>
        </div>

        {/* Company / Vendor Info */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">
            Vendor Information
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <img
              src={`${import.meta.env.VITE_API_SERVER}${vendor?.logo}`}
              alt="Logo"
              className="w-20 h-20 rounded object-cover "
            />
            <div>
              <p className="text-lg font-semibold">{vendor?.company_name}</p>
              <p className="text-sm text-gray-600">
                {vendor?.company_location}
              </p>
            </div>
          </div>
          <div>
            <p>
              <span className="font-semibold text-gray-600">
                Trade License:
              </span>
              <a
                href={`${import.meta.env.VITE_API_SERVER}${
                  vendor?.tread_licence
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 underline"
              >
                View Document
              </a>
            </p>
            <p>
              <span className="font-semibold text-gray-600">Role:</span>{" "}
              {vendor?.role}
            </p>
            <p>
              <span className="font-semibold text-gray-600">
                Account Active:
              </span>{" "}
              {vendor?.is_active ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDetails;
