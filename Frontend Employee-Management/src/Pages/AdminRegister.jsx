import React, { useState, useEffect } from "react";
import {
  adminRegister,
  sendEmailOtp,
  verifyOtp,
} from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/AdminRegister.css";


export default function AdminRegister() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailOtpIn, setEmailOtpIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [timer, setTimer] = useState(0); // resend timer

  const [formData, setFormData] = useState({
    adminName: "",
    companyName: "",
    adminEmail: "",
    adminMobile: "",
    adminPassword: "",
    confirmPassword: "",
    isVerified: false,
  });

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // send OTP handler
  const handleEmailOtp = async (e) => {
    e.preventDefault();
    if (!formData.adminEmail) {
      setError("Please enter your email first.");
      return;
    }
    setError("");
    setOtpLoading(true);
    try {
      const response = await sendEmailOtp(formData.adminEmail);
      setSuccess(response);
      setEmailOtpIn(true);
      setTimer(60); // 1 min
    } catch (err) {
      setError("Failed to send OTP. Try again.");
      console.error(err);
    } finally {
      setOtpLoading(false);
    }
  };

  // verify OTP handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    setVerifyLoading(true);
    try {
      const response = await verifyOtp(formData.adminEmail, otp);
      if (response === "verified successfully!") {
        setEmailVerified(true);
        setSuccess("Email verified successfully!");
        setError("");
      } else {
        setError(response);
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("OTP verification failed. Try again.");
    } finally {
      setVerifyLoading(false);
    }
  };

  // handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.adminPassword !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!emailVerified) {
      setError("Please verify your email before registering.");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const registerData = {
        adminName: formData.adminName,
        companyName: formData.companyName,
        adminEmail: formData.adminEmail,
        adminMobile: formData.adminMobile,
        adminPassword: formData.adminPassword,
        isVerified: true,
      };

      const data = await adminRegister(registerData);
      if (data.status == "SUCCESS") {
        setSuccess(data?.data || "Registration successful!");
        navigate("/home");
      }else{
        setError(data.data)
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register as Admin</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="adminName">Name:</label>
        <input
          id="adminName"
          name="adminName"
          value={formData.adminName}
          onChange={handleChange}
          placeholder="Enter your name"
          type="text"
          required
        />
        <br />
        <br />

        <label htmlFor="companyName">Company/Organization Name:</label>
        <input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter your company name"
          type="text"
          required
        />
        <br />
        <br />

        <label htmlFor="adminEmail">Email:</label>
        <input
          id="adminEmail"
          name="adminEmail"
          value={formData.adminEmail}
          onChange={handleChange}
          placeholder="Enter your email"
          type="email"
          required
          disabled={emailVerified}
        />

        {!emailVerified && (
          <>
            {emailOtpIn && (
              <div style={{ marginTop: "10px" }}>
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  type="number"
                />
                <button
                  onClick={handleVerifyOtp}
                  type="button"
                  disabled={verifyLoading}
                >
                  {verifyLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            )}

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={handleEmailOtp}
                type="button"
                disabled={otpLoading || timer > 0}
              >
                {otpLoading
                  ? "Sending..."
                  : timer > 0
                  ? `Resend OTP (${timer}s)`
                  : "Send OTP"}
              </button>
            </div>
          </>
        )}

        {emailVerified && (
          <p style={{ color: "green", marginTop: "10px" }}>
            ✅ Email verified successfully!
          </p>
        )}

        <br />
        <br />

        <label htmlFor="adminMobile">Mobile Number:</label>
        <input
          id="adminMobile"
          name="adminMobile"
          value={formData.adminMobile}
          onChange={handleChange}
          placeholder="Enter your Mobile number"
          type="number"
          required
        />
        <br />
        <br />

        <label htmlFor="adminPassword">Password:</label>
        <input
          id="adminPassword"
          name="adminPassword"
          value={formData.adminPassword}
          onChange={handleChange}
          placeholder="Enter your password"
          type="password"
          required
        />
        <br />
        <br />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter password"
          type="password"
          required
        />
        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>
      <p>
            Allready have an account?{" "}
            <a href="/login" className="signup-link">
              Login Now
            </a>
          </p>

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
      {success && (
        <p style={{ color: "green", marginTop: "15px" }}>{success}</p>
      )}
    </div>
  );
}
