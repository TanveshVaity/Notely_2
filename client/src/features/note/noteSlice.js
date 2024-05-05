import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  notes: [],
  completedNotes: [],
};

export const fetchNotes = createAsyncThunk(
  "/notes",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/notes");
      return response.data; 
    } catch (error) {
      throw error;
    }
  }
);

export const addNote = createAsyncThunk('/addNote', async (note) => {
  try {
    const response = await axios.post('http://localhost:8080/api/add-note', note);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    clearNote: (state) => {
      state.title = '';
      state.content = '';
      state.category = '';
    },

    addNotes: (state, action) => {
      state.notes.push(action.payload);
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

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.meta.arg);
      });
  },
});

export const { clearNote, addNotes, addCompletedNote, removeCompletedNote } =
  noteSlice.actions;
export default noteSlice.reducer;
