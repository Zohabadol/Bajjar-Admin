import React from "react";

export default function ProfailSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Profile Card Skeleton */}
      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="h-24 bg-gray-200 animate-pulse" />
        <div className="flex flex-col items-center p-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse -mt-10 border-4 border-white shadow" />
          <div className="h-4 w-32 bg-gray-200 animate-pulse mt-6 rounded shadow" />
          <div className="h-3 w-40 bg-gray-200 animate-pulse mt-4 rounded shadow" />
          <div className="h-3 w-32 bg-gray-200 animate-pulse mt-2 rounded shadow" />
        </div>
      </div>

      {/* Right Table Skeleton */}
      <div className="w-full md:w-2/3 bg-white shadow-lg rounded-xl p-4">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded shadow mb-4" />

        {/* Table Rows Skeleton */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 items-center py-3 border-b border-gray-100"
          >
            <div className="h-4 w-8 bg-gray-200 animate-pulse rounded shadow" />
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse shadow" />
            <div className="h-4 w-28 bg-gray-200 animate-pulse rounded shadow" />
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded shadow" />
            <div className="flex justify-center gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse shadow" />
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse shadow" />
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse shadow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
