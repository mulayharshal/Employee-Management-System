import React, { useState } from "react";
import "../styles/Login.css";
import { adminLogin } from "../services/authService";
import { sendEmailOtp } from "../services/authService";
import { updateAdminPassword } from "../services/adminService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot Password State
  const [showForgot, setShowForgot] = useState(false);
  const [fpEmail, setFpEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setLoading(true);

    const loginData = { email, password };

    try {
      const response = await adminLogin(loginData);

      if (response.status === "SUCCESS") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("adminEmail", response.data.adminEmail);
        localStorage.setItem("adminId", response.data.adminId);
        localStorage.setItem("adminMobile", response.data.adminMobile);
        localStorage.setItem("adminName", response.data.adminName);
        localStorage.setItem("companyName", response.data.companyName);

        alert("Login successful!");
        navigate("/dashboard");
      } else {
        setErrors(response.data);
      }
    } catch (error) {
      setErrors("Server problem, try again.");
    }

    setLoading(false);
  };

  // ============================
  // FORGOT PASSWORD FLOW
  // ============================

  const handleSendOtp = async () => {
    if (!fpEmail) return alert("Enter email");

    const res = await sendEmailOtp(fpEmail);
    setOtpSent(true);
    alert(res || "Error sending OTP");

   
  };

  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP first");
    setOtpVerified(true); // No separate verify API like settings
  };

  const handleResetPassword = async () => {
    if (newPass !== confirmPass)
      return alert("Passwords do not match");

    const payload = {
      password: newPass,
      otp: otp,
      identifier: fpEmail,
    };

    const res = await updateAdminPassword(fpEmail, payload);

    if (res?.status === "SUCCESS") {
      alert("Password updated successfully!");
      setShowForgot(false);
    } else {
      alert(res?.data || "Error updating password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login with your email and password</p>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <p className="forgot-text" onClick={() => setShowForgot(true)}>
            Forgot Password?
          </p>

          <button type="submit" className="login-btn">
            {loading ? "Logging..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don’t have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign up
            </a>
          </p>
          <p style={{ color: "red" }}>{errors}</p>
        </div>
      </div>

      {/* FORGOT PASSWORD POPUP */}
      {showForgot && (
        <div className="forgot-popup">
          <div className="forgot-box">
            <h3>Reset Password</h3>

            {/* STEP 1 — ENTER EMAIL */}
            {!otpSent && (
              <>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                />
                <button className="login-btn" onClick={handleSendOtp}>
                  Send OTP
                </button>
              </>
            )}

            {/* STEP 2 — ENTER OTP */}
            {otpSent && !otpVerified && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="login-btn" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              </>
            )}

            {/* STEP 3 — RESET PASSWORD */}
            {otpVerified && (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />

                <button className="login-btn" onClick={handleResetPassword}>
                  Update Password
                </button>
              </>
            )}

            <p
              className="close-btn"
              onClick={() => setShowForgot(false)}
            >
              Close
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
