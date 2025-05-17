import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/noteState';
import Noteform from './components/noteform';
import Login from './components/login';
import Signup from './components/signup';
import Delete from './components/delete';
import EditNote from './components/EditForm';
function App() {
  return (

    <div className="App">
      <NoteState>
      <BrowserRouter>
      <Navbar/>
      <Delete message="This is a react course"/>
      <Routes>
        <Route path="/" element={<Noteform/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes >
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
