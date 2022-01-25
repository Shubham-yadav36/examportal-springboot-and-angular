package com.exam.services.imple;

import java.util.List;
import java.util.stream.Collectors;

import com.exam.dto.ContactusDTO;
import com.exam.model.contactous.Contactus;
import com.exam.repository.ContactusRepository;
import com.exam.services.ContactusService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactusServiceImpl implements ContactusService {

    @Autowired
    private ContactusRepository contactusRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ContactusDTO addContactus(ContactusDTO contactusDTO) {
        Contactus contactus = this.contactusRepository.save(mapper.map(contactusDTO, Contactus.class));
        return mapper.map(contactus,ContactusDTO.class);
    }

    @Override
    public List<ContactusDTO> getAllContactus() {
        List<ContactusDTO> contactusDTOS = this.contactusRepository.findAll().stream().map((contactus) -> mapper.map(contactus, ContactusDTO.class)).collect(Collectors.toList());
        return contactusDTOS;
    }
    
}
