import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get Note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2ZTI3NmQyYzZkNmZmNzRkMTRiNDMzIn0sImlhdCI6MTY4NDk0MTM4NH0.X9ljC0-MvAIJGbXPWfjM2ZOWd8Z9ZQrVVoy9DCIPGco"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  // Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2ZTI3NmQyYzZkNmZmNzRkMTRiNDMzIn0sImlhdCI6MTY4NDk0MTM4NH0.X9ljC0-MvAIJGbXPWfjM2ZOWd8Z9ZQrVVoy9DCIPGco"
      },
      body: JSON.stringify(title, description, tag), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    console.log("Adding a new note");
    const note = {
      "_id": "64746829382c39bd1c0bd7e9",
      "user": "646e276d2c6d6ff74d14b433",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-28T14:41:45.384Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }

  // Delete Note
  const deleteNote = (id) => {
    console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    console.log("Editing note with id " + id);

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2ZTI3NmQyYzZkNmZmNzRkMTRiNDMzIn0sImlhdCI6MTY4NDk0MTM4NH0.X9ljC0-MvAIJGbXPWfjM2ZOWd8Z9ZQrVVoy9DCIPGco"
      },
      body: JSON.stringify(title, description, tag), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }



  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;  