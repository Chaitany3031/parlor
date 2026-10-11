package com.angel.service.impl;

import com.angel.modal.User;
import com.angel.payload.dto.SignupDTO;
import com.angel.payload.response.AuthResponse;
import com.angel.payload.response.TokenRespone;
import com.angel.repository.UserRepository;
import com.angel.service.AuthService;
import com.angel.service.KeyCloakService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final KeyCloakService keyCloakService;

    @Override
    public AuthResponse login(String username, String password) throws Exception {
        TokenRespone tokenRespone = keyCloakService.getAdminAccessToken(username,password,"password",null);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setRefresh_token(tokenRespone.getRefreshToken());
        authResponse.setJwt(tokenRespone.getAccessToken());
        authResponse.setMessage("Login success");
        return authResponse;
    }

    @Override
    public AuthResponse signup(SignupDTO req)throws Exception{
        keyCloakService.createUser(req);
        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(req.getPassword());
        user.setRole(req.getRole());
        user.setFullName(req.getFullName());
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        TokenRespone tokenRespone = keyCloakService.getAdminAccessToken(req.getUsername(),req.getPassword(),"password",null);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setRefresh_token(tokenRespone.getRefreshToken());
        authResponse.setJwt(tokenRespone.getAccessToken());
        authResponse.setRole(user.getRole());
        authResponse.setMessage("Register success");
        return authResponse;
    }

    @Override
    public AuthResponse getAccessTokenFromRefreshToken(String refreshToken) throws Exception {
        TokenRespone tokenRespone = keyCloakService.getAdminAccessToken(null,null,"refresh_token",null);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setRefresh_token(tokenRespone.getRefreshToken());
        authResponse.setJwt(tokenRespone.getAccessToken());
        authResponse.setMessage("Login success");
        return authResponse;
    }
}
