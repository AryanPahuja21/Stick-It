import React, { useEffect, useState } from "react";
import Note from "./Note";

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    return savedNotes;
  });
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const createNewNote = () => {
    if (content === "") {
      setError("Note cannot be empty");
      return;
    }

    const newNote = {
      id: Date.now(),
      content,
      position: determineNewPosition(),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setContent("");
    setError("");
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
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
          return <Note key={note.id} note={note} deleteNote={deleteNote} />;
        })}
      </div>
    </main>
  );
};

export default Notes;
