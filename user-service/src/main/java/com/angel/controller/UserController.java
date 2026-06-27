package com.angel.controller;

import com.angel.exception.UserException;
import com.angel.modal.User;
import com.angel.repository.UserRepository;
import com.angel.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping("/api/users")
    public ResponseEntity<User> createUser(@RequestBody @Valid User user){
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
@GetMapping("/api/users")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
    @GetMapping("/api/user/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") Long id)throws Exception{
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
    @PutMapping("/api/user/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user,
                           @PathVariable Long id)throws Exception{
        User updatedUser = userService.updateUser(id,user);
        return new ResponseEntity<>(updatedUser,HttpStatus.OK);
    }
    @DeleteMapping("/api/user/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id)throws Exception{
        userService.deleteUser(id);
        return new ResponseEntity<>("User deleted ",HttpStatus.ACCEPTED);
    }
}
