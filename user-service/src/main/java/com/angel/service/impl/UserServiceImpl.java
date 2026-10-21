package com.angel.service.impl;

import com.angel.exception.UserException;
import com.angel.modal.User;
import com.angel.payload.dto.KeycloakUserDTO;
import com.angel.repository.UserRepository;
import com.angel.service.KeyCloakService;
import com.angel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final KeyCloakService keyCloakService;
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
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) throws UserException {
        Optional<User> otp = userRepository.findById(id);
        if(otp.isEmpty()){
            throw new UserException("user not found with id: "+id);
        }
        userRepository.deleteById(id);
//        return "User deleted";
    }

    @Override
    public User updateUser(User user, Long id) throws UserException {
        Optional<User> otp = userRepository.findById(id);
        if(otp.isEmpty()){
            throw new UserException("user not found with id: "+id);
        }
        User existingUser = otp.get();

        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setRole(user.getRole());
        existingUser.setUsername(user.getUsername());

        return userRepository.save(existingUser);
    }

    @Override
    public User getUserFromJwt(String jwt) throws Exception {
        KeycloakUserDTO keycloakUserDTO = keyCloakService.fetchUserProfileByJwt(jwt);
        User user = null;
        if (keycloakUserDTO.getEmail() != null && !keycloakUserDTO.getEmail().isBlank()) {
            user = userRepository.findByEmail(keycloakUserDTO.getEmail());
        }
        if (user == null && keycloakUserDTO.getUsername() != null && !keycloakUserDTO.getUsername().isBlank()) {
            user = userRepository.findByUsername(keycloakUserDTO.getUsername());
        }
        if (user == null) {
            throw new UserException("user not found for email: " + keycloakUserDTO.getEmail() + " or username: " + keycloakUserDTO.getUsername());
        }
        return user;
    }
}
