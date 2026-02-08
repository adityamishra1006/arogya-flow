import axiosInstance from "./axiosInstance.js";

export const createSlotsForDoctor = (doctorId, slotRequest) => {
    return axiosInstance.post(`/slots/doctors/${doctorId}`, slotRequest);
};

export const getSlotsByDoctorAndDate = (doctorId, date) => {
    return axiosInstance.get(`/slots/doctors/${doctorId}`,{
        params:{date},
    });
};