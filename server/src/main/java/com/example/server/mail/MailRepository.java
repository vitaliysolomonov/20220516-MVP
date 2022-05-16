package com.example.server.mail;

import com.example.server.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MailRepository extends CrudRepository<Mail,Long> {
    @Query(value = "SELECT * FROM mails ORDER BY FIELD(unit,'HHC','A CO','B CO','C CO'), name", nativeQuery = true)
    Iterable<Mail>  findAllSorted();

    Mail findByNameAndUnit(String name, String unit);

    Iterable<Mail> findAllByUnit(String access);
}
