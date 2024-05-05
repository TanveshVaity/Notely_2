package com.notely.notely.respository;


import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.notely.notely.entity.Note;


public interface NoteRespository extends JpaRepository<Note, UUID>{
    
}
