package com.example.server.mail;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="mails")
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String unit;
    Integer mailCount;
    @JsonFormat(pattern="yyyy-MM-dd", timezone = "America/Chicago")
    LocalDate date;

    public Mail(String name, String unit, int mailCount) {
        this.name = name;
        this.unit = unit;
        this.mailCount = mailCount;
        this.date = LocalDate.now();
    }

    public Mail() {
        this.date = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String recipient) {
        this.name = recipient;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getMailCount() {
        return mailCount;
    }

    public void setMailCount(int mailPiecesCount) {
        this.mailCount = mailPiecesCount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
