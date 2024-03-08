package com.example.taskmanager.user;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.taskmanager.S3_Client.S3Config;
import com.example.taskmanager.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserService userService;




    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUser(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        String email = jwtService.extractUsername(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + email));

        UserProfileResponse response = UserProfileResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .profileImageUrl(user.getProfileImageUrl())
                .build();
        return ResponseEntity.ok(response);
    }
    @PostMapping("/uploadProfileImage")
    public ResponseEntity<?> uploadProfileImage(@RequestHeader("Authorization") String authorizationHeader, @RequestParam("file") MultipartFile file) {
        try {
            String token = authorizationHeader.substring(7);
            String email = jwtService.extractUsername(token);
            String fileUrl = userService.uploadProfileImage(email, file);
            return ResponseEntity.ok().body(new ProfileImageResponse(fileUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile photo: " + e.getMessage());
        }
    }
    @DeleteMapping("/deleteProfileImage")
    public ResponseEntity<?> deleteProfileImage(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.substring(7);
            String email = jwtService.extractUsername(token);
            userService.deleteProfileImage(email);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete profile photo: " + e.getMessage());
        }
    }
}

