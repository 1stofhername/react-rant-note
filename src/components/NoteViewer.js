import React from "react";
import { v4 as uuidv4 } from 'uuid';

function NoteViewer({ displayedNote, onEditButtonClick, onDeleteButtonClick, onTagClick}) {
  const { title, body, tags } = displayedNote

  console.log(title)
  
  return (
    <>
      <h2>{title}</h2>
      <p>{body}</p>
      <div id="tag-container">
      <ul>{tags.map(tag=>{
        return <button key={uuidv4()} name={tag} className="tag" onClick={(e)=>onTagClick(e)}>{tag}</button>})}</ul>
      </div>
      <button onClick={onEditButtonClick}>Edit</button>
      <button onClick={()=>onDeleteButtonClick(displayedNote)}>Delete</button>
    </>
  );
}

export default NoteViewer;
