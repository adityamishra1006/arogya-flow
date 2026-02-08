import axiosInstance from "./axiosInstance.js";

export const bookToken = (tokenRequest) => {
    return axiosInstance.post("/tokens/book", tokenRequest);
}

export const cancelToken = (tokenId) => {
    return axiosInstance.post(`/tokens/${tokenId}/cancel`);
}

export const expireToken = (tokenId) => {
    return axiosInstance.post(`/tokens/${tokenId}/expire`);
}