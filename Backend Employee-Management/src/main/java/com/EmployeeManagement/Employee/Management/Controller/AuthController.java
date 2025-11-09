package com.EmployeeManagement.Employee.Management.Controller;

import com.EmployeeManagement.Employee.Management.Entity.Admins;
import com.EmployeeManagement.Employee.Management.RequestEntity.LoginReq;
import com.EmployeeManagement.Employee.Management.RequestEntity.RequestOtp;
import com.EmployeeManagement.Employee.Management.Service.AuthService;
import com.EmployeeManagement.Employee.Management.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;   // ✅ correct variable name


    @GetMapping("/h")
    public String greet() {
        return "Hello World";

    }


    @PostMapping("/adminRegister")
    public ResponseEntity<Response> adminRegister(@RequestBody Admins admin){
        Response response = authService.adminRegister(admin);
        return  new ResponseEntity<Response>(response, HttpStatus.OK);
    }

    @PostMapping("/adminLogin")
    public ResponseEntity<Response> adminLogin(@RequestBody LoginReq  loginReq){
        Response response =authService.adminLogin(loginReq);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

//    email otp sent
    @PostMapping("/sendEmailOtp")
    public String sendEmailOtp(@RequestBody RequestOtp requestOtp){
        String email = requestOtp.getIdf();
        System.out.println(email);
        return authService.sendEmailOtp(email);
    }

//    otp verify
    @PostMapping("/verifyOtp")
    public String verifyOtp(@RequestBody RequestOtp requestOtp) {
        String idf=requestOtp.getIdf();
        String otp=requestOtp.getOtp();
        System.out.println(idf+","+otp);
        return authService.verifyOtp(idf,otp);
    }

}
