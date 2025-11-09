package com.EmployeeManagement.Employee.Management.repository;

import com.EmployeeManagement.Employee.Management.Entity.Admins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admins, Long> {

    Admins findAdminsByAdminEmail(String adminEmail);

    Admins findAdminsByAdminId(Long id);

}
