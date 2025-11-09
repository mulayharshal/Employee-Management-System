import React, { useState, useEffect } from "react";
import "../styles/AddEmployee.css";
import { addEmployee } from "../services/adminService";
import axios from "axios";
import { getDepartments } from "../services/departmentService";

export default function AddEmployee() {
  const [departments, setDepartments] = useState([]); // Store all departments
  const [formData, setFormData] = useState({
    empName: "",
    empEmail: "",
    empPhone: "",
    empGender: "",
    deptId: "", //  department id instead of name
    empJoinDate: "",
    empSalary: "",
    empStatus: "",
  });

  const adminId = localStorage.getItem("adminId");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //  Fetch all departments from backend on mount
  useEffect(() => {
    

      const getallDepartments= async()=>{
        const repsonse= await getDepartments();
        if (repsonse.status === "SUCCESS") {
          console.log(repsonse.data);
          setDepartments(repsonse.data);
        } else {
          console.error(repsonse.data);
        }
      };
      getallDepartments();
      
  }, []);

  //  Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    for (let key in formData) {
      if (formData[key] === "") {
        setError("All fields are required!");
        return;
      }
    }

    try {
      setLoading(true);
      const response = await addEmployee(formData, adminId, formData.deptId); // pass both adminId & deptId

      if (response.status !== "SUCCESS") {
        setError(response.data);
        return;
      }

      alert(response.data);
      setFormData({
        empName: "",
        empEmail: "",
        empPhone: "",
        empGender: "",
        deptId: "",
        empJoinDate: "",
        empSalary: "",
        empStatus: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add employee. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit} className="add-employee-form">
        <label>Employee Name:</label>
        <input
          type="text"
          name="empName"
          value={formData.empName}
          onChange={handleChange}
          placeholder="Enter employee name"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="empEmail"
          value={formData.empEmail}
          onChange={handleChange}
          placeholder="Enter employee email"
          required
        />

        <label>Phone:</label>
        <input
          type="number"
          name="empPhone"
          value={formData.empPhone}
          onChange={handleChange}
          placeholder="Enter employee phone"
          required
        />

        <label>Gender:</label>
        <select
          name="empGender"
          value={formData.empGender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Department:</label>
        <select
          name="deptId"
          value={formData.deptId}
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

        <label>Joining Date:</label>
        <input
          type="date"
          name="empJoinDate"
          value={formData.empJoinDate}
          onChange={handleChange}
          required
        />

        <label>Salary:</label>
        <input
          type="number"
          name="empSalary"
          value={formData.empSalary}
          onChange={handleChange}
          placeholder="Enter salary"
          required
        />

        <label>Status:</label>
        <select
          name="empStatus"
          value={formData.empStatus}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Employee"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
