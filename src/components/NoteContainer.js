import React, { useState, useEffect } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

function NoteContainer () {
  const [notes, setNotes] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:3000/notes')
  .then((res)=>res.json())
  .then((data)=>setNotes(data))
}, [])

function onNoteClick (id) {
  console.log(`${id} was clicked!`)
}

  return (
    <>
      <Search />
      <div className="container">
        <Sidebar notes={notes} onNoteClick={onNoteClick} />
        <Content notes={notes} />
      </div>
    </>
  );
}

export default NoteContainer;
