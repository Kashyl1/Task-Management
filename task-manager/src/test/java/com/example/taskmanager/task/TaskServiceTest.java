package com.example.taskmanager.task;

import com.example.taskmanager.user.User;
import com.example.taskmanager.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        User user = new User();
        user.setId(1);
        user.setEmail("something@example.com");

        TaskRequest taskRequest = TaskRequest.builder()
                .title("Test Task")
                .description("Test  task Description")
                .dueDate(LocalDateTime.now().plusDays(1))
                .build();

    }
    @Test
    void deleteTask_ShouldRemoveTask_WhenTaskExists() {
        Long taskId = 1L;
        when(taskRepository.existsById(taskId)).thenReturn(true);

        taskService.deleteTask(taskId);

        verify(taskRepository, times(1)).deleteById(taskId);
    }
    @Test
    void getUserTasks_ShouldReturnListOfTasks_WhenUserExists() {
        String email = "something@example.com";
        User user = new User();
        user.setId(1);
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        OngoingStubbing<List<Task>> listOngoingStubbing = when(taskRepository.findByUserIdAndArchivedFalse(Long.valueOf(user.getId()))).thenReturn(new ArrayList<>());

        List<Task> result = taskService.getUserTasks(email);

        assertNotNull(result);
        verify(taskRepository, times(1)).findByUserIdAndArchivedFalse(Long.valueOf(user.getId()));
    }
    @Test
    void getArchivedTasks_ShouldReturnListOfArchivedTasks_WhenUserExists() {
        // Given
        String email = "something@example.com";
        User user = new User();
        user.setId(1);
        user.setEmail(email);
        // kjedy
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(taskRepository.findByUserIdAndArchivedTrue(Long.valueOf(user.getId()))).thenReturn(new ArrayList<>());

        List<Task> result = taskService.getArchivedTasks(email);
        // notak
        assertNotNull(result);
        verify(taskRepository, times(1)).findByUserIdAndArchivedTrue(Long.valueOf(user.getId()));
    }
    @Test
    void completeAndArchiveTask_ShouldMarkTaskAsCompletedAndArchived_WhenTaskExists() {
        Long taskId = 1L;
        Task task = new Task();
        task.setId(taskId);
        task.setCompletedStatus(false);
        task.setArchived(false);

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        taskService.completeAndArchiveTask(taskId);

        assertTrue(task.isCompletedStatus());
        assertTrue(task.isArchived());
        verify(taskRepository, times(1)).save(task);

        Task savedTask = taskRepository.findById(taskId).get();
        assertTrue(savedTask.isCompletedStatus());
        assertTrue(savedTask.isArchived());
    }

}

