import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Tabs from './components/UI/Tabs';
import Backdrop from './components/UI/Backdrop';
import AddNote from './components/NoteSection/AddNote';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteList from './components/NoteSection/NoteList';
import { useSelector } from "react-redux";

function MainPage() {
  const notes = useSelector(state => state.note.notes);
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);

  const toggleAddNote = () => {
    setIsAddNoteVisible(!isAddNoteVisible);
  };

  return (
    <>
      <Navbar onOpen={toggleAddNote}/>
      {isAddNoteVisible && (
        <Backdrop isOpen={isAddNoteVisible} onClose={toggleAddNote}>
          <AddNote onClose={toggleAddNote} />
        </Backdrop>
      )}
      <div className="pl-10 pt-4">
        <p className="font-bold text-xl">Your Notes</p>
        <div className="mt-1">
          <Tabs notes={notes}/>
        </div>
      </div>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default App;
