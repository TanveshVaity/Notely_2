import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes: [],
}

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    clearNote: state => {
        state.title = '';
        state.content = '';
        state.category = '';
    },
    addNote: (state, action) => {
        state.notes.push(action.payload);
    },
  },
})

export const {clearNote , addNote} = noteSlice.actions

export default noteSlice.reducer;