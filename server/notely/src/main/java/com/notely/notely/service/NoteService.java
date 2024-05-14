package com.notely.notely.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.notely.notely.entity.Note;
import com.notely.notely.respository.NoteRespository;

@Service
public class NoteService {

    @Autowired
    NoteRespository noteRespository;

    public List<Note> getAllNotesWithCategories() {
    try {
        return noteRespository.findAll();
    } catch (DataAccessException ex) {
        ex.printStackTrace();
        return new ArrayList<>();
    }
}

    public ResponseEntity<String> addNote(Note note) {
        try {
            noteRespository.save(note);
            return ResponseEntity.status(HttpStatus.CREATED).body("Note added successfully");
        } catch (DataAccessException ex) {
            ex.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add note");
        }
    }

    public ResponseEntity<String> deleteNote(UUID id) {
        try {
            noteRespository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Note deleted successfully");
        } catch (DataAccessException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete note");
        }
    }

    public ResponseEntity<String> updateNoteIsComplete(UUID id, boolean completed) {
        try {
            Optional<Note> noteOptional = noteRespository.findById(id);
            if (noteOptional.isPresent()) {
                Note note = noteOptional.get();
                note.setCompleted(completed);
                noteRespository.save(note);
                return ResponseEntity.status(HttpStatus.OK).body("Note completion updated successfully");
            } 
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found");
            }
        } catch (DataAccessException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update completion");
        }
    }

    public ResponseEntity<String> updateNote(UUID id, Note newNote) {
        try {
            Optional<Note> optionalNote = noteRespository.findById(id);
            if (optionalNote.isPresent()) {
                Note note = optionalNote.get();
                note.setTitle(newNote.getTitle());
                note.setContent(newNote.getContent());
                note.setCategory(newNote.getCategory());
                note.setUpdatedAt(LocalDateTime.now());
                noteRespository.save(note);
                return ResponseEntity.status(HttpStatus.OK).body("Note updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found");
            }
        } catch (DataAccessException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update note");
        }
    }

    public List<Note> searchNotes(String query){
        return noteRespository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(query, query);
    }   
}

