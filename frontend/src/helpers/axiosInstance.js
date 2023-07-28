import axios from "axios";
import { endpoints } from "./endpoints"; // adjust this import according to your project structure

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/en/api", // replace with your baseURL
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (
            error.response.status === 401 &&
            originalRequest.url === "http://127.0.0.1:8000/en/api/accounts/token/refresh/"
        ) {
            window.location.href = "/login/";
            return Promise.reject(error);
        }

        if (
            error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    return endpoints
                        .refreshToken(refreshToken)
                        .then((response) => {
                            localStorage.setItem("accessToken", response.data.access);
                            localStorage.setItem("refreshToken", response.data.refresh);

                            axiosInstance.defaults.headers["Authorization"] =
                                "Bearer " + response.data.access;
                            originalRequest.headers["Authorization"] =
                                "Bearer " + response.data.access;

                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = "/login/";
                }
            } else {
                console.log("Refresh token not available.");
                window.location.href = "/login/";
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance;
