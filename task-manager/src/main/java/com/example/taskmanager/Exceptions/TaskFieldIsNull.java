package com.example.taskmanager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TaskFieldIsNull extends RuntimeException {
    public TaskFieldIsNull(String message) {
        super(message);
    }
}
