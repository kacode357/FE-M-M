import { defaultAxiosInstance } from '@/config/axios.config';

const LoginUserApi = async (data: { userName: string; password: string; }) => {
    const response = await defaultAxiosInstance.post('/api/users/login', data);
    return response.data;
};
const GetCurrentUserApi = async () => {
    const response = await defaultAxiosInstance.get('/api/users/get-current-login');
    return response.data;
};
const RefreshTokenApi = async (data: { accessToken: string; refreshToken: string; }) => {
    const response = await defaultAxiosInstance.post('/api/users/refresh-token', data);
    return response.data;
};

export {
    RefreshTokenApi,
    GetCurrentUserApi,
    LoginUserApi,
};

