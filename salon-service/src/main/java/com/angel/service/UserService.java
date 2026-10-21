package com.angel.service;

import com.angel.payload.dto.UserDTO;

public interface UserService {
    UserDTO getUserProfile(String jwt);
}
