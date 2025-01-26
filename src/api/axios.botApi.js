import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000",
});

export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

export const initial_get_response = async (query) => {
    try {
        const response = await apiClient.post(`/respond`,{
            query : query
        });
        return [response.data.response, response.data.session_id];
    } catch(error) {
        console.error(error);
    }
};

export const session_get_response = async (query, sessionID) => {
    try {
        const response = await apiClient.post(`/respond`,{
            query: query,
            session_id: sessionID
        });
        return response.data.response;
    } catch (error) {
        console.error(error)
    }
};

export const login = async(formDat) => {
    try {
        const response = await apiClient.post(`/login`,formDat);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const register = async (signUpData) => {
    try {
        const response = await apiClient.post(`/register`, {
            email: signUpData.email,
            username: signUpData.username,
            password: signUpData.password
        });
        console.log('From Register : ',response.data.user_id);
        return response.data.message;
    } catch (error) {
        console.error(error);
    }
}
