import React, { useState, useEffect } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

function NoteContainer () {
  const [notes, setNotes] = useState([]);
  const [displayedNote, setDisplayedNote]=useState("");
  const [search, setSearch] = useState("");
  
  useEffect(()=>{
    fetch('http://localhost:3000/notes')
  .then((res)=>res.json())
  .then((data)=>setNotes(data))
}, [])

function handleNewButtonClick() {
  console.log('hello')
}

function onNoteClick (note) {
  setDisplayedNote(note)
}

function handleSearchChange (event) {
  setSearch(event.target.value);
};


const filteredNotes = notes.filter(note=>note.title.toLowerCase().includes(search.toLowerCase()));


  return (
    <>
      <Search handleSearchChange={handleSearchChange} />
      <div className="container">
        <Sidebar notes={filteredNotes} onNoteClick={onNoteClick} handleNewButtonClick={handleNewButtonClick} />
        <Content notes={filteredNotes} displayedNote={displayedNote} />
      </div>
    </>
  );
}

export default NoteContainer;
