import React,{useContext,useEffect,useState} from 'react'
import NoteContext from "../context/notes/noteContext";
import NoteItem from './noteitem';
import {useNavigate } from 'react-router-dom';  


const Noteform=()=> {
  let navigate=useNavigate();
    const context=useContext(NoteContext);
    const {Notes,addNote,getNotes}=context;

    const [note,setnote]=useState({title:"",description:"",tag:""});
     
    const handleClick=()=>{
      addNote(note.title,note.description,note.tag);
      console.log("the values being sent are:",note);
  setnote({ title: "", description: "", tag: "" });
    }

    const onChange=(e)=>{
      setnote({...note,[e.target.id]:e.target.value});
    }
    useEffect(() => {
    

      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token);
    
      if (token) {
        getNotes();
        console.log("the use effect is running");
      } else {
        navigate("/login");
      }
    }, [getNotes, navigate]);
    


  return (
    

    <div className="container mt-4">
        <h1>Add Note</h1>
      <form className="mt-4">
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">title</label>
    <input type="text" className="form-control" id="title" onChange={onChange} value={note.title}/>
  </div>
  
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Description</label>
    <textarea className="form-control" id="description" rows="3" onChange={onChange} value={note.description}></textarea>
  </div>

  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">tag</label>
    <input type="text" className="form-control" id="tag" onChange={onChange} value={note.tag}/>
  </div>
  
</form>
<button type="submit" className="btn btn-primary mb-4" onClick={handleClick}>Add NoteItem</button>

<h1> Notes</h1>
{Notes.map((note,index)=>{
    return <NoteItem key={index} note={note} />

})}
    </div>
  )
}

export default Noteform;