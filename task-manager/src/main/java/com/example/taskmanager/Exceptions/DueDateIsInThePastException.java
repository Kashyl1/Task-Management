package com.example.taskmanager.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DueDateIsInThePastException extends RuntimeException {
    public DueDateIsInThePastException(String message) {
        super(message);
    }
}
