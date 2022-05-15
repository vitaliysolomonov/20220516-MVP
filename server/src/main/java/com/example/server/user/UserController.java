package com.example.server.user;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000/")

public class UserController {
    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    //1. Add new user
    @PostMapping
    public User addNewUser(@RequestBody User user) {
        return repository.save(user);
    }

    //2. Get all users
    @GetMapping
    public Iterable<User> getAllUsers() {
        return repository.findAll();
    }

    //3. Find one user
    @PostMapping("/find")
    public User getOneUser(@RequestBody HashMap<String, String> login) {
        String userName = login.get("userName");
        String password = login.get("password");
        return repository.findByUserNameAndPassword(userName, password);
    }

    //Exception handler if user is not found
    @ExceptionHandler(value = {NoSuchElementException.class, EmptyResultDataAccessException.class})
    public ResponseEntity<String> handleMissingNoteException() {
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    //4. Patch a mail entry
    @PatchMapping("/{id}")
    public User updateOneUser(@PathVariable Long id, @RequestBody HashMap<String,String> update) {
        User userToUpdate = repository.findById(id).get();
        update.forEach((k,v)->{
            switch(k){
                case "name":
                    userToUpdate.setName(v);
                    break;
                case "unit":
                    userToUpdate.setUnit(v);
                    break;
                case "access":
                    userToUpdate.setAccess(v);
                    break;
                case "userName":
                    userToUpdate.setUserName(v);
                    break;
                case "password":
                    userToUpdate.setPassword(v);
                    break;
                case "email":
                    userToUpdate.setEmail(v);
                    break;
                default:break;
            }
        });
        return repository.save(userToUpdate);
    }

}
