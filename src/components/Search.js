import React from "react";

function Search({ search, handleSearchChange, handleClearSearch }) {
  return (
    <div className="filter">
      <input id="search-bar" type="text" value={search} placeholder="Search Notes" onChange={(e)=>handleSearchChange(e)} />
      <p hidden={false} id="clear-search" onClick={handleClearSearch}>&#10060;</p>
    </div>
  );
}

export default Search;
