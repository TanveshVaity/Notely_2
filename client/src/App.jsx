import { Fragment, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Tabs from './components/UI/Tabs';
import Backdrop from './components/UI/Backdrop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector , useDispatch} from "react-redux";
import { fetchNotes } from './features/note/noteSlice';
import NoteForm from './components/NoteSection/NoteForm';
import { searchNotes } from './features/note/noteSlice';

function MainPage() {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.note.notes);
  const searchResults = useSelector(state => state.note.searchResults);
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
  },[dispatch, notes]);

  const handleSearch = (query) => {
    dispatch(searchNotes(query));
  }

  return (
    <Fragment>
      <Navbar onOpen={toggleAddNote} onSearch={handleSearch}/>
      {isAddNoteVisible && (
        <Backdrop isOpen={isAddNoteVisible} onClose={toggleAddNote}>
          <NoteForm onClose={toggleAddNote} type="add"/>
        </Backdrop>
      )}
      <div className="pl-10 pt-4 relative">
        <p className="font-bold text-xl">Your Notes</p>
        <div className="w-full">
          <Tabs notes={searchResults.length ? searchResults : notes} isChecked={isChecked} />
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
