package com.EmployeeManagement.Employee.Management.response;


import com.EmployeeManagement.Employee.Management.util.Status;

public class Response {

    private Object data;
    private Status status;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}