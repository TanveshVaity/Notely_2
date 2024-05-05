package com.notely.notely.service;

import java.util.List;

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
        return noteRespository.findAll();
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
}
