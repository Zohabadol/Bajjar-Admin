import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const Header = ({
  title,
  searchValue,
  onSearchChange, // this will be triggered AFTER debounce
  onAddClick,
  addButtonText = "+ Add New",
  
}) => {
  const [inputValue, setInputValue] = useState(searchValue);

  // Update local inputValue if searchValue changes from outside
  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue); // send debounced value to parent
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);
  

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-5">
      <h2 className="text-xl font-semibold text-primary">{title}</h2>
      <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
        
        <div className="relative w-60">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10 pr-3 py-2 w-full border border-lightBorder rounded-full focus:outline-none text-sm"
            // placeholder="Search"
          />
          {inputValue === "" && (
            <div className="absolute left-20 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400 pointer-events-none">
              <CiSearch className="text-lg mr-1" />
              <span className="text-sm">search</span>
            </div>
          )}
        </div>
        <button
          className="bg-primary text-white px-11 py-[6px] rounded-full hover:bg-green-600 cursor-pointer"
          onClick={onAddClick}
        >
          {addButtonText}
        </button>
      </div>
    </div>
  );
};

export default Header;
