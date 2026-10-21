package com.angel.service;

import com.angel.exception.UserException;
import com.angel.modal.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    User getUserById(Long id) throws UserException;
    List<User> getAllUsers();
    void deleteUser(Long id) throws UserException;
    User updateUser(User user, Long id) throws UserException;
    User getUserFromJwt(String jwt) throws Exception;
}
