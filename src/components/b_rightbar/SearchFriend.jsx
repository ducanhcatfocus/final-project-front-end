import React from "react";

const SearchFriend = ({ setSearchValue }) => {
  return (
    <div className="text-2xl h-14 flex items-center justify-between px-5">
      Friends
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        className=" bg-dark-third h-8 w-48 md:w-32 lg:w-60  p-1 rounded bg-transparent text-sm outline-none transition text-white border mt-1"
        placeholder="Search Friend..."
      />
    </div>
  );
};

export default SearchFriend;
