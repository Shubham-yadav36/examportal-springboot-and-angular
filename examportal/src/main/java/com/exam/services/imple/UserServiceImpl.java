package com.exam.services.imple;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.services.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.exam.dto.UserDTO;
import com.exam.exception.*;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private ModelMapper mapper;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User local = null;
        local = this.userRepository.findByUsername(userDTO.getUsername());
        if (local != null) {
            throw new UserAlreadyExistException("User Already Exists");
        } else {
            userDTO.setProfile("signup.png");
            // encription of password
            userDTO.setPassword(this.bCryptPasswordEncoder.encode(userDTO.getPassword()));

            Set<UserRole> roles = new HashSet<>();

            Role role = new Role();
            role.setRole_id(60L);
            role.setRole_name("ROLE_USER");

            // role.setRole_id(50L);
            // role.setRole_name("ADMIN");
            User user = mapper.map(userDTO, User.class);
            UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(role);

            roles.add(userRole);
            for (UserRole r : roles) {
                roleRepository.save(r.getRole());
            }

            user.getUserRoles().addAll(roles);
            local = this.userRepository.save(user);
            this.userRepository.flush();
        }
        return mapper.map(local, UserDTO.class);
    }

    @Override
    public UserDTO getUser(String username) {
        User user = this.userRepository.findByUsername(username);
        return mapper.map(user, UserDTO.class);
    }

    @Override
    public void deleteUser(Long id) {
        try {
            User user = this.userRepository.findById(id).get();
            this.userRepository.delete(user);
            this.userRepository.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = this.userRepository.findById(id).get();
        return mapper.map(user, UserDTO.class);
    }

    @Override
    public void updateUser(UserDTO userDTO) {
        User local = this.userRepository.findByUsername(userDTO.getUsername());
        local.setFistName(userDTO.getFistName());
        local.setLastName(userDTO.getLastName());
        local.setPhone(userDTO.getPhone());
        this.userRepository.save(mapper.map(userDTO, User.class));
        this.userRepository.flush();

    }

    @Override
    public String updateProfile(Long id, MultipartFile file) {
        try {
            if (!file.isEmpty()) {
                if (file.getContentType().equals("image/jpeg")) {
                    Path root = Paths.get(
                            "E:/My-Learning/Personal-Project/JAVA/Exam Portal/Exan Portal Gui Angular/examportalfrontend/src/assets/profile"
                                    + File.separator + file.getOriginalFilename());
                    Files.copy(file.getInputStream(), root, StandardCopyOption.REPLACE_EXISTING);

                    User user = this.userRepository.findById(id).get();
                    user.setProfile(file.getOriginalFilename());
                    updateUser(mapper.map(user, UserDTO.class));
                }
            }
            return "Uploaded: " + file.getOriginalFilename();
        } catch (Exception e) {
            throw new RuntimeException("Not Uploaded");
        }

    }

    @Override
    public List<UserDTO> getAllUser() {
        return this.userRepository.getAllUser().stream().map(this::toEntity).collect(Collectors.toList());
    }

    public UserDTO toEntity(User user) {
        return mapper.map(user, UserDTO.class);
    }
}
