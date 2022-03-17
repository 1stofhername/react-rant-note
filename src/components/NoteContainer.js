import React, { useState, useEffect } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";
import TagFilter from "./TagFilter";

function NoteContainer () {
  
  const [notes, setNotes] = useState([]);
  const [displayedNote, setDisplayedNote]=useState("");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  const [editMode, setEditMode]=useState("");

//Search and Filter

  const filteredNotes = notes
    .filter(note=>note.title.toLowerCase().includes(search.toLowerCase()))
    .filter(note=> {
      if (tagFilter==='All') {
        return true 
      } else if (tagFilter) {
      return note.tags.find(element=>element===tagFilter)
    }
  })
    
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
      tags:[]
    })
  })
  .then(res=>res.json())
  .then(data=>{let newNotes= [...notes, data]; setNotes(newNotes);setDisplayedNote(data)})
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

function onTagClick (event) {
  setTagFilter(()=>event.target.name);
}

function handleTagReset () {
  setTagFilter("");
}

function toggleEditMode () {
  setEditMode(()=>!editMode)
}

function toggleDisplayedNote (note) {
if (editMode) {
  setEditMode(()=>!editMode);
  setDisplayedNote(note)
} else {
  setDisplayedNote(note)
}};

function handleSearchChange (event) {
setSearch(event.target.value);
};

function handleDeleteItem (deletedItem) {
  let updatedNotes=notes.filter((note)=>{return note.id!==deletedItem.id});
  setNotes(updatedNotes);
  setDisplayedNote("");
}

function handleClearSearch () {
  setSearch("");
}

  return (
    <>
      <Search 
        handleSearchChange={handleSearchChange} 
        handleClearSearch={handleClearSearch} 
        search={search} 
        />
      <TagFilter 
        notes={notes} 
        tagFilter={tagFilter}
        onTagClick={onTagClick}
        handleTagReset={handleTagReset} 
        />
      <div className="container">
        <Sidebar 
          notes={filteredNotes} 
          onNoteClick={toggleDisplayedNote} 
          handleNewButtonClick={handleNewButtonClick} 
          />
        <Content 
        displayedNote={displayedNote} 
        editMode={editMode} 
        handleEditSubmit={handleEditSubmit} 
        toggleEditMode={toggleEditMode}
        onDeleteButtonClick={onDeleteButtonClick}
        onTagClick={onTagClick}
         />
      </div>
    </>
  );
}

export default NoteContainer;
