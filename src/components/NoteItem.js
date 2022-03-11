import React from "react";

function NoteItem({ note, onNoteClick }) {

  const caption = (note.body.substr(0,20)+"...");

  return (
    <li onClick={()=>onNoteClick(note)}>
      <h2>{note.title}</h2>
      <p>{caption}</p>
    </li>
  );
}

export default NoteItem;
