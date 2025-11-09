import api from "./api";

// get all departments
export const getDepartments = async () => {
  try {
    const response = await api.get(`/department/getDepartments`);
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};