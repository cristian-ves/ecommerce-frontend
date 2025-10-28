import axios from "axios";


const apiInstance = axios.create({
    baseURL: "https://embryoid-appetizingly-sullivan.ngrok-free.dev",
});

apiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default apiInstance;
