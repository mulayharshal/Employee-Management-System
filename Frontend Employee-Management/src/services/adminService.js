import api from "./api";


// Add employee
export const addEmployee = async (empData,adminId,deptId) => {
  try {
    const response = await api.post(`/admin/addEmployee/${adminId}/${deptId}`, empData);
    return response.data;
  } catch (error) {
    console.error("Error during admin login:", error);
    throw error;
  }
};

// get allemployess 
export const getEpmloyees = async (id) => {
  try {
    const response = await api.get(`/admin/getEpmloyees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};



// delete the employee
export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`/admin/deleteEmployee/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};



// getAdminProfile
export const getAdminProfile = async (id) => {
  try {
    const response = await api.get(`/admin/getAdminProfile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


// get one employee
export const getOneEmployee = async (id) => {
  try {
    const response = await api.get(`/admin/getOneEmployee/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// update the employee
export const updateEmployee = async (id, empData ) => {
  try {
    const response = await api.put(`/admin/updateEmployee/${id}`,empData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// admin password update
export const updateAdminPassword = async (id, passwordChanegeData ) => {
  try {
    const response = await api.patch(`/admin/updateAdminPassword/${id}`,passwordChanegeData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};