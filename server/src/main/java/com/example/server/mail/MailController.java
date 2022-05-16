package com.example.server.mail;

import com.example.server.user.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public Mail updateOneMailEntry(@PathVariable Long id, @RequestBody HashMap<String, Object> newMailInfo) {
        Mail entryToUpdate = repository.findById(id).get();
        newMailInfo.forEach((k,v)->{
            switch(k){
                case "name":
                    entryToUpdate.setName((String)v);
                    break;
                case "unit":
                    entryToUpdate.setUnit((String)v);
                    break;
                case "mailCount":
                    if((Integer)v>0) entryToUpdate.setMailCount((Integer)v);
                    break;
                case "date":
                    entryToUpdate.setDate(LocalDate.parse((String)v));
                    break;
                default:break;
            }
        });
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

    //6. Find group mail
    @GetMapping("/{unit}")
    public Iterable<Mail> getGroupMail(@PathVariable String unit){
        return repository.findAllByUnit(unit);
    }
}
