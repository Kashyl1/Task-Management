package com.example.taskmanager.Task;

import com.example.taskmanager.Group.Group;
import com.example.taskmanager.user.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDateTime dueDate;
    private boolean isCompleted;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(mappedBy = "tasks")
    private Set<Group> groups = new HashSet<>();
}
