package com.EmployeeManagement.Employee.Management.ServiceImpl;

import com.EmployeeManagement.Employee.Management.Entity.Admins;
import com.EmployeeManagement.Employee.Management.Service.PublicService;
import com.EmployeeManagement.Employee.Management.repository.AdminRepository;
import com.EmployeeManagement.Employee.Management.repository.DepartmentRepository;
import com.EmployeeManagement.Employee.Management.repository.EmployeeRepository;
import com.EmployeeManagement.Employee.Management.response.Response;
import com.EmployeeManagement.Employee.Management.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PublicServiceImpl implements PublicService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository  departmentRepository;

    @Override
    public Response getHomeData() {
        long totalCompany=adminRepository.count();
        long totalEmployee=employeeRepository.count();
        long totalDepartment=departmentRepository.count();
        Map<String,Object> map = new HashMap<>();
        map.put("totalCompany",totalCompany);
        map.put("totalEmployee",totalEmployee);
        map.put("totalDepartment",totalDepartment);
        Response response = new Response();
        response.setData(map);
        response.setStatus(Status.SUCCESS);
        return response;
    }
}
