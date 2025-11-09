package com.EmployeeManagement.Employee.Management.Controller;

import com.EmployeeManagement.Employee.Management.Entity.Employee;
import com.EmployeeManagement.Employee.Management.RequestEntity.PasswordChange;
import com.EmployeeManagement.Employee.Management.Service.AdminService;
import com.EmployeeManagement.Employee.Management.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

//    view admin profile
    @GetMapping("/getAdminProfile/{id}")
    public ResponseEntity<Response> getAdminProfile(@PathVariable Long id) {
        Response response = adminService.getAdminProfile(id);
        return  new ResponseEntity<Response>(response, HttpStatus.OK);
    }

//    change adminPassword
    @PatchMapping("/updateAdminPassword/{adminid}")
    public ResponseEntity<Response> updateAdminPassword(@PathVariable Long adminid, @RequestBody PasswordChange passwordChange) {
        Response response =adminService.updateAdminPassword(adminid, passwordChange);
        return  new ResponseEntity<Response>(response, HttpStatus.OK);
    }

//    add  new employee
    @PostMapping("/addEmployee/{adminId}/{deptId}")
    public ResponseEntity<Response> addEmployee(@RequestBody Employee employee,@PathVariable Long adminId, @PathVariable Long deptId) {
        Response response=adminService.addEmployee(employee,adminId,deptId);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

//    view all employees
    @GetMapping("/getEpmloyees/{Adminid}")
    public ResponseEntity<Response> getEpmloyee(@PathVariable Long Adminid) {
        Response response=adminService.getEpmloyee(Adminid);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

//    delete the employee
    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<Response> deleteEmployee(@PathVariable Long id) {
        Response response =adminService.deleteEmployee(id);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

//    get one employe details
    @GetMapping("/getOneEmployee/{id}")
    public ResponseEntity<Response> getOneEmployee(@PathVariable Long id) {
        Response response =adminService.getOneEmployee(id);
        return  new ResponseEntity<Response>(response, HttpStatus.OK);
    }

//    update employee data
    @PutMapping("/updateEmployee/{id}")
    public ResponseEntity<Response> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        Response response = adminService.updateEmployee(id,employee);
        return  new ResponseEntity<Response>(response, HttpStatus.OK);
    }
}
