package com.notely.notely.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.notely.notely.entity.Note;
import com.notely.notely.service.NoteService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




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

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete-note/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable UUID id) {
        return noteService.deleteNote(id);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/update-completion/{id}")
    public ResponseEntity<String> updateNoteIsComplete(@PathVariable UUID id, @RequestParam(required = false) Boolean completed) {
        return noteService.updateNoteIsComplete(id, completed);
    }

    @PutMapping("/update-note/{id}")
    public ResponseEntity<String> updateNote(@PathVariable("id") UUID id,  @RequestBody Note newNote){
        return noteService.updateNote(id, newNote);
    }
}
