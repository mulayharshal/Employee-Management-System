import api from "./api";
const token = localStorage.getItem("token");

// Add employee
export const addEmployee = async (empData,adminId,deptId) => {
  try {
    const response = await api.post(`/admin/addEmployee/${adminId}/${deptId}`, empData , {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Token expired or unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.error("Error during admin login:", error);
    throw error;
  }
};

// get allemployess 
export const getEpmloyees = async (id) => {
  try {
    const response = await api.get(`/admin/getEpmloyees/${id}`, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Token expired or unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.error("Error", error);
    throw error;
  }
};



// delete the employee
export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`/admin/deleteEmployee/${id}`, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Token expired or unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.error("Error:", error);
    throw error;
  }
};



// getAdminProfile
export const getAdminProfile = async (id) => {
  try {
    const response = await api.get(`/admin/getAdminProfile/${id}`, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Token expired or unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.error("Error:", error);
    throw error;
  }
};


// get one employee
export const getOneEmployee = async (id) => {
  try {
    const response = await api.get(`/admin/getOneEmployee/${id}`, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Token expired or unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.error("Error:", error);
    throw error;
  }
};

// update the employee
export const updateEmployee = async (id, empData ) => {
  try {
    const response = await api.put(`/admin/updateEmployee/${id}`,empData , {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Token expired or unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.error("Error:", error);
    throw error;
  }
};

// admin password update
export const updateAdminPassword = async (id, passwordChanegeData ) => {
  try {
    const response = await api.patch(`/admin/updateAdminPassword/${id}`,passwordChanegeData , {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Token expired or unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.error("Error:", error);
    throw error;
  }
};