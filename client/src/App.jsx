import { Fragment, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Tabs from './components/UI/Tabs';
import Backdrop from './components/UI/Backdrop';
import AddNote from './components/NoteSection/AddNote';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector , useDispatch} from "react-redux";
import { fetchNotes } from './features/note/noteSlice';

function MainPage() {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.note.notes);
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleAddNote = () => {
    setIsAddNoteVisible(!isAddNoteVisible);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }

  useEffect(()=>{
    dispatch(fetchNotes())
  },[dispatch])

  return (
    <Fragment>
      <Navbar onOpen={toggleAddNote} />
      {isAddNoteVisible && (
        <Backdrop isOpen={isAddNoteVisible} onClose={toggleAddNote}>
          <AddNote onClose={toggleAddNote} />
        </Backdrop>
      )}
      <div className="pl-10 pt-4 relative">
        <p className="font-bold text-xl">Your Notes</p>
        <div className="w-full">
          <Tabs notes={notes} isChecked={isChecked} />
        </div>
        <div className="absolute flex items-center right-20 top-12">
          <input
            onClick={handleCheckboxChange}
            type="checkbox"
            className="h-5 w-5 bg-gray-600 mr-2"
          />
          <span>Show only completed notes</span>
        </div>
      </div>
    </Fragment>
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
