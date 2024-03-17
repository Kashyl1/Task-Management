package com.example.taskmanager.auth;


import com.example.taskmanager.config.JwtService;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthenticationController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private JwtService jwtService;


    @Test
    public void registerTest() throws Exception {
        RegisterRequest request = new RegisterRequest("IAmATest", "User", "something@example.com", "CoolPassword123", "testuser");
        AuthenticationResponse response = new AuthenticationResponse("", "Registered successfully. Please verify your email.");

        given(authenticationService.register(any(RegisterRequest.class))).willReturn(response);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"firstname\":\"IAmATest\",\"lastname\":\"User\",\"email\":\"something@example.com\",\"password\":\"CoolPassword123\",\"username\":\"testuser\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Registered successfully. Please verify your email."));
    }
    @Test
    public void authenticateTest() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail("something@example.com");
        request.setPassword("CoolPassword123");

        AuthenticationResponse expectedResponse = new AuthenticationResponse("MajnTokeno", "Success");

        given(authenticationService.authenticate(any(AuthenticationRequest.class))).willReturn(expectedResponse);

        mockMvc.perform(post("/api/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"something@example.com\",\"password\":\"CoolPassword123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("MajnTokeno"))
                .andExpect(jsonPath("$.message").value("Success"));
    }
}