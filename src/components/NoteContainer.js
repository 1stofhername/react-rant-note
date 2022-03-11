import React, { useState, useEffect } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";



  return (
    <>
      <Search />
      <div className="container">
        <Sidebar />
        <Content />
      </div>
    </>
  );
}

export default NoteContainer;
