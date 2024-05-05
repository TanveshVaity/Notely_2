package com.notely.notely.respository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.notely.notely.entity.Note;


public interface NoteRespository extends JpaRepository<Note, Long>{
    
}
