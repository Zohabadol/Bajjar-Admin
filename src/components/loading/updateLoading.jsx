import React from "react";

const UpdateSkeleton = () => {
  return (
    <div className="w-[400px] p-8 rounded-lg shadow-lg bg-white">
      {/* Title */}
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6 mx-auto"></div>

      {/* Input fields */}
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Button */}
      <div className="h-8 w-1/2 mx-auto bg-green-200 rounded-md animate-pulse mt-6"></div>
    </div>
  );
};

export default UpdateSkeleton;
