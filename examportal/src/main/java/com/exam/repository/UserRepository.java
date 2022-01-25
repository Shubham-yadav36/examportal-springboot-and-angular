package com.exam.repository;


import java.util.List;

import com.exam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    void  deleteById(Long id);

    @Query(value ="SELECT * FROM users order by fist_name",nativeQuery = true)
    List<User> getAllUser();
}