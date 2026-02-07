import axiosInstance from "./axiosInstance.js";

export const createDoctor = (doctorData) => {
    return axiosInstance.post("/doctors", doctorData);
};

export const getAllDoctors = () => {
    return axiosInstance.get("/doctors");
};

export const getDoctorsById = (doctorId) => {
    return axiosInstance.get(`/doctors/${doctorId}`);
}