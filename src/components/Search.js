import React from "react";

function Search({ handleSearchChange }) {
  return (
    <div className="filter">
      <input id="search-bar" type="text" placeholder="Search Notes" onChange={(e)=>handleSearchChange(e)} />
    </div>
  );
}

export default Search;
