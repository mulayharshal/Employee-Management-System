import React, { useState } from "react";
import "../styles/Login.css";
import { adminLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";


const Login = () => {
      const navigate = useNavigate();
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]=useState("");
  const [loading, setLoading]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Later, call your backend API or Firebase login method here
   const loginData={
    email: email,
    password: password
   }
   setLoading(true);
   try {
      const response = await adminLogin(loginData);
      if(response.status == "SUCCESS"){
        console.log(response.data);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("adminEmail", response.data.adminEmail);
        localStorage.setItem("adminId", response.data.adminId);
        localStorage.setItem("adminMobile", response.data.adminMobile);
        localStorage.setItem("adminName", response.data.adminName);
        localStorage.setItem("companyName", response.data.companyName);

        alert("Login successful");
        navigate("/dashboard");  
      }else{
        setErrors(response.data);
        setLoading(false);
      }
      console.log("Login successful:", response);
    } catch (error) {
      setLoading(false);
      setErrors("Server problem try again")
      console.error("Login failed:", error);
    }
   


  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login with your email and password</p>

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

          <button type="submit" className="login-btn">
            {loading?"loging..":"Login"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don’t have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign up
            </a>
          </p>
          <p style={{ color: "red"}}>{errors}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
