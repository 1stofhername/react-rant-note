import React, { useState } from "react";

function TagFilter ({ notes, onTagClick, handleTagReset }) {
    const allTags=[];
    notes.map(note=>allTags.push(...note.tags))
    const uniqueTags = ([... new Set(allTags)]);

    return (
    <div>
        Filter by tag: 
        <button className="tag-selector" name="name" onClick={handleTagReset}> All </button>
        {uniqueTags.map(tag=>
        <button key={tag} name={tag} className="tag-selector" onClick={(e)=>onTagClick(e)}>
            {tag}
        </button>)}
    </div>
    )
}

export default TagFilter