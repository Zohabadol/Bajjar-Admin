import React from "react";

const OrderDetailsSkeleton = () => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-lg space-y-6 animate-pulse">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-200 rounded" />
            <div className="w-16 h-4 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2">
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="w-32 h-4 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-200 rounded" />
            <div className="w-28 h-4 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              {/* <tr>
                {["Image", "Product Name", "Vendor", "Quantity", "Total Price"].map((title, index) => (
                  <th key={index} className="p-3 font-semibold text-gray-500">{title}</th>
                ))}
              </tr> */}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(2)].map((_, index) => (
                <tr key={index}>
                  <td className="p-2">
                    <div className="w-10 h-12 bg-gray-200 rounded" />
                  </td>
                  <td className="p-2">
                    <div className="w-32 h-4 bg-gray-200 rounded" />
                  </td>
                  <td className="p-2">
                    <div className="w-28 h-4 bg-gray-200 rounded" />
                  </td>
                  <td className="p-2 text-center">
                    <div className="w-6 h-4 mx-auto bg-gray-200 rounded" />
                  </td>
                  <td className="p-2 text-center">
                    <div className="w-12 h-4 mx-auto bg-gray-200 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {["pending", "processing", "shipped", "delivered", "cancelled"].map((_, i) => (
            <div key={i} className="w-20 h-8 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
