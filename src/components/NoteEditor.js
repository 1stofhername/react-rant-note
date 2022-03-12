import React, { useState } from "react";

function NoteEditor({ note, onCancelClick }) {
  const[editedNoteContent, setEditedNoteContent]=useState(note);

  function handleFormChange (event){
    setEditedNoteContent({...note, [event.target.name]:event.target.value})
    console.log(editedNoteContent);
  }

  return (
    <form className="note-editor">
      <input type="text" name="title" value={editedNoteContent.title} onChange={e=>handleFormChange(e)} />
      <textarea name="body" value={editedNoteContent.body} onChange={e=>handleFormChange(e)} />
      <div className="button-row">
        <input className="button" type="submit" value="Save" />
        <button type="button" onClick={onCancelClick}>Cancel</button>
      </div>
    </form>
  );
}

export default NoteEditor;
