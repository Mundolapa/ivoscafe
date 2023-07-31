import axios from "axios";

// const BACKEND_ROOT = 'http://127.0.0.1:8000';
const BACKEND_ROOT = 'https://backend.ivoscafe.com';

const createEndpoint = (lang) => {
    const instance = axios.create({
        baseURL: `${BACKEND_ROOT}/${lang}`,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Add interceptor to include authorization headers
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("accessToken"); // Retrieve the access token from wherever you store it (e.g., local storage)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};

export const endpoints = {
    categories: (lang) => createEndpoint(lang).get("/api/categories"),
    categoryRoutes: (lang) => createEndpoint(lang).get("/api/categories/routes"),
    sliders: (lang) => createEndpoint(lang).get("/api/sliders"),
    globals: (lang) => createEndpoint(lang).get("/api/globals"),
    banners: (lang) => createEndpoint(lang).get("/api/banners"),
    products: (lang) => createEndpoint(lang).get("/api/products"),
    // productById: (lang, id) => createEndpoint(lang).get("/api/products/${id}"),
    // productsByCategory: (lang, categoryId) => createEndpoint(lang).get("/api/products/category/${categoryId}"),
    // global_apikeys: (lang) => createEndpoint(lang).get("/api/globals/api-keys"),
    // users: (lang) => createEndpoint(lang).get("/users"),
    // posts: (lang) => createEndpoint(lang).get("/posts"),
    // add more endpoints as needed
    registration: (data) => axios.post(`${BACKEND_ROOT}/en/api/accounts/registration/`, data),
    checkEmail: (email) => axios.get(`${BACKEND_ROOT}/en/api/accounts/check-email/${email}/`),
    login: (data) => axios.post(`${BACKEND_ROOT}/en/api/accounts/login/`, data),
    logout: () => axios.post(`${BACKEND_ROOT}/en/api/accounts/logout/`),
    profile: (lang, isAuthenticated, accessToken) => {
        const instance = createEndpoint(lang);
        if (isAuthenticated && accessToken) {
            instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
        }
        return instance.get("/api/accounts/profile/");
    },
    refreshToken: (refreshToken) =>
        axios.post(`${BACKEND_ROOT}/en/api/accounts/token/refresh/`,
            { refresh: refreshToken }),
};