package com.EmployeeManagement.Employee.Management.Controller;


import com.EmployeeManagement.Employee.Management.Service.PublicService;
import com.EmployeeManagement.Employee.Management.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class PublicController {

    @Autowired
    private PublicService publicService;

    @GetMapping("/homeData")
    public ResponseEntity<Response> getHomeData() {
        Response response = publicService.getHomeData();
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

}
