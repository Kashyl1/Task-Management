package com.example.taskmanager.Task;

import com.example.taskmanager.config.JwtService;
import com.example.taskmanager.user.User;
import com.example.taskmanager.user.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    @PostMapping("/addTask")
    public ResponseEntity<Task> createTask(@RequestBody TaskRequest taskRequest, @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        User user = getUserFromToken(token);

        Task task = service.addTask(user.getEmail(), taskRequest);
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
    public ResponseEntity<List<TaskResponse>> getUserTasks(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        User user = getUserFromToken(token);

        List<Task> tasks = service.getUserTasks(user.getEmail());
        List<TaskResponse> response = tasks.stream().map(task -> new TaskResponse(task.getId(), task.getDescription(), task.getDueDate())).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
    public User getUserFromToken(String token) {
        String userEmail = jwtService.extractUsername(token);
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + userEmail));
    }


}