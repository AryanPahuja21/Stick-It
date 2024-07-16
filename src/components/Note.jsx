import React from "react";

const Note = ({ note }) => {
  return (
    <div className="w-fit p-4 bg-yellow-100 border border-black cursor-move select-none">
      <h1>📌 {note.content}</h1>
    </div>
  );
};

export default Note;
