"use client";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="rounded-lg bg-gray-200 flex items-center p-3 gap-2">
      <FaSearch size="20" />
      <input
        type="text"
        placeholder="Search..."
        name="search"
        className="border-none focus:outline-none bg-inherit"
      />
    </div>
  );
};

export default SearchBar;
