import axios from "axios";
import { AuthResponse, LoginRequest, User } from "./type";

const API_URL = "http://185.231.180.66:8000";

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/token/`, credentials);
    return response.data;
};

export const getUserData = async (token: string): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/user/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
