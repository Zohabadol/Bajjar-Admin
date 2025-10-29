import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoColorPaletteOutline, IoSettingsOutline } from "react-icons/io5";
import {
  RiGalleryFill,
  RiMenuFold4Fill,
  RiProductHuntLine,
  RiShieldUserFill,
  
} from "react-icons/ri";
import { FaList, FaMoneyBillWave, FaUnity, FaUsers } from "react-icons/fa";
import { CgAttribution } from "react-icons/cg";

import {
  MdStorefront,
  MdAcUnit,
  MdEditAttributes,
} from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { TbPackages, TbTruckDelivery } from "react-icons/tb";
import { BsFillBagPlusFill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import { PiFlagBannerFill } from "react-icons/pi";

const Sidebar = ({ setIsSidebarOpen }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [open, setOpen] = useState(false);

  console.log("open", open);

  const location = useLocation();

  console.log("location", location);

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  const menuData = [
    {
      title: "Dashboard",
      icon: <RxDashboard />,
      path: "/dashboard",
    },

    {
      title: "Orders",
      icon: <FiFileText />,
      childrens: [
        {
          title: "All Orders",
          icon: <IoColorPaletteOutline />,
          path: "/dashboard/all-order",
        },

        {
          title: "Pending Orders",
          icon: <RiProductHuntLine />,
          path: "/dashboard/pending-order",
        },
        {
          title: "Processed Orders",
          icon: <RiProductHuntLine />,
          path: "/dashboard/processed-order",
        },
        {
          title: "Shipped Orders",
          icon: <RiProductHuntLine />,
          path: "/dashboard/shipped-order",
        },
        {
          title: "Completed Orders",
          icon: <RiProductHuntLine />,
          path: "/dashboard/complete-order",
        },
        {
          title: "Canceled Orders",
          icon: <RiProductHuntLine />,
          path: "/dashboard/canceled-order",
        },
      ],
    },

    {
      title: "Category",
      icon: <FaList />,
      childrens: [
        {
          title: "All Categories",
          icon: <IoColorPaletteOutline />,
          path: "/dashboard/all-category",
        },

        {
          title: "Sub Categories",
          icon: <RiProductHuntLine />,
          path: "/dashboard/sub-category",
        },
      ],
    },
    {
      title: "Vendors",
      icon: <MdStorefront />,
      path: "/dashboard/vendors",
    },
    {
      title: "Product",
      icon: <TbPackages />,
      childrens: [
        {
          title: "All Product",
          icon: <TbPackages />,
          path: "/dashboard/product",
        },
        {
          title: "Color",
          icon: <IoIosColorPalette />,
          path: "/dashboard/color",
        },
        {
          title: "Unit",
          icon: <MdAcUnit />,
          path: "/dashboard/unit",
        },
        {
          title: "Attribute",
          icon: <MdEditAttributes />,
          path: "/dashboard/attribute",
        },
        {
          title: "Brand",
          icon: <MdEditAttributes />,
          path: "/dashboard/brand",
        },
      ],
    },
    // {
    //   title: "profail",
    //   icon: <TbTruckDelivery />,
    //   path: "/dashboard/profail",
    // },

    // {
    //   title: "User",
    //   icon: <FaUsers />,
    //   path: "/dashboard/users",
    // },
    {
      title: "Admins",
      icon: <RiShieldUserFill />,
      path: "/dashboard/admins",
    },
    {
      title: "Earnings",
      icon: <BsFillBagPlusFill />,
      path: "/dashboard/earnings",
    },
    {
      title: "Banner",
      icon: <PiFlagBannerFill />,
      path: "/dashboard/banner",
    },
    {
      title: "Biling",
      icon: <FaMoneyBillWave />,
      path: "/dashboard/billing",
    },

  ];
  return (
    <>
      <div
        // overflow-y-auto scrollbar-thin bg-[#DC2626]
        className={`w-64  bg-primary dark:bg-darkCard dark:text-darkTitle   transition-all duration-300 mt-[0.5px] rounded-b-md h-full `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between w-full p-[18px]  border-gray-300 lg:hidden">
          {/* <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" /> */}

          <h1 className="text-2xl  font-bold pl-5 text-white ">Bajjar</h1>

          <button className="flex items-center justify-center w-10 h-10 rounded-md transition ">
            <RiMenuFold4Fill
              onClick={() => setIsSidebarOpen(false)}
              className={`text-xl transform transition-transform duration-300 z-50 cursor-pointer text-white `}
            />
          </button>
        </div>

        {/* Menu List */}
        <nav className="-mt-2 pt-3 overflow-y-auto md:overflow-hidden h-[calc(100vh-65px)] md:h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-5 ">
          {" "}
          {/* Prevents blue bar from going outside */}
          {menuData.map((item, index) => {
            const isActive = location.pathname === item.path;
            const bgColor = open == item.title;

            return (
              <div
                key={index}
                className="mb-2 relative overflow-y-auto gap-4 pl-3 pr-3 "
              >
                <Link
                  to={item.path}
                  className={`flex items-center w-full  text-left rounded-md 
                p-[10px] pl-4 transition-all duration-200 relative border-[1px] border-[#F3F4F6] text-white
                ${
                  isActive || bgColor
                    ? "bg-[#ffff] text-black!  font-semibold "
                    : " hover:text-black hover:bg-white "
                }
              `}
                  onClick={() => {
                    toggleMenu(item.title);
                    setOpen(item.title);
                  }}
                >
                  <span className="mr-3 flex-shrink-0 text-2xl p-1">
                    {item.icon}
                  </span>

                  {/* Title - Truncated for consistency */}
                  <div className="truncate w-full text- ">{item.title}</div>
                </Link>

                {/* Submenu Items (if exists) */}
                {item.childrens && openMenu === item.title && (
                  <div className="ml-6 mt-1 flex flex-col space-y-1">
                    {item.childrens.map((subItem, subIndex) => {
                      const isSubActive = location.pathname === subItem.path;

                      return (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`flex items-center text-sm rounded-md p-1 pl-4 transition-all duration-200 relative text-white 
                        ${
                          isSubActive
                            ? "  text-black! font-semibold"
                            : " hover:text-white"
                        }
                      `}
                        >
                          {/* Active Vertical Bar for Submenu */}

                          {/* Submenu Icon - Fixed Size */}
                          <span className="mr-2 flex-shrink-0 text-lg">
                            {/* {subItem.icon} */}
                          </span>

                          {/* Submenu Title - Truncated */}
                          <div className="truncate w-full ">
                            {subItem.title}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
