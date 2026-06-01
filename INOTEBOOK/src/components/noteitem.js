import React,{useContext} from 'react'
import NoteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const  NoteItem=(props)=> {
    const {note}=props;
    const context=useContext(NoteContext);
    const {deleteNote,setCurrentNote}=context;
    const navigate=useNavigate();

    const handleDelete=()=>{
      deleteNote(note._id);
    }
    const handleEdit=()=>{
      setCurrentNote(note);
      navigate(`/edit/${note._id}`);
    }
    
  return (
    <div className='row mb-4'>
        <div className="card my-4" style={{width:"18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
    <p className="card-text">{note.description}</p>
  </div>
  <div className="d-flex gap-2">
    <button type="button" className="btn btn-danger w-50" onClick={handleDelete}>Delete</button>
    <button type="button" className="btn btn-secondary w-50" onClick={handleEdit}>Edit</button>
  </div>
</div>

      
    </div>
  )
}
export default NoteItem
