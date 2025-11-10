package com.EmployeeManagement.Employee.Management.Security;

import com.EmployeeManagement.Employee.Management.Entity.Admins;
import com.EmployeeManagement.Employee.Management.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admins admin=adminRepository.findAdminsByAdminEmail(username);
        if(admin==null){
            throw new UsernameNotFoundException("Admin not found with email: " + username);
        }

//        Returning a simple spring Security user object

        return new User(admin.getAdminEmail(),admin.getAdminPassword(),new ArrayList<>());
    }
}
