import React from "react";
import { useState, useEffect } from "react";
import "./NoteHistory.css";

function NoteHistory({ list }) {
  const deletedNotes = list.map((note) => (
    <li key={note.id}>
      <p>{note.text}</p>
    </li>
  ));

  const [menuClick, setMenuClick] = useState(null);
  const [countClick, setCountClick] = useState(false);

  const handleMenuClick = () => {
    setMenuClick(
      deletedNotes.length > 0 ? (
        <div>{deletedNotes}</div>
      ) : (
        <div>There is NO deleted Notes</div>
      )
    );
    setCountClick(!countClick);
  };

  const handleExitClick = () => {
    if (countClick) {
      setMenuClick(null);
    }
  };

  useEffect(() => {
    console.log("note is deleted");
  }, [deletedNotes]);

  return (
    <div className="noteHistoryContainer">
      <button
        className="showButton"
        onClick={() => {
          handleMenuClick();
          handleExitClick();
        }}
      >
        Show Deleted Notes{" "}
      </button>
      <div>{menuClick}</div>
    </div>
  );
}

export default NoteHistory;
