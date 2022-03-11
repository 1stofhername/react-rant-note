import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
  return (
    <ul>
      {notes.map((note)=><NoteItem key={note.id} note={note} />)}
    </ul>
  );
}

export default NoteList;
