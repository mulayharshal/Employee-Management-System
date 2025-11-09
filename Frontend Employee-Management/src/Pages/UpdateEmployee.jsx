import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneEmployee, updateEmployee } from "../services/adminService";
import { getDepartments } from "../services/departmentService";
import "../styles/UpdateEmployee.css";

export default function UpdateEmployee() {
  const { empId } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState({
    empName: "",
    empEmail: "",
    empPhone: "",
    empGender: "",
    empDepartment: "",
    empJoinDate: "",
    empSalary: "",
    empStatus: "",
  });

  //  Load employee details and departments
  useEffect(() => {
    const fetchData = async () => {
      const empRes = await getOneEmployee(empId);
      if (empRes.status === "SUCCESS") {
        const empData = empRes.data;
        setEmployee({
          empName: empData.empName,
          empEmail: empData.empEmail,
          empPhone: empData.empPhone,
          empGender: empData.empGender,
          empDepartment: empData.empDepartment?.id || "",
          empJoinDate: empData.empJoinDate,
          empSalary: empData.empSalary,
          empStatus: empData.empStatus,
        });
      } else {
        alert(empRes.data);
      }

      const deptRes = await getDepartments();
      if (deptRes.status === "SUCCESS") {
        setDepartments(deptRes.data);
      }
    };
    fetchData();
  }, [empId]);

  // 🔹 Update input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // 🔹 Submit updated employee
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare data in correct format
    const updatedData = {
      empName: employee.empName,
      empEmail: employee.empEmail,
      empPhone: employee.empPhone,
      empGender: employee.empGender,
      empDepartment: { id: employee.empDepartment },
      empJoinDate: employee.empJoinDate,
      empSalary: employee.empSalary,
      empStatus: employee.empStatus,
    };

    const response = await updateEmployee(empId, updatedData);
    if (response.status === "SUCCESS") {
      alert(response.data);
      navigate("/viewEmployee");
    } else {
      alert(response.data);
    }
  };

  return (
    <div className="update-employee-container">
      <h2 className="update-employee-title">Update Employee Details</h2>

      <form onSubmit={handleUpdate} className="update-employee-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="empName"
            value={employee.empName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="empEmail"
            value={employee.empEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            name="empPhone"
            value={employee.empPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            name="empGender"
            value={employee.empGender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Department</label>
          <select
            name="empDepartment"
            value={employee.empDepartment}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.departmentName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Join Date</label>
          <input
            type="date"
            name="empJoinDate"
            value={employee.empJoinDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Salary</label>
          <input
            type="number"
            name="empSalary"
            value={employee.empSalary}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status</label>
          <select
            name="empStatus"
            value={employee.empStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
            <option value="Resigned">Resigned</option>
          </select>
        </div>

        <button type="submit" className="update-btn">
          Update Employee
        </button>
      </form>
    </div>
  );
}
