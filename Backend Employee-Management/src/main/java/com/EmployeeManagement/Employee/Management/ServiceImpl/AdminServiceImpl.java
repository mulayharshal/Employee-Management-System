package com.EmployeeManagement.Employee.Management.ServiceImpl;

import com.EmployeeManagement.Employee.Management.Entity.Admins;
import com.EmployeeManagement.Employee.Management.Entity.Department;
import com.EmployeeManagement.Employee.Management.Entity.Employee;
import com.EmployeeManagement.Employee.Management.Entity.OtpVerification;
import com.EmployeeManagement.Employee.Management.RequestEntity.PasswordChange;
import com.EmployeeManagement.Employee.Management.Service.AdminService;
import com.EmployeeManagement.Employee.Management.Service.AuthService;
import com.EmployeeManagement.Employee.Management.repository.AdminRepository;
import com.EmployeeManagement.Employee.Management.repository.DepartmentRepository;
import com.EmployeeManagement.Employee.Management.repository.EmployeeRepository;
import com.EmployeeManagement.Employee.Management.repository.OtpVerificationRepository;
import com.EmployeeManagement.Employee.Management.response.AdminProfileRes;
import com.EmployeeManagement.Employee.Management.response.Response;
import com.EmployeeManagement.Employee.Management.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private OtpVerificationRepository otpVerificationRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    AuthService authService;


    //    add new employee
    @Override
    public Response addEmployee(Employee employee, Long adminId, Long deptId) {
        Response response = new Response();
        Department department=departmentRepository.findById(deptId).orElse(null);
        Admins admin = adminRepository.findById(adminId).orElse(null);
        if(admin==null && department==null){
            response.setData("Value of admin or department is Wrong");
            response.setStatus(Status.FAIL);
            return response;
        }


        if ( employee.getEmpName() != null
                && employee.getEmpEmail() != null && employee.getEmpStatus() != null && employee.getEmpPhone() != null
                && employee.getEmpJoinDate() != null && employee.getEmpSalary() != null && employee.getEmpGender() != null) {
            employee.setEmpDepartment(department);
            employee.setAdminId(admin);
            employeeRepository.save(employee);
            response.setStatus(Status.SUCCESS);
            response.setData("Employee added successfully.");
        } else {
            response.setStatus(Status.FAIL);
            response.setData("Employee data not be a null.");
        }
        return response;
    }

    //    get all employee
    @Override
    public Response getEpmloyee(Long id) {
        Response response = new Response();
        if (id != null && id > 0) {
            List<Employee> employees = employeeRepository.findByAdminId_AdminId(id);
            if (employees != null && employees.size() > 0) {
                response.setStatus(Status.SUCCESS);
                response.setData(employees);
            } else {
                response.setStatus(Status.FAIL);
                response.setData("No employees found.");
            }
        } else {
            response.setStatus(Status.FAIL);
            response.setData("something went wrong.");
        }

        return response;
    }

    //    delete the employee
    @Override
    public Response deleteEmployee(Long id) {
        Response response = new Response();
        if (id != null && id > 0) {
            Employee emp = employeeRepository.findById(id).orElse(null);
            if (emp != null) {
                employeeRepository.deleteById(id);
                response.setStatus(Status.SUCCESS);
                response.setData("Employee deleted successfully.");
            } else {
                response.setStatus(Status.FAIL);
                response.setData("Employee not found.");
            }

        } else {
            response.setStatus(Status.FAIL);
            response.setData("Something went wrong try again.");
        }
        return response;
    }


    //    get admin profile
    @Override
    public Response getAdminProfile(Long id) {
        Response response = new Response();
        if (id != null && id > 0) {
            Admins admin = adminRepository.findAdminsByAdminId(id);
            if (admin != null) {
                AdminProfileRes adminProfileRes = new AdminProfileRes();
                adminProfileRes.setAdminName(admin.getAdminName());
                adminProfileRes.setAdminEmail(admin.getAdminEmail());
                adminProfileRes.setAdminMobile(admin.getAdminMobile());
                adminProfileRes.setCompanyName(admin.getCompanyName());
                adminProfileRes.setVerifed(admin.isVerifed());
                long totalemp = employeeRepository.countByAdminId_AdminId(id);
                if (totalemp > 0) {
                    adminProfileRes.setTotalEmployees(totalemp);
                } else {
                    adminProfileRes.setTotalEmployees(0L);
                }

                response.setStatus(Status.SUCCESS);
                response.setData(adminProfileRes);
            }
        } else {
            response.setStatus(Status.FAIL);
            response.setData("Something went wrong try again.");
        }
        return response;
    }

    //  get one employe info
    @Override
    public Response getOneEmployee(Long id) {
        Response response = new Response();
        if (id != null && id > 0) {
            Employee emp = employeeRepository.findById(id).orElse(null);
            if (emp != null) {
                response.setStatus(Status.SUCCESS);
                response.setData(emp);
            } else {
                response.setStatus(Status.FAIL);
                response.setData("Employee not found.");
            }
        } else {
            response.setStatus(Status.FAIL);
            response.setData("Something went wrong try again.");
        }
        return response;
    }

