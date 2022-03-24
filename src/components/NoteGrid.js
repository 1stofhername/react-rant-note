import React from "react";
import NoteItem from "./NoteItem";


function NoteGrid({ notes, onNoteClick }) {
  return (
    <div className="all-notes-display">
      {notes.map((note)=><NoteItem key={note.id} note={note} onNoteClick={onNoteClick} id={note.id} />)}
    </div>
  );
}

export default NoteGrid;
