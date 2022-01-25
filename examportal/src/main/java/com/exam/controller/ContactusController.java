package com.exam.controller;

import com.exam.dto.ContactusDTO;
import com.exam.model.contactous.Contactus;
import com.exam.services.ContactusService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/contactus")
public class ContactusController {

    @Autowired
    private ContactusService service;

    @PostMapping("/")
    public ResponseEntity<?> addContactus(@RequestBody ContactusDTO contactusDTO) {
        try {
            ContactusDTO contactus = this.service.addContactus(contactusDTO);
            return new ResponseEntity<>(contactus, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllContactus() {
        try {
            List<ContactusDTO> contactusDTOList = this.service.getAllContactus();
            return new ResponseEntity<>(contactusDTOList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }
    }

}
