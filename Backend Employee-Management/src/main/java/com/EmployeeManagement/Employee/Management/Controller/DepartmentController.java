package com.EmployeeManagement.Employee.Management.Controller;

import com.EmployeeManagement.Employee.Management.Service.DepartmentService;
import com.EmployeeManagement.Employee.Management.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/department")
@CrossOrigin("http://localhost:5173")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;


    @GetMapping("/getDepartments")
    public ResponseEntity<Response> getDepartment(){
        Response response = departmentService.getDepartment();
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }
}
