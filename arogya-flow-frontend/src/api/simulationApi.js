import axiosInstance from "./axiosInstance.js";

export const resetSimulation = () => {
    return axiosInstance.post("/simulation/rest");
};

export const simulationDelay = (slotId, delayMinute) => {
    return axiosInstance.post(`/simulation/slots/${slotId}/delay`,
        null,
        {params:{delayMinute}}
    );
};

export const triggerEmergency = (slotId) => {
    return axiosInstance.post(`/simulation/emergency/${slotId}/emergency`);
};

export const closeExpiredSlots = () => {
    return axiosInstance.post(`/simulation/closeExpiredSlots`);
}