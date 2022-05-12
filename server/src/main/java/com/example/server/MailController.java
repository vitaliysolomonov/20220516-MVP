package com.example.server;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

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
    public Mail updateOneMailEntry(@PathVariable Long id, @RequestBody HashMap<String,Integer> newMailCount){
        Mail entryToUpdate = repository.findById(id).get();
        if(newMailCount.get("mailCount")>0) entryToUpdate.setMailCount(newMailCount.get("mailCount"));
        return repository.save(entryToUpdate);
    }

    //4. Delete an entry
    @DeleteMapping("/{id}")
    public String deleteOneEntry(@PathVariable Long id){
        repository.deleteById(id);
        return "Entry was deleted";
    }
}
