import React, { createRef, useEffect, useRef, useState } from "react";
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

  const noteRefs = useRef([]);

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

  const handleDragStart = (note, e) => {
    e.preventDefault();
    const { id } = note;
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPos = note;

    const handleMouseMove = (e) => {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      noteRef.style.left = `${x}px`;
      noteRef.style.top = `${y}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };

      if (false) {
      } else {
        updateNotePosition(id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, position: newPosition };
      }
      return note;
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <main className="pt-10 h-full">
      <div className="flex flex-col justify-center ">
        <div className="flex justify-center gap-1">
          <input
            type="text"
            placeholder="Create a new note"
            className="border border-black outline-red-600 rounded-md p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createNewNote();
              }
            }}
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
          return (
            <div
              key={note.id}
              onMouseDown={(e) => {
                handleDragStart(note, e);
              }}
            >
              <Note
                ref={
                  noteRefs.current[note.id]
                    ? noteRefs.current[note.id]
                    : (noteRefs.current[note.id] = createRef())
                }
                note={note}
                deleteNote={deleteNote}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Notes;
