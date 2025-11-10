package com.EmployeeManagement.Employee.Management.ServiceImpl;

import com.EmployeeManagement.Employee.Management.Entity.Admins;
import com.EmployeeManagement.Employee.Management.Entity.OtpVerification;
import com.EmployeeManagement.Employee.Management.RequestEntity.LoginReq;
import com.EmployeeManagement.Employee.Management.Security.JwtUtil;
import com.EmployeeManagement.Employee.Management.repository.AdminRepository;
import com.EmployeeManagement.Employee.Management.repository.OtpVerificationRepository;
import com.EmployeeManagement.Employee.Management.response.Response;
import com.EmployeeManagement.Employee.Management.util.Status;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.EmployeeManagement.Employee.Management.Service.AuthService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    OtpVerificationRepository otpVerificationRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil  jwtUtil;


    // otp send through email
    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your OTP for Email Verification");
        message.setText("Your OTP is: " + otp+ " That will be expired in 5 minutes.");
        mailSender.send(message);
    }

//    send Login Email
    @Async
    public  void  sendLoginEmail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Login Alert Employee Management");
        message.setText("Hello "+name+"!In Employee Management Your account has login .\n"+" If This is not You contact immediately on help@gmail.com ");
        mailSender.send(message);
    }

//    register the admin
    @Override
    public Response adminRegister(Admins admin) {
        Response response=new Response();
        Admins admins=adminRepository.findAdminsByAdminEmail(admin.getAdminEmail());
        if(admin!=null && admin.getAdminName()!=null && admin.getAdminPassword()!=null &&
                admin.getAdminEmail()!=null && admin.getAdminMobile()!=null ){

            Admins preadmin=adminRepository.findAdminsByAdminEmail(admin.getAdminEmail());

            if(preadmin!=null){
                System.out.println(preadmin.getAdminEmail());
                System.out.println(preadmin);
                response.setData("This email has already been registered");
                response.setStatus(Status.FAIL);
                return  response;
            }

//                boolean isMobileVerify=otpVerificationRepository.findByIdentifier(admin.getAdminMobile()).isVerified();
                boolean isEmailVerify=otpVerificationRepository.findTopByIdentifierOrderByIdDesc(admin.getAdminEmail()).isVerified();
//                admin.setVerifed(isMobileVerify && isEmailVerify);
            admin.setVerifed(isEmailVerify);
                admin.setAdminPassword(passwordEncoder.encode(admin.getAdminPassword()));
                adminRepository.save(admin);
                    response.setData("register success");
                    response.setStatus(Status.SUCCESS);

        }else {
            response.setData("register fail");
            response.setStatus(Status.FAIL);
        }
        return  response;
    }

//    @Autowired
//    private PasswordEncoder passwordEncoders;
//
//    @PostConstruct
//    public void generatePassword() {
//        String encoded = passwordEncoders.encode("12345");
//        System.out.println("Encoded: " + encoded);
//    }


    @Override
    public Response adminLogin(LoginReq loginReq) {
        Admins admins=adminRepository.findAdminsByAdminEmail(loginReq.getEmail());
        Response response =new Response();
        if(admins!=null){
//            generatePassword();
//            System.out.println("Entered Password: " + loginReq.getPassword());
//            System.out.println("Stored Password: " + admins.getAdminPassword());
//            System.out.println("enterd enode :"+passwordEncoder.encode(loginReq.getPassword()));
//            System.out.println("Password Match: " + passwordEncoder.matches(loginReq.getPassword(), admins.getAdminPassword()));

            if(passwordEncoder.matches(loginReq.getPassword(),admins.getAdminPassword())){
                String token=jwtUtil.generateToken(admins.getAdminEmail());
                Map<String, Object> resData = new HashMap<>();
                resData.put("token", token);
                resData.put("adminId", admins.getAdminId());
                resData.put("adminName", admins.getAdminName());
                resData.put("adminEmail", admins.getAdminEmail());
                resData.put("adminMobile", admins.getAdminMobile());
                resData.put("isLogin", admins.isVerifed());
                resData.put("companyName", admins.getCompanyName());

                response.setData(resData);
                response.setStatus(Status.SUCCESS);
                sendLoginEmail(admins.getAdminEmail(), admins.getAdminName());
            }else{
                response.setData("Inncorrect password");
                response.setStatus(Status.FAIL);
            }
        }else {
            response.setData("Username or Email is incorrect");
            response.setStatus(Status.FAIL);
        }
        return response;
    }

//    verify the otp through email and mobile
    @Override
    public String verifyOtp(String idf, String otp) {
        if(otp==null && idf==null){
            return "do not empty";
        }
        OtpVerification otpVerification = otpVerificationRepository.findTopByIdentifierOrderByIdDesc(idf);
        if(otpVerification==null){
            return "not found try  again!";
        }
        if(otpVerification.getOtpCode().equals(otp) && otpVerification.getIdentifier().equals(idf)){
            if (otpVerification.getExpiresAt().isBefore(LocalDateTime.now())) {
                return "OTP expired!";
            }
            otpVerification.setVerified(true);
            otpVerificationRepository.save(otpVerification);
            return "verified successfully!";
        }else{
            return "Invalid OTP!";
        }



    }




    //    genrate and send otp on email
    @Override
    public String sendEmailOtp(String email) {
        OtpVerification otpVerification=new OtpVerification();
        if(email!=null){

                String otp = String.valueOf(100000 + new Random().nextInt(900000));
                otpVerification.setIdentifier(email);
                otpVerification.setOtpCode(otp);
                otpVerification.setExpiresAt(LocalDateTime.now().plusMinutes(5));
                otpVerificationRepository.save(otpVerification);
                sendOtpEmail(email, otp);
                return "Your otp sent successfully on "+otpVerification.getIdentifier()+" that expires in 5 minutes";


        }
        return "something went wrong try again";
    }
}
