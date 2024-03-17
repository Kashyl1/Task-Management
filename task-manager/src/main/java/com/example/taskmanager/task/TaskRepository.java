package com.example.taskmanager.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserIdAndArchivedTrue(Long userId);
    List<Task> findByUserIdAndArchivedFalse(Long userId);


}
