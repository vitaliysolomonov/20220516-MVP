package com.example.server.user;

import com.example.server.mail.Mail;
import com.example.server.mail.MailRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
import java.time.LocalDate;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class UserControllerTest {
    @Autowired
    MockMvc mvc;
    @Autowired
    UserRepository repository;

    User user1;
    User user2;
    User testUser;

    @BeforeEach
    void init(){
        user1=new User("Sam","A CO", "user", "sam", "123");
        user2=new User("Bill", "HHC", "admin","bill","123");
        repository.save(user1);
        testUser = repository.save(user2);
    }

    //1. Create new user
    @Test
    @Transactional
    @Rollback
    public void createNewUserTest() throws Exception {
        this.mvc.perform(post("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Mike\",\"unit\":\"B CO\",\"access\":\"user\",\"userName\":\"mike\",\"password\":\"123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.name", is("Mike")))
                .andExpect(jsonPath("$.password", is("123")));
    }

    //2. Get all users:
    @Test
    @Transactional
    @Rollback
    public void getAllUsersTest() throws Exception{
        this.mvc.perform(get("/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name", is("Sam")))
                .andExpect(jsonPath("$[1].name", is("Bill")));
    }

    //3. Find one user
    @Test
    @Transactional
    @Rollback
    public void findUserTest() throws Exception{
        this.mvc.perform(post("/user/find")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userName\":\"bill\",\"password\":\"123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Bill")));
    }

//    //3. Patch a mail entry
//    @Test
//    @Transactional
//    @Rollback
//    public void updateOneMailEntryTest() throws Exception{
//        this.mvc.perform((patch("/mail/"+testMail.getId()))
//                .contentType(MediaType.APPLICATION_JSON)
//                .content("{\"mailCount\":5}"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id", is(testMail.getId().intValue())))
//                .andExpect(jsonPath("$.mailCount", is(5)));
//    }
//
//    //4. Delete Mail Entry
//    @Test
//    @Transactional
//    @Rollback
//    public void deleteOneMailEntryTEst() throws Exception{
//        this.mvc.perform(delete("/mail/"+testMail.getId()))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", is("Entry was deleted")));
//    }

}
