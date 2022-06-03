import NoteContext from "./noteContext";
import { useRef, useState } from "react";
import LoadingBar from 'react-top-loading-bar';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const [user, setUser] = useState([])
  const [progress, setProgress] = useState(0)
  const authtoken = localStorage.getItem("auth-token")
  
  // Alert function
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null)
    }, 3000)
  }
  // Get all Notes
  const getNotes = async () => {
    // API Call 
    setProgress(30)
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authtoken
      }
    });
    const json = await response.json() 
    setNotes(json)
    window.scrollTo(0, 0)
    setProgress(100)
    // showAlert('Edited successfully.', 'success')
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    setProgress(30)
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authtoken
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
    window.scrollTo(0, 0)
    setProgress(100)
    showAlert('Note added successfully.', 'success')
  }

  // Delete a Note
  const deleteNote = async (id) => {
    if(window.confirm("Are you sure to delete this note?")){
      // API Call
      setProgress(30)
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": authtoken
        }
      });
      const json = response.json(); 
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
      window.scrollTo(0, 0)
      setProgress(100)
      showAlert('Deleted successfully.', 'success')
    }
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    setProgress(30)
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authtoken
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
    window.scrollTo(0, 0)
    setProgress(100)
    showAlert('Edited successfully.', 'success')
  }

    // Get user details
    const getUser = async (token) => {
      // API Call 
      // setProgress(30)
      const response = await fetch('http://localhost:5000/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      });
      const json = await response.json()
      setUser(json);
      // setProgress(100)
    }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, getUser, user, progress, setProgress, showAlert, alert }}>
      <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)} />
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;