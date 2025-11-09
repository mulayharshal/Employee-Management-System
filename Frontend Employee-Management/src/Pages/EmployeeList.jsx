import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeList.css";
import { getEpmloyees, deleteEmployee } from "../services/adminService";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //  Fetch all employees on page load
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getEpmloyees(localStorage.getItem("adminId") || 0);
      if (response.status === "SUCCESS") {
      const data = Array.isArray(response.data) ? response.data : [];
      setEmployees(data);
    } else {
      setEmployees([]);
      setError("No employees found.");
    }
    } catch (err) {
      console.error(err);
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  //  Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const response= await deleteEmployee(id);
      alert(response.data);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee!");
    }
  };

  //  Navigate to update page
  const handleUpdate = (empId) => {
    navigate(`/update-employee/${empId}`);
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>

      {loading ? (
        <p className="loading">Loading employees...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Join Date</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{emp.empName}</td>
                <td>{emp.empEmail}</td>
                <td>{emp.empPhone}</td>
                <td>{emp.empGender}</td>
                <td>{emp.empDepartment.departmentName}</td>
                <td>{emp.empJoinDate}</td>
                <td>{emp.empSalary}</td>
                <td>{emp.empStatus}</td>
                <td>
                  <button
                    className="update-btns"
                    onClick={() => handleUpdate(emp.empId)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp.empId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
