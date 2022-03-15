import React, { useState } from "react";

function TagFilter ({ notes, handleTagFilter }) {
    const allTags=[];
    notes.map(note=>allTags.push(...note.tags))
    const uniqueTags = ([... new Set(allTags)]);

    return (
    <div>
        {uniqueTags.map(tag=>
        <button key={tag} name={tag} className="tag" onClick={(e)=>handleTagFilter(e)}>
            {tag}
        </button>)}
    </div>
    )
}

export default TagFilter