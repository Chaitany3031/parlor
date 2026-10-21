package com.angel.service;

import com.angel.payload.dto.*;
import com.angel.payload.response.TokenRespone;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeyCloakService {
    private static final String KEYCLOAK_BASE_URL = "http://localhost:8080";
    private static final String KEYCLOAK_ADMIN_API = KEYCLOAK_BASE_URL + "/admin/realms/master/users";
    private static final String TOKEN_URL = KEYCLOAK_BASE_URL + "/realms/master/protocol/openid-connect/token";
    private static final String CLIENT_ID = "salon-booking-client";
    private static final String CLIENT_SECRET = "1LTb67KCYHHHcPKMhs5o2DrZgTTZ16QtZVB6MpDfMtRSlZzjGvWeUpMpVl07Tdxj86BDTfPgX0lLzM6eFtaBzX";
    private static final String GRANT_TYPE = "password";
    private static final String scope = "openid profile email";
    private static final String username = "kaveri";
    private static final String password = "kiyo";
    private static final String clientId = "769edfcb-6c76-4478-8e7c-45d9fcfed6b2";
    private static final String ADMIN_CLIENT_ID = "admin-cli";
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin";

    private final RestTemplate restTemplate;

    public void createUser(SignupDTO signupDTO) throws Exception {
        String ACCESS_TOKEN = getAdminAccessToken(
                username,
                password,
                GRANT_TYPE, null
        ).getAccessToken();

        Credential credential = new Credential();
        credential.setTemporary(false);
        credential.setType("password");
        credential.setValue(signupDTO.getPassword());

        UserRequest userRequest = new UserRequest();
        userRequest.setUsername(signupDTO.getUsername());
        userRequest.setEmail(signupDTO.getEmail());
        userRequest.setEnabled(true);
        userRequest.setLastName(signupDTO.getFullName());
        userRequest.getCredentials().add(credential);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.setBearerAuth(ACCESS_TOKEN);

        HttpEntity<UserRequest> requestHttpEntity = new HttpEntity<>(userRequest, httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                KEYCLOAK_ADMIN_API,
                HttpMethod.POST,
                requestHttpEntity,
                String.class
        );

        if (responseEntity.getStatusCode() == HttpStatus.CREATED) {
            System.out.println("user created successfully");

            KeycloakUserDTO user = fetchFirstUserByUsername(signupDTO.getUsername(), ACCESS_TOKEN);

            KeycloakRole role = getRoleByName(clientId, ACCESS_TOKEN, signupDTO.getRole().toString());

            List<KeycloakRole> roles = new ArrayList<>();
            roles.add(role);

            assignRoleToUser(user.getId(),
                    clientId,
                    roles,
                    ACCESS_TOKEN);
        } else {
            System.out.println("user creation failed");
            throw new Exception(responseEntity.getBody());
        }
    }

    public TokenRespone getAdminAccessToken(String username,
                                            String password,
                                            String grantType,
                                            String refreshToken) throws Exception {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", ADMIN_CLIENT_ID);
        requestBody.add("grant_type", grantType);

        if ("password".equalsIgnoreCase(grantType)) {
            requestBody.add("username", username != null ? username : ADMIN_USERNAME);
            requestBody.add("password", password != null ? password : ADMIN_PASSWORD);
        } else if ("refresh_token".equalsIgnoreCase(grantType)) {
            requestBody.add("refresh_token", refreshToken);
        }

        HttpEntity<MultiValueMap<String, String>> requestHttpEntity = new HttpEntity<>(requestBody, httpHeaders);

        ResponseEntity<TokenRespone> responseEntity = restTemplate.exchange(
                TOKEN_URL,
                HttpMethod.POST,
                requestHttpEntity,
                TokenRespone.class
        );

        if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
            return responseEntity.getBody();
        }

        throw new Exception("Failed to obtain admin token from Keycloak");
    }

    public TokenRespone getUserAccessToken(String username,
                                           String password,
                                           String grantType,
                                           String refreshToken) throws Exception {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", CLIENT_ID);
        if (CLIENT_SECRET != null && !CLIENT_SECRET.isBlank()) {
            requestBody.add("client_secret", CLIENT_SECRET);
        }
        requestBody.add("grant_type", grantType);
        requestBody.add("scope", scope);

        if ("password".equalsIgnoreCase(grantType)) {
            requestBody.add("username", username);
            requestBody.add("password", password);
        } else if ("refresh_token".equalsIgnoreCase(grantType)) {
            requestBody.add("refresh_token", refreshToken);
        }

        HttpEntity<MultiValueMap<String, String>> requestHttpEntity = new HttpEntity<>(requestBody, httpHeaders);

        ResponseEntity<TokenRespone> responseEntity = restTemplate.exchange(
                TOKEN_URL,
                HttpMethod.POST,
                requestHttpEntity,
                TokenRespone.class
        );

        if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
            return responseEntity.getBody();
        }

        throw new Exception("Failed to obtain access token from Keycloak");
    }

    public KeycloakRole getRoleByName(String roleName, String token) throws Exception {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("Admin token is null or empty");
        }

        String roleUrl = KEYCLOAK_BASE_URL + "/admin/realms/master/clients/" + clientId + "/roles/" + roleName;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<KeycloakRole> response = restTemplate.exchange(
                roleUrl,
                HttpMethod.GET,
                entity,
                KeycloakRole.class
        );

        return response.getBody();
    }

    public KeycloakRole getRoleByName(String clientId, String token, String role) throws Exception {
        return getRoleByName(role, token);
    }

    public KeycloakUserDTO fetchFirstUserByUsername(String username, String token) throws Exception {
        String url = KEYCLOAK_BASE_URL + "/admin/realms/master/users?username=" + username;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(token);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestHttpEntity = new HttpEntity<>(httpHeaders);

        ResponseEntity<KeycloakUserDTO[]> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                requestHttpEntity,
                KeycloakUserDTO[].class
        );
        KeycloakUserDTO[] userDTOS = responseEntity.getBody();
        if (userDTOS != null && userDTOS.length > 0) {
            return userDTOS[0];
        }

        throw new Exception("user not found with username " + username);
    }

    public void assignRoleToUser(String userId,
                                 String clientId,
                                 List<KeycloakRole> roles,
                                 String token
    ) throws Exception {
        String url = KEYCLOAK_BASE_URL + "/admin/realms/master/users/" + userId + "/role-mappings/clients/" + clientId;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(token);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<List<KeycloakRole>> requestHttpEntity = new HttpEntity<>(roles, httpHeaders);

        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestHttpEntity,
                    String.class
            );

        } catch (Exception e) {
            throw new Exception("failed to assign new role " + e.getMessage());
        }
    }

    public KeycloakUserDTO fetchUserProfileByJwt(String token) throws Exception {
        String cleanToken = token;
        if (cleanToken != null) {
            while (cleanToken.regionMatches(true, 0, "Bearer ", 0, 7)) {
                cleanToken = cleanToken.substring(7).trim();
            }
        }

        try {
            String url = KEYCLOAK_BASE_URL + "/realms/master/protocol/openid-connect/userinfo";

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setBearerAuth(cleanToken);
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> requestHttpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<KeycloakUserDTO> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    requestHttpEntity,
                    KeycloakUserDTO.class
            );
            return responseEntity.getBody();
        } catch (Exception e) {
            // Fallback: extract user claims directly from JWT payload
            try {
                return extractUserFromJwtPayload(cleanToken);
            } catch (Exception ex) {
                throw new Exception("failed to get user info " + e.getMessage());
            }
        }
    }

    private KeycloakUserDTO extractUserFromJwtPayload(String token) {
        if (token == null || !token.contains(".")) {
            throw new IllegalArgumentException("Invalid JWT token format");
        }
        String[] parts = token.split("\\.");
        if (parts.length < 2) {
            throw new IllegalArgumentException("Invalid JWT token format");
        }
        byte[] decodedBytes = Base64.getUrlDecoder().decode(parts[1]);
        String payloadJson = new String(decodedBytes, StandardCharsets.UTF_8);
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode node = mapper.readTree(payloadJson);
            KeycloakUserDTO dto = new KeycloakUserDTO();
            if (node.hasNonNull("sub")) {
                dto.setId(node.get("sub").asText());
            }
            if (node.hasNonNull("email")) {
                dto.setEmail(node.get("email").asText());
            }
            if (node.hasNonNull("preferred_username")) {
                dto.setUsername(node.get("preferred_username").asText());
            } else if (node.hasNonNull("username")) {
                dto.setUsername(node.get("username").asText());
            }
            if (node.hasNonNull("given_name")) {
                dto.setFirstName(node.get("given_name").asText());
            }
            if (node.hasNonNull("family_name")) {
                dto.setLastName(node.get("family_name").asText());
            }
            if (dto.getEmail() != null || dto.getUsername() != null) {
                return dto;
            }
        } catch (Exception ignored) {
        }
        throw new IllegalStateException("JWT payload does not contain user claims");
    }
}
