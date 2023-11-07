// services/api.ts

import axios from "axios";

const API_BASE_URL = "https://linksnap-api.vercel.app";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const API_ENDPOINTS = {
  shortenLink: "/shorten",
};

const apiService = {
  shortenLink: async (originalLink: string, customizedLink: string) => {
    const response = await axiosInstance.post(API_ENDPOINTS.shortenLink, {
      originalLink,
      customizedLink,
    });
    return response.data;
  },
};

export default apiService;
