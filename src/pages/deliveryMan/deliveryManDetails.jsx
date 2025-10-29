import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import OrderDetailsSkeleton from "../../components/loading/OrderDetailsSkeleton";
import DetailsSkeleton from "../../components/loading/detailsLoading";

const DeliveryManDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [rider, setRider] = useState(null);

  const fetchRider = async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Rider.show(id);
      if (response?.status === 200) {
        setRider(response?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchRider();
    }
  }, [id]);

  if (loading || !rider) {
    return (
        <DetailsSkeleton/>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 bg-white shadow rounded-lg p-6">
        <img
          src={`${import.meta.env.VITE_API_SERVER}${rider?.profile_image}`}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold capitalize">{rider?.name}</h2>
          <p className="text-gray-600">Role: {rider?.role}</p>
          <p className="text-sm text-green-600">
            Status: {rider.is_active ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Contact Information</h3>
        <p><span className="font-semibold text-gray-600">Phone:</span> {rider?.phone_number}</p>
        <p><span className="font-semibold text-gray-600">Email:</span> {rider?.email}</p>
        <p>
          <span className="font-semibold text-gray-600">Date of Birth:</span>{" "}
          {new Date(rider?.date_of_birth).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Joined On:</span>{" "}
          {new Date(rider?.created_at).toLocaleDateString()}
        </p>
      </div>


    </div>
  );
};

export default DeliveryManDetails;
