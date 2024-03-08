package com.example.taskmanager.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/app")
public class demoController {
    @GetMapping
    public ResponseEntity<String> TakieJestZycie() {
        return ResponseEntity.ok("");
    }
}
