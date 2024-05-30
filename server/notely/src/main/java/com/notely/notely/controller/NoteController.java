package com.notely.notely.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.notely.notely.entity.Note;
import com.notely.notely.service.NoteService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


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
    public ResponseEntity<String> addNote(@RequestPart("file") MultipartFile file, @RequestPart("note") Note note) {
        return noteService.addNoteWithFile(note, file);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete-note/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable UUID id) {
        return noteService.deleteNote(id);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/update-completion/{id}")
    public ResponseEntity<String> updateNoteIsComplete(@PathVariable UUID id, @RequestParam Boolean completed) {
        return noteService.updateNoteIsComplete(id, completed);
    }

    @PutMapping("/update-note/{id}")
    public ResponseEntity<String> updateNote(@PathVariable("id") UUID id,  @RequestBody Note newNote){
        return noteService.updateNote(id, newNote);
    }

    @GetMapping("/notes/search")
    public ResponseEntity<List<Note>> searchNotes(@RequestParam String query) {
        List<Note> searchResults = noteService.searchNotes(query);
        return ResponseEntity.ok(searchResults);
    }
    
}
