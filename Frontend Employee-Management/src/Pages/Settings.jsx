import React, { useState } from "react";
import "../styles/Settings.css";
import { updateAdminPassword } from "../services/adminService";
import { sendEmailOtp } from "../services/authService";


const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoding]=useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminId, setAdminId] = useState(localStorage.getItem("adminId")||0);
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");
  const [data, setData] = useState({
      password: "",
      identifier: localStorage.getItem("adminEmail")|| null,
      otp: "",
    });

    // Update form fields
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleChangePaassword= async()=>{
    setShowPasswordSection(true);
    setSuccess("Otp sending....");
    const res= await sendEmailOtp(data.identifier);
    setSuccess(res);
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (data.otp.trim().length === 0) {
      alert("Please enter OTP to verify!");
      return;
    }
    setLoding(true);
    
    const response= await updateAdminPassword(data.identifier, data);
    if(response.status==="SUCCESS"){
        alert(response.data);
        setConfirmPassword("");
        setError("");
        setShowPasswordSection(false);
    }else{
        setSuccess("");
        setError(response.data);
    }
    setLoding(false);
    
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>

      {/* ===== Account Settings ===== */}
      <div className="settings-section">
        <h3>Account Settings</h3>

        {!showPasswordSection ? (
          <button
            className="btn-primary"
            onClick={handleChangePaassword}
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={data.password}
              onChange={handleChange}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <label>Enter OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={data.otp}
              onChange={handleChange}
            />
            <p style={{ color: "red"}}>{error}</p>
            <p style={{ color: "green"}}>{success}</p>
            <div className="button-group">
              <button type="submit" className="btn-primary">
                {loading ? "Updating..." : "Submit"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowPasswordSection(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ===== App Settings ===== */}
      <div className="settings-section">
        <h3>App Settings</h3>
        <div className="toggle">
          <label>Enable Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>
      </div>

      {/* ===== Other ===== */}
      <div className="settings-section">
        <h3>Other</h3>
        <p>
          <a href="#" className="link">
            Privacy Policy
          </a>
        </p>
        <button onClick={handleLogout} className="btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
