import api from "./api";

// Admin login
export const adminLogin = async (loginData) => {
  try {
    const response = await api.post("/auth/adminLogin", loginData);
    return response.data;
  } catch (error) {
    console.error("Error during admin login:", error);
    throw error;
  }
};

// Admin register
export const adminRegister = async (formData) => {
  try {
    const response = await api.post("/auth/adminRegister", formData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Server response:", response);
    return response.data;
  } catch (error) {
    console.error("Error during admin registration:", error);
    throw error;
  }
};


// Send email OTP
export const sendEmailOtp = async (idf) => {
  try {
    const response = await api.post("/auth/sendEmailOtp", { idf });
    return response.data;
  } catch (error) {
    console.error("Error sending email OTP:", error);
    throw error;
  }
};

// Verify OTP
export const verifyOtp = async (idf, otp) => {
  try {
    const response = await api.post("/auth/verifyOtp", { idf, otp });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};
