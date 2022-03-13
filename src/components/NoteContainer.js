import React, { useState, useEffect } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

function NoteContainer () {
  const [notes, setNotes] = useState([]);
  const [displayedNote, setDisplayedNote]=useState("");
  const [search, setSearch] = useState("");
  const [editMode, setEditMode]=useState("");
  const filteredNotes = notes.filter(note=>note.title.toLowerCase().includes(search.toLowerCase()));
  

  //CRUD Functions 

  useEffect(()=>{
    fetch('http://localhost:3000/notes')
  .then((res)=>res.json())
  .then((data)=>setNotes(data))
}, []);

function handleNewButtonClick () {
  fetch('http://localhost:3000/notes', {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
    },
    body:JSON.stringify({
      userId:1,
      title:"default",
      body:"placeholder",
    })
  })
  .then(res=>res.json())
  .then(data=>{let newNotes= [...notes, data]; setNotes(newNotes)})
}

function handleEditSubmit (editedNoteObj){
  fetch(`http://localhost:3000/notes/${editedNoteObj.id}`, {
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify(editedNoteObj)
  })
  .then(res=>res.json())
  .then((data)=>{
    const updatedNotes = notes.map((note)=>{ 
      if (note.id===data.id) {
        return data
      } else {
        return note
      }
    });
      setNotes(updatedNotes);
      toggleDisplayedNote(editedNoteObj)
      setEditMode(()=>!editMode);
    })
};

function onDeleteButtonClick (item) {
  fetch(`http://localhost:3000/notes/${item.id}`, {
    method:"DELETE",
  })
  .then(res=>res.json())
  .then(()=>handleDeleteItem(item))
}


//onEvent State Toggle Functions

function toggleEditMode () {
  setEditMode(()=>!editMode)
}

function toggleDisplayedNote (note) {
setDisplayedNote(note);
}

function handleSearchChange (event) {
setSearch(event.target.value);
};

function handleDeleteItem (deletedItem) {
  let updatedNotes=notes.filter((note)=>{return note.id!==deletedItem.id});
  setNotes(updatedNotes);
  setDisplayedNote("");
}

function handleClearSearch (event) {
  setSearch("");
  
  

  console.log(event.target)
}



  return (
    <>
      <Search handleSearchChange={handleSearchChange} handleClearSearch={handleClearSearch} search={search} />
      <div className="container">
        <Sidebar notes={filteredNotes} onNoteClick={toggleDisplayedNote} handleNewButtonClick={handleNewButtonClick} />
        <Content 
        displayedNote={displayedNote} 
        editMode={editMode} 
        handleEditSubmit={handleEditSubmit} 
        toggleEditMode={toggleEditMode}
        onDeleteButtonClick={onDeleteButtonClick}
         />
      </div>
    </>
  );
}

export default NoteContainer;
