import { Outlet } from "react-router-dom";
import Sidebar from "../components/menu-bar/sidebar";
import Header from "../components/menu-bar/header";
import { useState } from "react";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="flex h-full flex-col bg-[#FFFFFF] ">
      <div className="w-full">
        <Header toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1 ">
        <div
          className={`fixed top-0 left-0 z-40 transition-transform duration-300 lg:static lg:translate-x-0 min-h-full   ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar  setIsSidebarOpen={setIsSidebarOpen} />
        </div>


        <div className=" overflow-auto pt-0.5 px-3 w-full flex-1  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
