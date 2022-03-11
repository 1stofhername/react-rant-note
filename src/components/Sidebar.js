import React from "react";
import NoteList from "./NoteList";

function Sidebar({ notes, onNoteClick }) {
  return (
    <div className="master-detail-element sidebar">
      <NoteList notes={notes} onNoteClick={onNoteClick} />
      <button>New</button>
    </div>
  );
}

export default Sidebar;
