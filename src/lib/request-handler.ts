import Axios from "axios";
import { toast } from "sonner";
// import { env } from "./env";

const BASE_URL = "http://localhost:8000";

export const httpClient = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      if (config && config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

async function requestNewToken(refreshToken: string): Promise<string> {
  const response = await axios.post<{ access: string }>(
    `${BASE_URL}/token/refresh`,
    {
      refreshToken,
    },
  );

  if (response.status === 200) {
    return response.data.access;
  }

  throw new Error("Error when trying to refresh the user access token");
}

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const newAccessToken = await requestNewToken(refreshToken);
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch (error) {
          toast(
            "Something went wrong when trying reauthenticate. Please log in again.",
          );
          console.log(error);
        }
      }
    }
    return Promise.reject(error);
  },
);
