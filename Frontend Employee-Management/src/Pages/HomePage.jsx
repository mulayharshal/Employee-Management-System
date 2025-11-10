import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import { homeData } from "../services/publcService";

const HomePage = () => {
  const navigate = useNavigate();
  const [companies, setCompanies]=useState(0);
  const [employees, setEmployees]=useState(0);
  const [departments, setDepartments]=useState(0);
  

  useEffect(()=>{

    const getdata =async ()=>{
      const res= await homeData();
      console.log(res);
      setCompanies(res.data.totalCompany);
      setEmployees(res.data.totalEmployee);
      setDepartments(res.data.totalDepartment);
    }
    getdata();
        
  })

  const stats = [
    { title: "Total Companies", value: companies, icon: "🏢" },
    { title: "Total Employees", value: employees, icon: "👥" },
    { title: "Departments", value: departments, icon: "📂" },
    // { title: "Active Admins", value: 12, icon: "🛡️" },
  ];

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <h1>
          Welcome to <span>Employee Management System</span>
        </h1>
        <p>
          Manage your organization effortlessly — from employees to departments,
          all in one platform designed for speed, simplicity, and efficiency.
        </p>

        {/* Move Button Here */}
        <button
          className="dashboard-btn top-btn"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard →
        </button>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{item.icon}</div>
            <h3>{item.value}</h3>
            <p>{item.title}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Our Platform</h2>
        <p>
          The <strong>Employee Management System</strong> provides a centralized
          solution for companies to manage departments, employees, and
          administrators efficiently. With our secure platform, HR teams can
          handle recruitment, attendance, payroll, and performance analytics in
          real-time.
        </p>
        <p>
          We aim to simplify company operations through automation and insights,
          so you can focus on growing your business.
        </p>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        © {new Date().getFullYear()} Employee Management System | All Rights
        Reserved
      </footer>
    </div>
  );
};

export default HomePage;
