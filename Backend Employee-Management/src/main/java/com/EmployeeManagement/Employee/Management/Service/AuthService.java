package com.EmployeeManagement.Employee.Management.Service;

import com.EmployeeManagement.Employee.Management.Entity.Admins;
import com.EmployeeManagement.Employee.Management.RequestEntity.LoginReq;
import com.EmployeeManagement.Employee.Management.response.Response;

public interface AuthService {

    Response adminRegister(Admins admin);

    String sendEmailOtp(String email);

    String verifyOtp(String idf, String otp);

    Response adminLogin(LoginReq loginReq);
}
