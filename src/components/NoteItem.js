import React from "react";

function NoteItem({ note, onNoteClick }) {
  const { body, title } = note
  const caption = (body.length > 20) ? note.body.substr(0,20)+"...": note.body
  

  return (
    <li onClick={()=>onNoteClick(note)}>
      <h2>{title}</h2>
      <p>{caption}</p>
    </li>
  );
}

export default NoteItem;
