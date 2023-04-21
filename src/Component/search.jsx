import React from "react";

const Search = ({ searchValue, handleSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Country"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
