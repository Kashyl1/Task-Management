package com.example.taskmanager.auth;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.taskmanager.mailVerification.VerificationService;
import com.example.taskmanager.config.JwtService;
import com.example.taskmanager.user.Role;
import com.example.taskmanager.user.User;
import com.example.taskmanager.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootTest
public class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private VerificationService verificationService;

    @InjectMocks
    private AuthenticationService authenticationService;

    User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setEmail("something@example.com");
        user.setPassword(passwordEncoder.encode("CoolPassword123"));
        user.setVerified(true);
        user.setUsername("testUser");
        user.setRole(Role.USER);
    }

    @Test
    public void registerUserTest() {
        RegisterRequest request = RegisterRequest.builder()
                .email("something@example.com")
                .password("CoolPassword123")
                .firstname("IAmATest")
                .lastname("User")
                .username("testUser")
                .build();

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        AuthenticationResponse response = authenticationService.register(request);

        assertEquals("Registered successfully. Please verify your email.", response.getMessage());
        verify(userRepository, times(1)).save(any(User.class));

    }
    @Test
    void authenticate_ShouldReturnToken_WhenCredentialsAreValid() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn("token");
        AuthenticationRequest request = new AuthenticationRequest("something@example.com", "CoolPassword123");

        AuthenticationResponse response = authenticationService.authenticate(request);

        assertNotNull(response.getToken());
        assertEquals("token", response.getToken());
        verify(authenticationManager).authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    }
    @Test
    void authenticate_ShouldThrow_WhenUserNotFound() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        AuthenticationRequest request = new AuthenticationRequest("wrongONEEE@example.com", "CoolPassword123");

        assertThrows(UsernameNotFoundException.class, () -> {
            authenticationService.authenticate(request);
        });
    }

    @Test
    void authenticate_ShouldReturnMessage_WhenUserNotVerified() {
        user.setVerified(false);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        AuthenticationRequest request = new AuthenticationRequest("something@example.com", "CoolPassword123");

        AuthenticationResponse response = authenticationService.authenticate(request);

        assertEquals("User is not verified!", response.getMessage());
        assertNull(response.getToken());
    }
}
