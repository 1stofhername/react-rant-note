import React from "react";

function NoteViewer({ displayedNote }) {
  return (
    <>
      <h2>{displayedNote.title}</h2>
      <p>{displayedNote.body}</p>
      <button>Edit</button>
    </>
  );
}

export default NoteViewer;
