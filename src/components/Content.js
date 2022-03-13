import React from "react";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import Instructions from "./Instructions";

function Content({ displayedNote, editMode, handleEditSubmit, toggleEditMode, onDeleteButtonClick }) {
  

  const getContent = () => {
    if (editMode) {
      return <NoteEditor note={displayedNote} onCancelClick={toggleEditMode} handleEditSubmit={handleEditSubmit} />;
    } else if (displayedNote) {
      return <NoteViewer displayedNote={displayedNote} onEditButtonClick={toggleEditMode} onDeleteButtonClick={onDeleteButtonClick} />;
    } else {
      return <Instructions />;
    }
  };

  return <div className="master-detail-element detail">{getContent()}</div>;
}

export default Content;
