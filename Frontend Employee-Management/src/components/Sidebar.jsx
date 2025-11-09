import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/SidebarLayout.css";""
import logo from  "../assets/Employee Management.png"

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "📊 Dashboard", path: "/dashboard" },
    { name: "🤵 Profile", path: "/adminProfile" },
    { name: "➕ Add Employee", path: "/addEmployee" },
    { name: "👁️‍🗨️ View All Employee", path: "/viewEmployee" },
    { name: "⚙️ Settings", path: "/settings" },
    
  ];

  return (
    <div className="sidebar">
      <div className="namelogo">
            <img src={logo} alt="Main logo" className="logo"/>
            <h2 className="sidebar-title">Employee Management</h2>
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? "active-link" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">© 2025 Employee management</div>
    </div>
  );
};

export default Sidebar;
