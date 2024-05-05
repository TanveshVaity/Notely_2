package com.notely.notely.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.notely.notely.entity.Note;
import com.notely.notely.service.NoteService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api")
public class NoteController {
    
    @Autowired
    NoteService noteService;

    @GetMapping("/notes")
    public List<Note> getAllNotesWithCategories(){
        return noteService.getAllNotesWithCategories();
    }

    @PostMapping("/add-note")
    public ResponseEntity<String> addNote(@RequestBody Note note) {
        return noteService.addNote(note);
    }

    @DeleteMapping("/delete-note/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable UUID id) {
        return noteService.deleteNote(id);
    }
    
}
