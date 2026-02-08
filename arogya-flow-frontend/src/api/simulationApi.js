import axiosInstance from "./axiosInstance.js";

export const resetSimulation = () => {
    return axiosInstance.post("/simulation/reset");
};

export const simulationDelay = (slotId, delayMinutes) => {
    return axiosInstance.post(`/simulation/slots/${slotId}/delay`,
        null,
        {params:{delayMinutes}}
    );
};

export const triggerEmergency = (slotId) => {
    return axiosInstance.post(`/simulation/slots/${slotId}/emergency`);
};

export const closeExpiredSlots = () => {
    return axiosInstance.post("/simulation/slots/close-expired");
}