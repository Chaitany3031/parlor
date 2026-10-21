package com.angel.service.impl;

import com.angel.payload.dto.UserDTO;
import com.angel.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${user-service.url:http://localhost:5001}")
    private String userServiceUrl;

    @Override
    public UserDTO getUserProfile(String jwt) {
        if (jwt == null || jwt.isBlank()) {
            return null;
        }

        String authHeader = jwt.trim().startsWith("Bearer ") ? jwt.trim() : "Bearer " + jwt.trim();

        // 1. First attempt: call user-service /api/users/profile
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<UserDTO> response = restTemplate.exchange(
                    userServiceUrl + "/api/users/profile",
                    HttpMethod.GET,
                    entity,
                    UserDTO.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception e) {
            System.err.println("Notice: Calling user-service directly failed (" + e.getMessage() + "), falling back to JWT claims parser");
        }

        // 2. Fallback: Parse claims directly from JWT token payload
        try {
            String token = authHeader.substring(7).trim();
            String[] parts = token.split("\\.");
            if (parts.length >= 2) {
                byte[] decodedBytes = Base64.getUrlDecoder().decode(parts[1]);
                String payloadJson = new String(decodedBytes, StandardCharsets.UTF_8);
                JsonNode root = objectMapper.readTree(payloadJson);

                UserDTO userDTO = new UserDTO();
                if (root.has("email")) {
                    userDTO.setEmail(root.get("email").asText());
                }
                if (root.has("name")) {
                    userDTO.setFullName(root.get("name").asText());
                } else if (root.has("preferred_username")) {
                    userDTO.setFullName(root.get("preferred_username").asText());
                }
                if (root.has("preferred_username")) {
                    userDTO.setUsername(root.get("preferred_username").asText());
                }
                return userDTO;
            }
        } catch (Exception ex) {
            System.err.println("Could not parse JWT token claims: " + ex.getMessage());
        }

        return null;
    }
}
