import API from "../api/api";

export const registerUser = (data) => {
    return API.post("/auth/register", data);
};

export const loginUser = (data) => {
    return API.post("/auth/login", data);
};

export const forgotPassword = (email) => {
    return API.post("/auth/forgot-password", null, {
        params: { email }
    });
};

export const resetPassword = (data) => {
    return API.post("/auth/reset-password", data);
};
