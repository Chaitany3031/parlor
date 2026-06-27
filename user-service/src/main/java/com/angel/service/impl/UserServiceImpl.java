package com.angel.service.impl;

import com.angel.exception.UserException;
import com.angel.modal.User;
import com.angel.repository.UserRepository;
import com.angel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) throws UserException {
        Optional<User> otp = userRepository.findById(id);
        if(otp.isPresent()){
            return otp.get();
        }
        throw new UserException("user not found");
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(Long id, User user) throws UserException {
        Optional<User>otp=userRepository.findById(id);
        if(otp.isEmpty()){
            throw new UserException("user not found with id: "+id);
        }
        User existingUser = otp.get();
        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setRole(user.getRole());
        existingUser.setUsername(user.getUsername());
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) throws UserException {
        Optional<User>otp=userRepository.findById(id);
        if(otp.isEmpty()){
            throw new UserException("user not exist with id: "+id);
        }
        userRepository.deleteById(otp.get().getId());
    }
}
