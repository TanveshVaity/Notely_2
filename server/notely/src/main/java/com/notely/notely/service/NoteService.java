package com.notely.notely.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.notely.notely.entity.Note;
import com.notely.notely.respository.NoteRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class NoteService {

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    private Cloudinary cloudinary;

    public List<Note> getAllNotesWithCategories() {
    try {
        return noteRepository.findAll();
    } catch (DataAccessException ex) {
        ex.printStackTrace();
        return new ArrayList<>();
    }
}

    public ResponseEntity<String> addNoteWithFile(Note note, MultipartFile file) {
        try {
            // Upload the file to Cloudinary
            String uploadResult = cloudinary
                    .uploader()
                    .upload(file.getBytes(),
                            Map.of("public_id", UUID.randomUUID().toString()))
                    .get("url")
                    .toString();
            String fileUrl = (String) "url".get(uploadResult);

            // Set the file URL in the Note entity
            note.setFileUrl(fileUrl);

            // Save the Note entity
            noteRepository.save(note);
            return ResponseEntity.status(HttpStatus.CREATED).body("Note added successfully with file");
        } catch (DataAccessException | IOException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add note with file");
        }
    }

    public ResponseEntity<String> deleteNote(UUID id) {
        try {
            noteRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Note deleted successfully");
        } catch (DataAccessException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete note");
        }
    }

    public ResponseEntity<String> updateNoteIsComplete(UUID id, boolean completed) {
        try {
            Optional<Note> noteOptional = noteRepository.findById(id);
            if (noteOptional.isPresent()) {
                Note note = noteOptional.get();
                note.setCompleted(completed);
                noteRepository.save(note);
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
            Optional<Note> optionalNote = noteRepository.findById(id);
            if (optionalNote.isPresent()) {
                Note note = optionalNote.get();
                note.setTitle(newNote.getTitle());
                note.setContent(newNote.getContent());
                note.setCategory(newNote.getCategory());
                note.setUpdatedAt(LocalDateTime.now());
                noteRepository.save(note);
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
        return noteRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(query, query);
    }   
}

