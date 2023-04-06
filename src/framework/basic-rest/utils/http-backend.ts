import axios from "axios";
import { getToken } from "./get-token";
import { getApiKey, getApiEndpoint } from "@utils/functionutil";

const http = axios.create({
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.baseURL = getApiEndpoint();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
      "x-api-key": getApiKey(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
