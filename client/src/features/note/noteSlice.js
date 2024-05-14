import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  notes: [],
  searchResults: [],
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

export const updateNoteCompleted = createAsyncThunk(
  '/updateNoteCompleted',
  async ({ noteId, isCompleted }) => {
    try {
      await axios.put(`http://localhost:8080/api/update-completion/${noteId}`, { isCompleted });
      return { noteId, isCompleted };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteNote = createAsyncThunk(
  "/deleteNote",
  async (noteId) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete-note/${noteId}`);
      return noteId;
    } catch (error) {
      throw error;
    }
  }
);

export const updateNote = createAsyncThunk(
  '/updateNote',
  async (note) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/update-note/${note.id}`, note);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const searchNotes = createAsyncThunk(
  "/searchNote",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/notes/search?query=${query}`);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
)

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
      })

      .addCase(updateNoteCompleted.fulfilled, (state, action) => {
        const { noteId, isCompleted } = action.payload;
        const noteToUpdate = state.notes.find((note) => note.id === noteId);
        if (noteToUpdate) {
          noteToUpdate.completed = isCompleted;
        }
      })     

      .addCase(deleteNote.fulfilled, (state, action) =>{
        const noteId = action.payload;
        state.notes = state.notes.filter(note => note.id !== noteId);
      })

      .addCase(updateNote.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        state.notes = state.notes.map(note =>
          note.id === updatedNote.id ? updatedNote : note
        );
      })

      .addCase(searchNotes.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
  },
});

export const { clearNote, addNotes} = noteSlice.actions;
export default noteSlice.reducer;
