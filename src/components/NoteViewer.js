import React from "react";

function NoteViewer({ displayedNote, onEditButtonClick, onDeleteButtonClick }) {
  
  return (
    <>
      <h2>{displayedNote.title}</h2>
      <p>{displayedNote.body}</p>
      <button onClick={onEditButtonClick}>Edit</button>
      <button onClick={onDeleteButtonClick(displayedNote)}>Delete</button>
    </>
  );
}

export default NoteViewer;
