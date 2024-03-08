package com.example.taskmanager.Task;

import com.example.taskmanager.Exceptions.DueDateIsInThePastException;
import com.example.taskmanager.Exceptions.TaskDescriptionIsNullException;
import com.example.taskmanager.user.User;
import com.example.taskmanager.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Task addTask(String email, TaskRequest taskRequest) {
        validateTaskRequest(taskRequest);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        Task task = new Task();
        task.setDescription(taskRequest.getDescription());
        task.setDueDate(taskRequest.getDueDate());
        task.setUser(user);

        return taskRepository.save(task);
    }
    public Task updateTask(Long taskId, TaskRequest taskRequest) {
        validateTaskRequest(taskRequest);

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        task.setDescription(taskRequest.getDescription());
        task.setDueDate(taskRequest.getDueDate());

        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        }
        taskRepository.deleteById(taskId);
    }
    public List<Task> getUserTasks(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return taskRepository.findByUserId(Long.valueOf(user.getId()));
    }
    private void validateTaskRequest(TaskRequest taskRequest) {
        if (taskRequest.getDescription() == null || taskRequest.getDescription().trim().isEmpty()) {
            throw new TaskDescriptionIsNullException("Task description is required");
        }
        if (taskRequest.getDueDate() != null && taskRequest.getDueDate().isBefore(LocalDateTime.now())) {
            throw new DueDateIsInThePastException("Due date cannot be in the past");
        }
    }
}