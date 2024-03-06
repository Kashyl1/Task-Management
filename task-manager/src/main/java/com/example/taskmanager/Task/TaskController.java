package com.example.taskmanager.Task;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @PostMapping("/addTask")
    public ResponseEntity<Task> createTask(@RequestBody TaskRequest TaskRequest, Principal principal) {
        String username = principal.getName();
        Task task = service.addTask(username, TaskRequest);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }
    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long taskId, @Valid @RequestBody TaskRequest taskRequest) {
        Task updatedTask = service.updateTask(taskId, taskRequest);
        TaskResponse response = new TaskResponse(updatedTask.getId(), updatedTask.getDescription(), updatedTask.getDueDate());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        service.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getUserTasks(Principal principal) {
        String username = principal.getName();
        List<Task> tasks = service.getUserTasks(username);
        List<TaskResponse> response = tasks.stream().map(task -> new TaskResponse(task.getId(), task.getDescription(), task.getDueDate())).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
}