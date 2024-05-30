package com.notely.notely.respository;


import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.notely.notely.entity.Note;


public interface NoteRepository extends JpaRepository<Note, UUID>{
    List<Note> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content);

}
