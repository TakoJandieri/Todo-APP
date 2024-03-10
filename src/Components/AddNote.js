import React from "react";
import { useState } from "react";
import MarkNDelete from "./MarkNDelete";
import "./AddNote.css";

function AddNote({ notes, setNotes, list, confirmDelete, setDeleteConfirm }) {
  const [text, setText] = useState("");

  const addNote = () => {
    if (text.trim() === "") return; // Don't add empty notes

    const date = new Date();
    const time = `Today at ${
      date.toLocaleTimeString() < 10
        ? date.toLocaleTimeString().substring(0, 5) +
          date.toLocaleTimeString().substr(-3, 3)
        : "0" +
          date.toLocaleTimeString().substring(0, 4) +
          date.toLocaleTimeString().substr(-3, 3)
    } `;

    const addNoteTime = () => {
      return `${time}`;
    };
    const newNote = {
      id: notes.length + 1,
      text: text,
      time: addNoteTime(),
    };

    setNotes([...notes, newNote]);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNote();
    }
  };

  return (
    <div className="notesContainer">
      <div className="noteToAddContainer">
        <input
          className="noteInput"
          placeholder="Enter Next Note"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="addButton" onClick={addNote}>
          Add
        </button>
      </div>
      <MarkNDelete
        list={notes}
        setList={setNotes}
        confirmDelete={confirmDelete}
        setDeleteConfirm={setDeleteConfirm}
      />

      <ul className="activeNotesList">{list}</ul>
    </div>
  );
}

export default AddNote;
