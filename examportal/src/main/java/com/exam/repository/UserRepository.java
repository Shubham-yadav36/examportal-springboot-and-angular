package com.exam.repository;


import java.util.Collection;
import java.util.List;

import com.exam.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    void  deleteById(Long id);
    Page<User> findAllByOrderByFistNameAsc(Pageable pageable);
}