import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Search from "./Search";
import TagFilter from "./TagFilter";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import NoteGrid from "./NoteGrid";
import { useHistory } from "react-router-dom";
import AddNotes from "./AddNotes";

function NoteContainer () {
  
  const [notes, setNotes] = useState([]);
  const [displayedNote, setDisplayedNote]=useState("");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  const [editNote, setEditNote]=useState("");
  const [sortedNotes, setSortedNotes]=useState([]);
  const history = useHistory();

//Search and Filter

  const filteredNotes = (sortedNotes.length===0 ? notes : sortedNotes)
    .filter(note=>note.title.toLowerCase().includes(search.toLowerCase()))
    .filter(note=> {
      if (tagFilter==='All') {
        return true 
      } else if (tagFilter) {
      return note.tags.find(element=>element===tagFilter)
    } else if (!tagFilter) {
      setTagFilter("All");
    }
  })
  
  function handleSortTitle (){
    if (sortedNotes.length===0){
      const newNotes=[...notes]
      const sortedNotes = newNotes.sort(function (a,b){
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1
        } else {
          return 1
        }
      })
      setSortedNotes(sortedNotes)
    } else {
      setSortedNotes([])
    }
  }

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
      history.push(`/notes/${data.id}`)
    })
};

function onDeleteButtonClick (item) {
  fetch(`http://localhost:3000/notes/${item.id}`, {
    method:"DELETE",
  })
  .then(res=>res.json())
  .then(data=>history.push(`/notes/`))
  .then(()=>handleDeleteItem(item))
}

//onEvent State Toggle Functions

function onTagClick (event) {
  setTagFilter(()=>event.target.name);
}

function handleTagReset () {
  setTagFilter("");
}

function toggleEditNote (note) {
  setEditNote(note)
}

function toggleDisplayedNote (note) {
  setDisplayedNote(note)
};

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
      <div className="container">
      <Switch>
        <Route exact path="/notes">
        <AddNotes handleNewButtonClick={handleNewButtonClick} />
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
          <NoteGrid notes={filteredNotes} onNoteClick={toggleDisplayedNote} id={displayedNote.id} />
        </Route>
        <Route path="/edit/:id">
          <NoteEditor note={editNote} handleEditSubmit={handleEditSubmit} />
        </Route>
        <Route exact path="/notes/:id">
          <NoteViewer displayedNote={displayedNote} onEditButtonClick={toggleEditNote} onDeleteButtonClick={onDeleteButtonClick} onTagClick={onTagClick} />
        </Route>
        <Route path= '*'>
          <div>404 Not Found</div>
        </Route>
      </Switch>
        {/* <Content 
        displayedNote={displayedNote} 
        editMode={editMode} 
        handleEditSubmit={handleEditSubmit} 
        toggleEditMode={toggleEditMode}
        onDeleteButtonClick={onDeleteButtonClick}
        onTagClick={onTagClick}
         /> */}
      </div>
    </>
  );
}

export default NoteContainer;
