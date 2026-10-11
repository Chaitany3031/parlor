package com.angel.service;

import com.angel.payload.dto.*;
import com.angel.payload.response.TokenRespone;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeyCloakService {
    private static final String KEYCLOAK_BASE_URL = "http://localhost:8080";
    private static final String KEYCLOAK_ADMIN_API = KEYCLOAK_BASE_URL+"/admin/realms/master/users";
    private static final String TOKEN_URL = KEYCLOAK_BASE_URL+"/realms/master/protocol/openid-connect/token";
    private static final String CLIENT_ID = "salon-booking-client";
    private static final String CLIENT_SECRET = "1LTb67KCYHHHcPKMhs5o2DrZgTTZ16QtZVB6MpDfMtRSlZzjGvWeUpMpVl07Tdxj86BDTfPgX0lLzM6eFtaBzX";
    private static final String GRANT_TYPE = "password";
    private static final String scope = "openid profile email";
    private static final String username = "kaveri";
    private static final String password = "kiyo";
    private static final String clientId = "769edfcb-6c76-4478-8e7c-45d9fcfed6b2";
    private final RestTemplate restTemplate;
    public void createUser(SignupDTO signupDTO) throws Exception{
        String ACCESS_TOKEN = getAdminAccessToken(
                username,
                password,
                GRANT_TYPE,null
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


        HttpEntity<UserRequest> requestHttpEntity = new HttpEntity<>(userRequest,httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                KEYCLOAK_ADMIN_API,
                HttpMethod.POST,
                requestHttpEntity,
                String.class
        );

        if(responseEntity.getStatusCode()==HttpStatus.CREATED){
            System.out.println("user created successfully");

            KeycloakUserDTO user = fetchFirstUserByUsername(signupDTO.getUsername(),ACCESS_TOKEN);

            KeycloakRole role = getRoleByName(clientId,ACCESS_TOKEN,signupDTO.getRole().toString());

            List<KeycloakRole> roles = new ArrayList<>();
            roles.add(role);


            assignRoleToUser(user.getId(),
                    clientId,
                    roles,
                    ACCESS_TOKEN);
        }else{
            System.out.println("user creation failed");
            throw new Exception(responseEntity.getBody());
        }

    }

    public TokenRespone getAdminAccessToken(String username,
                                            String password,
                                            String grantType,
                                            String refreshToken) throws Exception {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//        httpHeaders.setBearerAuth(ACCESS_TOKEN);

        MultiValueMap<String,String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type",GRANT_TYPE);
        requestBody.add("username",username);
        requestBody.add("password",password);
        requestBody.add("refresh_token",refreshToken);
        requestBody.add("client_id",CLIENT_ID);
        requestBody.add("client_secret",CLIENT_SECRET);
        requestBody.add("scope",scope);


        HttpEntity<MultiValueMap<String,String>> requestHttpEntity = new HttpEntity<>(requestBody,httpHeaders);

        ResponseEntity<TokenRespone> responseEntity = restTemplate.exchange(
                TOKEN_URL,
                HttpMethod.POST,
                requestHttpEntity,
                TokenRespone.class
        );
        if(responseEntity.getStatusCode()==HttpStatus.OK && responseEntity.getBody() != null){

        return responseEntity.getBody();
        }
        throw new Exception("Failed to obtain access token");
    }

    public KeycloakRole getRoleByName(String clientId,
                                      String token,
                                      String role)
//            throws Exception
    {

        String url = KEYCLOAK_BASE_URL+"/admin/realms/master/clients/"+clientId+"/roles/"+role;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization","Bearer"+token);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);



        HttpEntity<Void> requestHttpEntity = new HttpEntity<>(httpHeaders);

        ResponseEntity<KeycloakRole> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                requestHttpEntity,
                KeycloakRole.class
        );
//        if(responseEntity.getBody() != null){

            return responseEntity.getBody();
//        }
//        throw new Exception("Failed to get role");
//        return null;
    }

    public KeycloakUserDTO fetchFirstUserByUsername(String username, String token) throws Exception {
        String url = KEYCLOAK_BASE_URL+"/admin/realms/master/users?username="+username;

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
        if(userDTOS!=null && userDTOS.length >0){
            return userDTOS[0];
        }

        throw new Exception("user not found with username "+username);

//        return responseEntity.getBody()[0];
//        return null;
    }

    public void assignRoleToUser(String userId,
                                 String clientId,
                                 List<KeycloakRole>roles,
                                 String token
    ) throws Exception {
        String url = KEYCLOAK_BASE_URL+"/admin/realms/master/users/"+userId+"/role-mappings/clients/"+clientId;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(token);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);



        HttpEntity<List<KeycloakRole>> requestHttpEntity = new HttpEntity<>(roles,httpHeaders);

        try{
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestHttpEntity,
                    String.class
            );

        }catch (Exception e){
            throw new Exception("failed to assign new role "+e.getMessage());
        }

    }

}
