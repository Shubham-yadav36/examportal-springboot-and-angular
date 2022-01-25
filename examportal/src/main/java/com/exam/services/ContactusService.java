package com.exam.services;

import java.util.List;

import com.exam.dto.ContactusDTO;
import com.exam.model.contactous.Contactus;

public interface ContactusService {
    public ContactusDTO addContactus(ContactusDTO contactus);
    public List<ContactusDTO> getAllContactus();
}
