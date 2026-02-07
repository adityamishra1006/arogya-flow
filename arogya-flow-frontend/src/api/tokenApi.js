import axiosInstance from "./axiosInstance.js";

export const bookToken = (tokenRequest) => {
    return axiosInstance.post("/token/book", tokenRequest);
}

export const cancelToken = (tokenId) => {
    return axiosInstance.post(`/token/${tokenId}/cancel`);
}

export const expireToken = (tokenId) => {
    return axiosInstance.post(`/token/${tokenId}/expire`);
}