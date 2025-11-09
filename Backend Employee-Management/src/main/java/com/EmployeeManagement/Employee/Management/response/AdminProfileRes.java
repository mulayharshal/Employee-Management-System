package com.EmployeeManagement.Employee.Management.response;

public class AdminProfileRes {

    private String adminName;
    private String companyName;
    private String adminEmail;
    private String adminMobile;
    private boolean isVerifed ;
    private Long totalEmployees;

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String getAdminMobile() {
        return adminMobile;
    }

    public void setAdminMobile(String adminMobile) {
        this.adminMobile = adminMobile;
    }

    public boolean isVerifed() {
        return isVerifed;
    }

    public void setVerifed(boolean verifed) {
        isVerifed = verifed;
    }

    public Long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(Long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }
}
