// services/api.ts

import axios from "axios";

const API_BASE_URL = "https://linksnap-api-beta.vercel.app/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const API_ENDPOINTS = {
  shortenLink: "/shorten",
  prepareLink: "/prepare",
  redirectLink: "/redirect",
};

const apiService = {
  shortenLink: async (preparedLink: string, customizedLink: string) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.shortenLink, {
        preparedLink,
        customizedLink,
      });
      return response.data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  },
  prepareLink: async (originalLink: string) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.prepareLink, {
        originalLink,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  },
  getRedirectLink: async (shortenedLink: string) => {
    try {
      console.log("getRedirectLink");
      const response = await axiosInstance.post(API_ENDPOINTS.redirectLink, {
        shortenedLink,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  },
};

export default apiService;
