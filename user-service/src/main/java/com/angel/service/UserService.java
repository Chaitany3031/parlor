package com.angel.service;

import com.angel.exception.UserException;
import com.angel.modal.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    User getUserById(Long id) throws UserException;
    List<User> getUsers();
    User updateUser(Long id,User user) throws UserException;
    void deleteUser(Long id) throws UserException;

}
