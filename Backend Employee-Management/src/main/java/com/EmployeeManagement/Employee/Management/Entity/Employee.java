package com.EmployeeManagement.Employee.Management.Entity;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empId;
    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName="adminId")
    private Admins adminId;
    private String empName;
    private String empEmail;
    private String empPhone;
    private String empGender;
    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department empDepartment;
    private LocalDate empJoinDate;
    private String empSalary;
    private String empStatus;

    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public Admins getAdminId() {
        return adminId;
    }

    public void setAdminId(Admins adminId) {
        this.adminId = adminId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getEmpEmail() {
        return empEmail;
    }

    public void setEmpEmail(String empEmail) {
        this.empEmail = empEmail;
    }

    public String getEmpPhone() {
        return empPhone;
    }

    public void setEmpPhone(String empPhone) {
        this.empPhone = empPhone;
    }

    public String getEmpGender() {
        return empGender;
    }

    public void setEmpGender(String empGender) {
        this.empGender = empGender;
    }

    public Department getEmpDepartment() {
        return empDepartment;
    }

    public void setEmpDepartment(Department empDepartment) {
        this.empDepartment = empDepartment;
    }

    public LocalDate getEmpJoinDate() {
        return empJoinDate;
    }

    public void setEmpJoinDate(LocalDate empJoinDate) {
        this.empJoinDate = empJoinDate;
    }

    public String getEmpSalary() {
        return empSalary;
    }

    public void setEmpSalary(String empSalary) {
        this.empSalary = empSalary;
    }

    public String getEmpStatus() {
        return empStatus;
    }

    public void setEmpStatus(String empStatus) {
        this.empStatus = empStatus;
    }
}