//    update employee
    @Override
    public Response updateEmployee(Long id, Employee updatedEmployee) {
        Response response = new Response();
        if (id != null && id > 0) {
            Employee existingEmp = employeeRepository.findById(id).orElse(null);
            if (existingEmp != null) {
                // Update only the fields that can change
                existingEmp.setEmpName(updatedEmployee.getEmpName());
                existingEmp.setEmpEmail(updatedEmployee.getEmpEmail());
                existingEmp.setEmpPhone(updatedEmployee.getEmpPhone());
                existingEmp.setEmpGender(updatedEmployee.getEmpGender());
                existingEmp.setEmpDepartment(updatedEmployee.getEmpDepartment());
                existingEmp.setEmpJoinDate(updatedEmployee.getEmpJoinDate());
                existingEmp.setEmpSalary(updatedEmployee.getEmpSalary());
                existingEmp.setEmpStatus(updatedEmployee.getEmpStatus());

                employeeRepository.save(existingEmp);
                response.setStatus(Status.SUCCESS);
                response.setData("Employee updated successfully.");
            } else {
                response.setStatus(Status.FAIL);
                response.setData("Employee not found.");
            }
        } else {
            response.setStatus(Status.FAIL);
            response.setData("Something went wrong. Try again.");
        }
        return response;
    }

//    update admin password
    @Override
    public Response updateAdminPassword(String adminEmail, PasswordChange passwordChange) {
        Response response = new Response();
        if (adminEmail != null &&  passwordChange.getPassword() != null && passwordChange.getIdentifier() != null
             && passwordChange.getOtp() != null) {
            Admins admin = adminRepository.findAdminsByAdminEmail(adminEmail);
            if (admin != null) {
                OtpVerification otpVerification = otpVerificationRepository.findTopByIdentifierOrderByIdDesc(passwordChange.getIdentifier());
                if (otpVerification != null) {
                    System.out.println(otpVerification.getOtpCode());
                    System.out.println(passwordChange.getOtp());
                    if(passwordChange.getOtp().equals(otpVerification.getOtpCode()) && !otpVerification.getExpiresAt().isBefore(LocalDateTime.now())){
                        otpVerification.setVerified(true);
                        otpVerificationRepository.save(otpVerification);
                        admin.setAdminPassword(passwordEncoder.encode(passwordChange.getPassword()));
                        adminRepository.save(admin);
                        response.setStatus(Status.SUCCESS);
                        response.setData("Admin password updated successfully.");

                         String toEmail=adminEmail;
                        String subject="password updated";
                        String data="<p>Your password updated successfully.<p>";
                        authService.sendmail(toEmail,subject,data);
                    }else {
                        response.setStatus(Status.FAIL);
                        response.setData("Invalid or Expired otp try again.");
                    }
                }else {
                    response.setStatus(Status.FAIL);
                    response.setData("Something went wrong try again.");
                }

            }else {
                response.setStatus(Status.FAIL);
                response.setData("user not found try again.");
            }
        }else {
            response.setStatus(Status.FAIL);
            response.setData("Value Not be Null try again.");
        }
        return response;
    }
}