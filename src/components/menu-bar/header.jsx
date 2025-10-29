import React, { useState, useRef, useCallback, useEffect } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import userimg from "../../assets/logo/userimg.jpg";
import { CiSettings } from "react-icons/ci";
import { MdOutlineNotificationsActive, MdVpnKey } from "react-icons/md";
import { RiFullscreenFill, RiMenuUnfold3Fill } from "react-icons/ri";
import { networkErrorHandeller, removeToken } from "../../utils/helpers";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { NetworkServices } from "../../network";
import { FaPhoneAlt } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [profile, setProfile] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  console.log("profile", profile);

  const logout = () => {
    removeToken();
    navigate(`/login?redirectFrom=${window.location.pathname}`);
  };

  const handleFullscreen = () => {
    const element = document.documentElement; // You can also use any specific element
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error("Failed to enable fullscreen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const fetchUser = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await NetworkServices.Admin.Profail();
      console.log("responsprrrre", response);
      if (response && response.status === 200) {
        setProfile(response?.data.data);
      }
    } catch (error) {
      // console.error("Fetch User Error:", error);
      networkErrorHandeller(error);
    }
    // setLoading(false);
  }, []);

  // category api fetch
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
 

  return (
    <div
     // bg-[#DC2626]
      className={` bg-primary dark:bg-darkCard  py-4 px-2 shadow-sm  w-full `}
    >
      <div className="flex justify-between gap-5 items-center relative ">
        <div>
          <Link to="/dashboard">
            <h1 className="text-2xl text-white font-bold pl-5 hidden lg:block">
              Bajjar
            </h1>
          </Link>
        </div>

        <RiMenuUnfold3Fill
          onClick={() => toggleSidebar()}
          className="absolute left-5 top- text-2xl z-10 cursor-pointer text-white dark:text-darkTitle block lg:hidden"
        />

        <div className="flex gap-3 items-center">
          {/* <div className="relative">
            <MdOutlineNotificationsActive className="text-2xl " />
          </div> */}

          <div className="hidden lg:flex" onClick={handleFullscreen}>
            <RiFullscreenFill className="text-4xl bg-gray-200 p-2 rounded-full cursor-pointer hidden md:block" />
          </div>

          {/* User Profile Section */}
          <div className="" ref={popupRef}>
            <div
              className="flex gap-3 items-center border-r-2 pr-5 border-lightBorder cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            >
              <img
                src={
                  profile?.image
                    ? `${import.meta.env.VITE_API_SERVER}${profile?.image}`
                    : userimg
                }
                alt="Admin"
                className="w-9 h-9 rounded-full"
              />
              <div className="flex items-center flex-col text-white dark:text-darkTitle">
                <span className="font-bold text-[14px] text-left block">
                  {profile?.name}
                </span>
                <span className="text-[12px]">{profile?.role}</span>
              </div>
            </div>

            {/* Popup Dropdown with Animation */}
            {showPopup && (
              <div
                className={`absolute right-0 mt-2 w-64 bg-light shadow-lg rounded-lg py-2 dark:bg-darkCard dark:text-darkTitle 
   transition-all duration-300 z-50 `}
              >
                <ul>
                  <Link to="/dashboard/profile">
                    <li className="flex items-center gap-3 px-4 py-2 cursor-pointer group relative">
                      <FiUser className="text-lg" />

                      <span>Profile</span>

                      <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-current transition-all duration-700 group-hover:w-[80%] group-hover:left-[10%]"></span>
                    </li>
                  </Link>

                  <li className="flex items-center gap-3 px-4 py-2 cursor-pointer group relative">
                    <FaPhoneAlt className="text-lg" />
                    <span>Phone: {profile?.phone}</span>
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-current transition-all duration-700 group-hover:w-[80%] group-hover:left-[10%]"></span>
                  </li>
                  <Link to="/dashboard/reset-password">
                    <li className="flex items-center gap-3 px-4 py-2 cursor-pointer group relative">
                      <MdVpnKey className="text-lg" />

                      <span>Reset Password</span>

                      <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-current transition-all duration-700 group-hover:w-[80%] group-hover:left-[10%]"></span>
                    </li>
                  </Link>

                  <li
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer text-red-500 group relative"
                  >
                    <FiLogOut className="text-lg" />
                    <span>Logout</span>
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-red-500 transition-all duration-700 group-hover:w-[80%] group-hover:left-[10%]"></span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <CiSettings onClick={() => setShowPopup(!showPopup)} className="text-3xl rounded-full animate-[spin_2s_linear_infinite]  cursor-pointer text-white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
