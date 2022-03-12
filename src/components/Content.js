import React, { useState } from "react";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import Instructions from "./Instructions";

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and getContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
function Content({ displayedNote }) {
  const [editMode, setEditMode]=useState("");
  
  function onEditButtonClick () {
    setEditMode(()=>!editMode)
  }

  function onCancelClick () {
    setEditMode(()=>!editMode)
  }

  const getContent = () => {
    if (editMode) {
      return <NoteEditor note={displayedNote} onCancelClick={onCancelClick} />;
    } else if (displayedNote) {
      return <NoteViewer displayedNote={displayedNote} onEditButtonClick={onEditButtonClick} />;
    } else {
      return <Instructions />;
    }
  };

  return <div className="master-detail-element detail">{getContent()}</div>;
}

export default Content;
