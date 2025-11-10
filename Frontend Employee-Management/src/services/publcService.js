import api from "./api";




// get home data
export const homeData = async () => {
  try {
    const response = await api.get("/homeData");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
