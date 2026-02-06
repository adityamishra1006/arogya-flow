import axiosInstance from "./axiosInstance.js";


// Fetch dashboard stats
// Returns promise api response with dashboard stats
export const getDashboardStats = () => {
    return axiosInstance.get("/dashboard/stats");
}