import NoteContext from './noteContext';
import {useState} from "react";

//this wiill be used to give some states and functions that we will be able to use later in out application
const NoteState=(props)=>{

  const url="http://localhost:5000";
  const initialNotes=[]
  const [Notes,setNotes]=useState(initialNotes);

  const [currentNote, setCurrentNote] = useState(null);


  //fetching all notes using fetch API
  const getNotes=async ()=>{
    const response = await fetch(`${url}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
     });
     const json = await response.json();
     console.log("Notes:", json);
     setNotes(json);
  }

  //adding a note
  const addNote=async(title,description,tag)=>{
    //logic for api call
const response = await fetch(`${url}/api/notes/addnote`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem('token'),
  },
    body: JSON.stringify({title,description,tag})
    
 });
 const json = await response.json();
 console.log("Note added:", json);
  
//logic for client side adding notes
    console.log("Adding a note")
    setNotes(Notes.concat(json));
  }

const deleteNote=async(id)=>{

  const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token'),
    },
   });
   const json = await response.json();
 console.log("Note Deleted:", json);

  console.log("Deleteing a note"+id);
  const newNote=Notes.filter((note)=>{
   return note._id!==id
  })
  setNotes(newNote);
}

const editNote=async (id,title,description,tag)=>{
//logic for api call
const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem('token'),
  },
    body: JSON.stringify({title,description,tag})
 });
 const json = await response.json();
 console.log("Note updated:", json);

  //logic for client side edit
  console.log("Editing a note"+id);
  const newNote=Notes.map((note)=>{
    if(note._id===id){
      return{
        ...note,
      title:title,
      description:description,
      tag:tag,
      };
    }
    return note;
  })
  setNotes(newNote);
};

    return(
        <NoteContext.Provider value={{Notes,addNote,deleteNote,editNote,getNotes,currentNote,setCurrentNote}} > 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;

