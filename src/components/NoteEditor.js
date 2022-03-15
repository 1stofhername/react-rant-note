import React, { useState } from "react";

function NoteEditor({ note, onCancelClick, handleEditSubmit }) {
  const [editedNoteContent, setEditedNoteContent]=useState(note);

  function handleFormChange (event){
    setEditedNoteContent({...editedNoteContent, [event.target.name]:event.target.value})
  }
  
  function handleTagChange (e) {
    setEditedNoteContent({...editedNoteContent, [e.target.name]:e.target.value.split(',')})
  }

  function onEditSubmit (event) {
    event.preventDefault();
    handleEditSubmit(editedNoteContent);
  }

  return (
    <form className="note-editor" onSubmit={e=>onEditSubmit(e)}>
      <input type="text" name="title" value={editedNoteContent.title} onChange={e=>handleFormChange(e)} />
      <textarea name="body" value={editedNoteContent.body} onChange={e=>handleFormChange(e)} />
      <input type="text" name="tags" id="tags" label="Tags:" value={editedNoteContent.tags} placeholder="Enter tags separated by #" onChange={(e)=>handleTagChange(e)} />
      <div className="button-row">
        <input className="button" type="submit" value="Save"/>
        <button type="button" onClick={onCancelClick}>Cancel</button>
      </div>
    </form>
  );
}

export default NoteEditor;
