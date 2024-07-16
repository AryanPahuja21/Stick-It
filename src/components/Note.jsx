import React from "react";

const Note = ({ note }) => {
  return (
    <div
      className={
        "w-[200px] absolute p-4 bg-yellow-100 border border-black cursor-move select-none break-words"
      }
      style={{
        left: `${note.position.x}px`,
        top: `${note.position.y}px`,
      }}
    >
      📌 {note.content}
    </div>
  );
};

export default Note;
