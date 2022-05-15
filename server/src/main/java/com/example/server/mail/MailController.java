package com.example.server.mail;

import com.example.server.user.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/mail")
@CrossOrigin(origins = "http://localhost:3000/")
public class MailController {
    private final MailRepository repository;

    public MailController(MailRepository repository) {
        this.repository = repository;
    }

    //1. Post new mail record
    @PostMapping
    public Mail postNewMailRecord(@RequestBody Mail mail) {
        return repository.save(mail);
    }

    //2. Get all mail entries
    @GetMapping
    public Iterable<Mail> getAllMail() {
        return repository.findAll();
    }

    //2.a. Get all mail entries sorted starting from HHC
    @GetMapping("/sorted")
    public Iterable<Mail> getAllMailSorted() {
        return repository.findAllSorted();
    }

    //3. Patch a mail entry
    @PatchMapping("/{id}")
    public Mail updateOneMailEntry(@PathVariable Long id, @RequestBody HashMap<String, Integer> newMailCount) {
        Mail entryToUpdate = repository.findById(id).get();
        if (newMailCount.get("mailCount") > 0) entryToUpdate.setMailCount(newMailCount.get("mailCount"));
        return repository.save(entryToUpdate);
    }

    //4. Delete an entry
    @DeleteMapping("/{id}")
    public String deleteOneEntry(@PathVariable Long id) {
        repository.deleteById(id);
        return "Entry was deleted";
    }

    //5. Find one mail entry
    @PostMapping("/find")
    public Mail getOneMailEntry(@RequestBody HashMap<String,String> userInfo){
        String name = userInfo.get("name");
        String unit = userInfo.get("unit");
        return repository.findByNameAndUnit(name,unit);
    }
    //Exception handler if user is not found
    @ExceptionHandler(value = {NoSuchElementException.class, EmptyResultDataAccessException.class})
    public ResponseEntity<String> handleMissingNoteException() {
        return new ResponseEntity<>("Mail not found", HttpStatus.NOT_FOUND);
    }

//    //5. Authentication
//    @PostMapping("/login")
//    public Map<String, String> provideToken(@RequestBody HashMap<String, String> pass) {
//        HashMap<String, String> response = new HashMap<>();
//        if (pass.get("userName").equals("clerk") && pass.get("password").equals("123"))
//            response.put("token", "admin");
//        else if (pass.get("userName").equals("hhc") && pass.get("password").equals("123"))
//            response.put("token", "hhc");
//        else if (pass.get("userName").equals("user") && pass.get("password").equals("123"))
//            response.put("token", "user");
//        return response;
//    }
}
