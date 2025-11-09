import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/SidebarLayout.css";

const SidebarLayout = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="layout-container">
      {/* Sidebar Section */}
      <div className="sidebar-section">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="main-section">
        {/* Modern Header Bar */}
        <header className="sm-header-bar">
          <div className="sm-header-left">
            <div className="sm-logo">
              <span role="img" aria-label="office">
                🏢
              </span>
            </div>
            <div className="sm-header-texts">
              <div className="sm-company">{localStorage.getItem("companyName") || ""}</div>
              <div className="sm-subtitle">Admin Dashboard</div>
            </div>
          </div>

          <div className="sm-header-right">
            <div className="sm-admin">
              <div className="sm-avatar">
                {(localStorage.getItem("adminName") || "A").charAt(0)}
              </div>
              <div className="sm-admin-info">
                <div className="sm-admin-name">
                  {localStorage.getItem("adminName") || "Admin"}
                </div>
                <div className="sm-admin-email">
                  {localStorage.getItem("adminEmail") || ""}
                </div>
              </div>
            </div>

            <button className="sm-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
