import { useState } from "react";
import "./MarkNDelete.css";
import markAll from "../assets/markall.png";
import deleteMarked from "../assets/deletemarked.webp";

function MarkNDelete({ list, setList, confirmDelete, setDeleteConfirm }) {
  const [press, setPress] = useState(false);
  const handleMarkAll = () => {
    const marked = list.map((note) => {
      return { ...note, completed: true };
    });
    setList(marked);
    setPress(!press);
  };

  const handleDeleteMarked = () => {
    const markedToDelete = list.find((note) => note.completed === true);
    if (markedToDelete) {
      setDeleteConfirm(
        <div className="confirmText">
          Are you sure you want to delete all marked notes ?
          <div className="confirmTextButtons">
            <button className="yesButton" onClick={() => deleteMarkedNote()}>
              YES
            </button>
            <button className="noButton" onClick={cancelDelete}>
              NO
            </button>
          </div>
        </div>
      );
    } else {
      alert("Please mark the note to delete");
    }
  };

  const deleteMarkedNote = () => {
    const deleteMarked = list.filter((note) => note.completed !== true);
    setList(deleteMarked);
    setDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleUnMarkAll = () => {
    if (press) {
      const unMarked = list.map((note) => {
        return { ...note, completed: false };
      });
      setList(unMarked);
    }
  };

  console.log("rogoria press: ", press);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        gap: 5,
        marginTop: 20,
        marginRight: 35,
      }}
    >
      <button
        title={!press ? "Mark all as completed" : "Unmark all"}
        className="markUnmark"
        onClick={() => {
          handleMarkAll();
          handleUnMarkAll();
        }}
      >
        <img
          className={press ? "markImgPress" : "markImg"}
          alt="markUnmarkNotes"
          src={markAll}
        />
      </button>
      <button
        className="deleteMarked"
        onClick={() => {
          handleDeleteMarked();
        }}
      >
        <img
          className="deleteMarkedImg"
          alt="deleteMarked"
          src={deleteMarked}
        />
      </button>
      <div className="deleteConfirm">{confirmDelete && confirmDelete}</div>
    </div>
  );
}

export default MarkNDelete;
