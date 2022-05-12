package com.example.server;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import static org.hamcrest.Matchers.is;
import javax.transaction.Transactional;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class MailControllerTest {
    @Autowired
    MockMvc mvc;
    @Autowired MailRepository repository;

    Mail mail1;
    Mail mail2;
    Mail testMail;

    @BeforeEach
    void init(){
        mail1=new Mail("Sam","A CO", 2);
        mail2=new Mail("Bill", "HHC", 1);
        repository.save(mail1);
        testMail = repository.save(mail2);
    }

    //1. Create new mail entry
    @Test
    @Transactional
    @Rollback
    public void createNewMailEntryTest() throws Exception {
        this.mvc.perform(post("/mail")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Mike\",\"unit\":\"B CO\",\"mailCount\":1}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.name", is("Mike")))
                .andExpect(jsonPath("$.date", is(LocalDate.now().toString())));
    }

    //2. Get all mail entries:
    @Test
    @Transactional
    @Rollback
    public void getAllMailTest() throws Exception{
        this.mvc.perform(get("/mail"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name", is("Sam")))
                .andExpect(jsonPath("$[1].name", is("Bill")));
    }

    //3. Patch a mail entry
    @Test
    @Transactional
    @Rollback
    public void updateOneMailEntryTest() throws Exception{
        this.mvc.perform((patch("/mail/"+testMail.getId()))
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"mailCount\":5}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(testMail.getId().intValue())))
                .andExpect(jsonPath("$.mailCount", is(5)));
    }

    //4. Delete Mail Entry
    @Test
    @Transactional
    @Rollback
    public void deleteOneMailEntryTEst() throws Exception{
        this.mvc.perform(delete("/mail/"+testMail.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Entry was deleted")));
    }

}
