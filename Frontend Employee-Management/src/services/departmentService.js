import api from "./api";
const token = localStorage.getItem("token");


// get all departments
export const getDepartments = async () => {
  try {
    const response = await api.get(`/department/getDepartments` , {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Token expired or unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.error("Error :", error);
    throw error;
  }
};