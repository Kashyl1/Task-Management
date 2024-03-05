package com.example.taskmanager.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "First name is required")
    private String firstname;
    @NotBlank(message = "Last name name is required")
    private String lastname;
    @NotBlank(message = "Email is required")
    @Email(message = "The email address is invalid")
    private String email;
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long, contain at least one digit and one uppercase letter")
    @Pattern(regexp = ".*[A-Z].*", message = "Password must be at least 8 characters long, contain at least one digit and one uppercase letter")
    @Pattern(regexp = ".*\\d.*", message = "Password must be at least 8 characters long, contain at least one digit and one uppercase letter")
    private String password;
    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 15, message = "Username must be between 4 and 15 characters long and can only contain letters/numbers")
    @Pattern(regexp = "^[a-zA-Z0-9._-]{4,}$", message = "Username must be between 4 and 15 characters long and can only contain letters/numbers")
    private String username;
}

