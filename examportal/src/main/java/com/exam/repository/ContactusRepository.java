package com.exam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.model.contactous.Contactus;

public interface ContactusRepository extends JpaRepository<Contactus,Long> {
    
}
