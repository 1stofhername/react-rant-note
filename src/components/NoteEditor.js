import React, { useState } from "react";

function NoteEditor({ note, onCancelClick, handleEditSubmit }) {
  const[editedNoteContent, setEditedNoteContent]=useState(note);

  function handleFormChange (event){
    setEditedNoteContent({...editedNoteContent, [event.target.name]:event.target.value})
  }

  function onEditSubmit (e) {
    e.preventDefault();
    handleEditSubmit(editedNoteContent);
  }

  return (
    <form className="note-editor" onSubmit={e=>onEditSubmit(e)}>
      <input type="text" name="title" value={editedNoteContent.title} onChange={e=>handleFormChange(e)} />
      <textarea name="body" value={editedNoteContent.body} onChange={e=>handleFormChange(e)} />
      <div className="button-row">
        <input className="button" type="submit" value="Save"/>
        <button type="button" onClick={onCancelClick}>Cancel</button>
      </div>
    </form>
  );
}

export default NoteEditor;
