import React, { forwardRef } from "react";

const Note = forwardRef(({ note, deleteNote }, ref) => {
  const handleDeleteNote = () => {
    deleteNote(note.id);
  };
  return (
    <div
      ref={ref}
      className={
        "w-[200px] relative p-4 bg-yellow-100 border border-black cursor-move select-none break-words"
      }
      style={{
        left: `${note.position.x}px`,
        top: `${note.position.y}px`,
      }}
    >
      <h1>📌 {note.content}</h1>
      <button
        onClick={() => handleDeleteNote(note.id)}
        className="absolute top-0 right-2 font-semibold"
      >
        x
      </button>
    </div>
  );
});

export default Note;
