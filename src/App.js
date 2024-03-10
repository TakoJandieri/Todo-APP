import "./App.css";
import ToDoAppDate from "./Components/ToDoAppDate";
import AddNote from "./Components/AddNote";
import { useState, useEffect } from "react";
import trash from "./assets/trashbox.png";
import checkbox from "./assets/emptyboxblack.png";
import tick from "./assets/tick.jpeg";
import "./Components/AddNote.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes
      ? JSON.parse(savedNotes)
      : [
          {
            id: 1,
            text: "Dinner",
            time: "Today at 8:00 PM",
            completed: true,
          },
          {
            id: 2,
            text: "Walk with Coby",
            time: "Today at 3:30 PM",
            completed: false,
          },
        ];
  });

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deletedNotes, setDeletedNotes] = useState([]);

  const updateObjectProperty = (id, property, newValue) => {
    const updatedArray = notes.map((obj) => {
      if (obj.id === id) {
        return { ...obj, [property]: newValue };
      }
      return obj;
    });
    // Update the state with the new array
    setNotes(updatedArray);
  };

  const handleConfirmDelete = (id) => {
    setConfirmDelete(
      <div className="confirmText">
        Are you sure you want to delete this note ?
        <div className="confirmTextButtons">
          <button className="yesButton" onClick={() => deleteNote(id)}>
            YES
          </button>
          <button className="noButton" onClick={cancelDelete}>
            NO
          </button>
        </div>
      </div>
    );
  };

  const deleteNote = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    setDeletedNotes([...deletedNotes, noteToDelete]);

    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);

    setConfirmDelete(null);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("objectsArray updated:", notes);
  }, [notes]);

  const list = notes.map((note) => (
    <li key={note.id}>
      <div className="notes">
        <div>
          <p className="noteText">{note.text}</p>
          <p className="noteTime">{note.time}</p>
        </div>
        <div>
          {note.completed ? (
            <img
              onClick={() => updateObjectProperty(note.id, "completed", false)}
              alt="tick"
              style={{ width: 20, marginRight: 16 }}
              src={tick}
            />
          ) : (
            <img
              className="checkBoxImg"
              onClick={() => updateObjectProperty(note.id, "completed", true)}
              alt="checkbox"
              style={{ width: 20, marginRight: 16 }}
              src={checkbox}
            />
          )}

          <img
            className="trashBoxImg"
            onClick={() => handleConfirmDelete(note.id)}
            style={{ width: 20, marginRight: 16, cursor: "pointer" }}
            alt="trashbox"
            src={trash}
          />
        </div>
      </div>
    </li>
  ));
  return (
    <div className="App">
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <ToDoAppDate />
        <div className="deleteConfirm">{confirmDelete && confirmDelete}</div>
        <AddNote
          notes={notes}
          setNotes={setNotes}
          list={list}
          deleteConfirm={confirmDelete}
          setDeleteConfirm={setConfirmDelete}
        />
      </div>
    </div>
  );
}

export default App;
