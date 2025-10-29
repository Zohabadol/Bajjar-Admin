import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helpers";
import DetailsSkeleton from "../../../components/loading/detailsLoading";

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  console.log("product", product);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Product.show(id);
      if (response?.status === 200) {
        setProduct(response?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <DetailsSkeleton></DetailsSkeleton>;
  }
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4 shadow">
            <img
              src={`${import.meta.env.VITE_API_SERVER}${product?.thumbnail}`}
              alt={product?.product_name}
              className="w-full h-96 object-cover rounded-lg  "
            />
            <div className="flex gap-4 pl-4">
              {product?.product_image?.map((img, idx) => (
                <img
                  key={idx}
                  src={`${import.meta.env.VITE_API_SERVER}${img}`}
                  alt="product"
                  className="w-20 h-20 object-cover rounded "
                />
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-3">
            <h1 className="text-xl font-semibold">
              {" "}
              <span className="text-[#8B8B8B]">Product:</span>{" "}
              {product?.product_name}
            </h1>
            <p className="">
              {" "}
              <span className="text-[#8B8B8B]">Product:</span>{" "}
              {product?.short_description}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-green-600">
                <span className="text-[#8B8B8B]">Offer price :</span> ৳
                {product?.offer_price}
              </span>
              <span className="text-sm  ">
                <span className="text-[#8B8B8B]">Reguler price :</span>{" "}
                <span className=" line-through">৳{product?.reguler_price}</span>
              </span>
            </div>

            <p className="text-sm ">
              <span className="font-medium text-[#8B8B8B]">Stock:</span>{" "}
              {product?.stock} pcs
            </p>
            <p className="text-sm ">
              <span className="font-medium text-[#8B8B8B]">Sold:</span>{" "}
              {product?.sold} pcs
            </p>

            <p className="text-sm ">
              <span className="font-medium text-[#8B8B8B]">SKU:</span>{" "}
              {product?.sku}
            </p>
            <p className="text-sm ">
              <span className="font-medium text-[#8B8B8B]">Category:</span>{" "}
              {product?.category?.category_name}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-[#8B8B8B]">
            Description
          </h2>
          <p className="">{product?.description}</p>
        </div>

        {/* Vendor Section */}
        <div className="shadow  rounded-lg p-4 flex items-center gap-4">
          <img
            src={`${import.meta.env.VITE_API_SERVER}${product?.vendor?.logo}`}
            alt="vendor"
            className="w-16 h-16 rounded-full object-cover "
          />
          <div>
            <p className="text-md font-semibold ">
              <span className="text-[#8B8B8B]">Vendor : </span>
              {product?.vendor?.company_name}
            </p>
            <p className="text-sm ">
              <span className="text-[#8B8B8B]">Address : </span>
              {product?.vendor?.company_location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
