import React, { useEffect, useState } from "react";
import "../styles/AdminProfile.css";
import { getAdminProfile } from "../services/adminService";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    adminName: "",
    companyName: "",
    adminEmail: "",
    adminMobile: "",
    verifed: null,
    totalEmployees: 0,
  });
  const [loading, setLoading] = useState(true);

  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (!adminId) {
      alert("Admin ID not found in local storage!");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getAdminProfile(adminId);
        console.log(response.data);
        setAdmin(response.data);
        localStorage.setItem("adminEmail", response.data.adminEmail);
        localStorage.setItem("adminMobile", response.data.adminMobile);
        localStorage.setItem("adminName", response.data.adminName);
        localStorage.setItem("companyName", response.data.companyName);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adminId]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (loading) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="company-highlight">{admin.companyName}</h2>
          <p className="admin-name">Admin: {admin.adminName}</p>
        </div>

        <div className="stats-card">
          <span className="stats-label">Total Employees</span>
          <h3 className="stats-value">{admin.totalEmployees}</h3>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">{admin.adminEmail}</span>
          </div>
          <div className="info-item">
            <span className="label">Mobile</span>
            <span className="value">{admin.adminMobile}</span>
          </div>
          <div className="info-item">
            <span className="label">Status</span>
            <span
              className={`status-badge ${
                admin.verifed ? "verified" : "not-verified"
              }`}
            >
              {admin.verifed ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
