import React, { useEffect, useState } from "react";
import Note from "./Note";

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      content: "This is a note",
    },
    {
      content: "This is another note",
    },
  ]);

  return (
    <div>
      {notes.map((note, index) => {
        return <Note key={index} note={note} />;
      })}
    </div>
  );
};

export default Notes;
