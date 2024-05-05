import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  notes: [],
  completedNotes: [],
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    clearNote: (state) => {
      state.title = '';
      state.content = '';
      state.category = '';
    },

    addNote: (state, action) => {
      const newNote = { ...action.payload, id: nanoid() };
      state.notes.push(newNote);
    },

    addCompletedNote: (state, action) => {
      state.completedNotes.push(action.payload);
    },

    removeCompletedNote: (state, action) => {
      state.completedNotes = state.completedNotes.filter(
        (note) => note.id !== action.payload
      );
    },
    
  },
});

export const { clearNote, addNote, addCompletedNote, removeCompletedNote } =
  noteSlice.actions;
export default noteSlice.reducer;