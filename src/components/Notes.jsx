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

  return (
    <main className="mt-10">
      <div className="flex justify-center gap-1">
        <input
          type="text"
          placeholder="Create a new note"
          className="border border-black rounded-md p-2"
        />
        <button className="bg-red-500 p-2 rounded-md border border-black">
          Create
        </button>
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
