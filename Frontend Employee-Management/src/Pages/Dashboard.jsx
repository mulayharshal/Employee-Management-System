import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import "../styles/Dashboard.css";
import { getEpmloyees } from "../services/adminService";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const adminId = localStorage.getItem("adminId");
      const res = await getEpmloyees(adminId);
      if (res.status === "SUCCESS") {
        setEmployees(res.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <h3 className="loading-text">Loading Dashboard...</h3>;

  //  Dashboard Calculations
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.empStatus === "Active").length;
  const onLeaveEmployees = employees.filter((e) => e.empStatus === "On Leave").length;

  // Count unique departments
  const departments = [
    ...new Set(
      employees
        .filter((e) => e.empDepartment && e.empDepartment.departmentName)
        .map((e) => e.empDepartment.departmentName)
    ),
  ].length;

  //  Pie Chart Data (Employees per Department)
  const departmentData = Object.values(
    employees.reduce((acc, emp) => {
      const deptName = emp.empDepartment?.departmentName || "Unknown";
      if (!acc[deptName]) {
        acc[deptName] = { name: deptName, value: 0 };
      }
      acc[deptName].value += 1;
      return acc;
    }, {})
  );

  //  Recently Joined Employees (latest 5)
  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.empJoinDate) - new Date(a.empJoinDate))
    .slice(0, 5);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Employee Management Dashboard</h2>

      {/* Summary Cards */}
      <div className="summary-section">
        <div className="summary-card total">
          <h3>Total Employees</h3>
          <p>{totalEmployees}</p>
        </div>
        <div className="summary-card active">
          <h3>Active</h3>
          <p>{activeEmployees}</p>
        </div>
        <div className="summary-card leave">
          <h3>On Leave</h3>
          <p>{onLeaveEmployees}</p>
        </div>
        <div className="summary-card dept">
          <h3>Total Departments</h3>
          <p>{departments}</p>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="chart-section">
        <h3>Employees by Department</h3>
        {departmentData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No department data available.</p>
        )}
      </div>

      {/* Recently Joined Employees */}
      <div className="recent-section">
        <h3>Recently Joined Employees</h3>
        <table className="recent-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {recentEmployees.length > 0 ? (
              recentEmployees.map((emp) => (
                <tr key={emp.empId}>
                  <td>{emp.empName}</td>
                  <td>{emp.empDepartment?.departmentName || "N/A"}</td>
                  <td>{emp.empStatus}</td>
                  <td>{new Date(emp.empJoinDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No recent employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
