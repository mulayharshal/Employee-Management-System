package com.EmployeeManagement.Employee.Management.ServiceImpl;

import com.EmployeeManagement.Employee.Management.Entity.Department;
import com.EmployeeManagement.Employee.Management.Service.DepartmentService;
import com.EmployeeManagement.Employee.Management.repository.DepartmentRepository;
import com.EmployeeManagement.Employee.Management.response.Response;
import com.EmployeeManagement.Employee.Management.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Response getDepartment() {
        List<Department> departments = departmentRepository.findAll();
        Response response=new Response();
        response.setData(departments);
        response.setStatus(Status.SUCCESS);
        return response;
    }
}
