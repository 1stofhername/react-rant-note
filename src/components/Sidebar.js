import React from "react";
import NoteList from "./NoteList";

function Sidebar({ notes, onNoteClick, handleNewButtonClick }) {
  return (
    <div className="master-detail-element sidebar">
      <NoteList notes={notes} onNoteClick={onNoteClick} />
      <button onClick={(e)=>handleNewButtonClick()} >New</button>
    </div>
  );
}

export default Sidebar;
