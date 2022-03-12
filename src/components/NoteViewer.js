import React from "react";

function NoteViewer({ displayedNote, onEditButtonClick }) {
  return (
    <>
      <h2>{displayedNote.title}</h2>
      <p>{displayedNote.body}</p>
      <button onClick={()=>onEditButtonClick(displayedNote)}>Edit</button>
    </>
  );
}

export default NoteViewer;
