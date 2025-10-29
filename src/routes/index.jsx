import Details from "../components/details/Details";
import { DashboardLayout } from "../layouts/dashboard.layout";
import Admins from "../pages/admins";
import AttributeTable from "../pages/attribute";
import BannerTable from "../pages/Banner";
import BillingList from "../pages/billing";
import BrandTable from "../pages/Brand";
import CategoryTable from "../pages/category/allcategory";
import SubCategoryTable from "../pages/category/subcategory";
import ColorTable from "../pages/color";

import Dashboard from "../pages/Dashboard/Dashboard";
import Profail from "../pages/deliveryMan";
import DeliveryMan from "../pages/deliveryMan";
import DeliveryManDetails from "../pages/deliveryMan/deliveryManDetails";
import EarningsTable from "../pages/earnings";
import AllOrderList from "../pages/order/all-order";
import CanceledOrderList from "../pages/order/canceled-order";
import CompleteOrderList from "../pages/order/completed-order";
import PendingOrderList from "../pages/order/pending-order";
import ProcessedOrderList from "../pages/order/processed";
import ShippedOrderList from "../pages/order/Shipped-orders";
import ProductTable from "../pages/products";
import ProductDetails from "../pages/products/productaDetails/productDetails";
import Profile from "../pages/profile/Profile";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import UnitTable from "../pages/unit";
import User from "../pages/user";
import AllVendorsTable from "../pages/vendors";
import VendorDetails from "../pages/vendors/vendorDetails";
import { getToken } from "../utils/helpers";

// import { getToken } from "../utils/helpers";

const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard></Dashboard> },
      // category
      { path: "all-category", element: <CategoryTable /> },
      //sub  category
      { path: "sub-category", element: <SubCategoryTable /> },
      // order
      // all order
      { path: "all-order", element: <AllOrderList /> },
      { path: "all-order/:id", element: <Details /> },
      // pending order
      { path: "pending-order", element: <PendingOrderList /> },
      { path: "pending-order/:id", element: <Details /> },
      // processed order
      { path: "processed-order", element: <ProcessedOrderList /> },
      { path: "processed-order/:id", element: <Details /> },
      // shipped-order
      { path: "shipped-order", element: <ShippedOrderList /> },
      { path: "shipped-order/:id", element: <Details /> },
      // complete-order
      { path: "complete-order", element: <CompleteOrderList /> },
      { path: "complete-order/:id", element: <Details /> },
      // canceled-order
      { path: "canceled-order", element: <CanceledOrderList /> },
      { path: "canceled-order/:id", element: <Details /> },
      // vendors
      { path: "vendors", element: <AllVendorsTable /> },
      { path: "vendors/:id", element: <VendorDetails /> },
      // product
      { path: "product", element: <ProductTable /> },
      { path: "product/:id", element: <ProductDetails /> },
      // delivery man
      // { path: "delivery-man", element: <DeliveryMan /> },
      // { path: "delivery-man/:id", element:<DeliveryManDetails /> },
      { path: "profail", element: <Profail /> },
      { path: "delivery-man/:id", element:<DeliveryManDetails /> },
      // user
      { path: "users", element: <User /> },
      // admin
      { path: "admins", element: <Admins /> },
      // earningd
      { path: "earnings", element: <EarningsTable /> },
      //  color
      { path: "color", element: <ColorTable /> },
      //  unit
      { path: "unit", element: <UnitTable /> },
      //  unit
      { path: "attribute", element: <AttributeTable /> },
      //  brand
      { path: "brand", element: <BrandTable /> },
      //  banner
      { path: "banner", element: <BannerTable /> },
      //  billing
      { path: "billing", element: <BillingList /> },
      //  profile
      { path: "profile", element: <Profile /> },
      //  reset pass
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
];

/* Generate permitted routes */
export const permittedRoutes = () => {
  const token = getToken();

  if (token) {
    return appRoutes;
  }

  return [];
};
