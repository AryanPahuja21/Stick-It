import React, { useEffect, useState } from "react";
import Note from "./Note";

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "This is a note",
    },
    {
      id: 2,
      content: "This is another note",
    },
  ]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const createNewNote = (newNoteContent) => {
    if (content === "") {
      setError("Note cannot be empty");
      return;
    }
    setNotes([
      ...notes,
      {
        id: notes.length + 1,
        content: content,
      },
    ]);
    setContent("");
    setError("");
  };

  return (
    <main className="mt-10">
      <div className="flex flex-col justify-center ">
        <div className="flex justify-center gap-1">
          <input
            type="text"
            placeholder="Create a new note"
            className="border border-black outline-red-600 rounded-md p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={createNewNote}
            className="bg-red-500 p-2 rounded-md border border-red-600"
          >
            Create
          </button>
        </div>
        <div className="text-center">
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <div>
        {notes.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </main>
  );
};

export default Notes;
