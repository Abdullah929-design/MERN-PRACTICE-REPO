import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const EditNote = () => {
  const context = useContext(NoteContext);
  const { editNote, currentNote } = context;
  const navigate = useNavigate();

  // Local state for form fields
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  // Load the current note data when the component mounts
  useEffect(() => {
    if (currentNote) {
      setNote({
        title: currentNote.title,
        description: currentNote.description,
        tag: currentNote.tag,
      });
    }
  }, [currentNote]);

  // Handle form input changes
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote(currentNote._id, note.title, note.description, note.tag);
    }
    navigate("/"); // Navigate back to home after updating
  };

  return (
    <div className="container mt-4">
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={note.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            name="tag"
            value={note.tag}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Note
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditNote;
