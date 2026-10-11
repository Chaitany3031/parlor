package com.angel.service;

import com.angel.payload.dto.SignupDTO;
import com.angel.payload.response.AuthResponse;

public interface AuthService {
    AuthResponse login(String username,String password) throws Exception;
    AuthResponse signup(SignupDTO req) throws Exception;
    AuthResponse getAccessTokenFromRefreshToken(String refreshToken) throws Exception;

}
