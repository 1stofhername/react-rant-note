import React from "react";

function NoteItem({ note }) {
  return (
    <li>
      <h2>{note.title}</h2>
      <p>Caption...</p>
    </li>
  );
}

export default NoteItem;
