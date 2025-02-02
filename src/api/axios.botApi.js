import axios from "axios";
import { toast } from "react-toastify";

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

export const check_backend_status = async () => {
    try {
        const response = await apiClient.get('/status')
        if (response.data.status === 'active') {
            return true;
        } else {
            return false;
        };
    } catch (error) {
        console.error(error);
    };
};

export const get_user_sessions = async () => {
    try {
        const response = await apiClient.get('/user/sessions')
        return response.data;
    } catch (error) {
        console.error(error);
    };
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

export const load_conversation = async (sessionID) => {
    try {   
        const response = await apiClient.get(`/user/sessions/${sessionID}/messages`);
        return response.data.messages;
    } catch (error) {
        console.error(error);
    }
}

export const login = async(formDat) => {
    try {
        const response = await apiClient.post(`/login`,formDat);
        if (response.status!=400) {
            return {
                status : response.status,
                ...response.data
            }
        } else {
            return {
                status: response.status
            }
        }
    } catch (error) {
        console.error(error);
        toast.error('Login Failed')
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
