import axiosInstance from './axiosInstance';

export const bookSlot = (data) => {
    return axiosInstance.post("/appointment/book", data);
};