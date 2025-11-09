package com.EmployeeManagement.Employee.Management.repository;

import com.EmployeeManagement.Employee.Management.Entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Integer> {
    OtpVerification findByIdentifier(String identifier);

    OtpVerification findTopByIdentifierOrderByIdDesc(String identifier);
}
