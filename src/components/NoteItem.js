import React from "react";

function NoteItem({ note }) {
  const caption=note.body.substr(0,20)+"...";
  return (
    <li>
      <h2>{note.title}</h2>
      <p>{caption}</p>
    </li>
  );
}

export default NoteItem;
