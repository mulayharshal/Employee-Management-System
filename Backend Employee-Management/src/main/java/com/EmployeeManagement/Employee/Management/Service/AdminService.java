package com.EmployeeManagement.Employee.Management.Service;


import com.EmployeeManagement.Employee.Management.Entity.Employee;
import com.EmployeeManagement.Employee.Management.RequestEntity.PasswordChange;
import com.EmployeeManagement.Employee.Management.response.Response;

public interface AdminService {
    Response addEmployee(Employee employee, Long adminId, Long deptId);

    Response getEpmloyee(Long id);

    Response deleteEmployee(Long id);

    Response getAdminProfile(Long id);

    Response getOneEmployee(Long id);

    Response updateEmployee(Long id, Employee employee);

    Response updateAdminPassword(Long adminid, PasswordChange passwordChange);
}
