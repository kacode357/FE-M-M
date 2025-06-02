import { defaultAxiosInstance } from '@/config/axios.config';

const CreateBusinessModelApi = async (data: { name: string; }) => {
    const response = await defaultAxiosInstance.post('/api/BusinessModels/create', data);
    return response.data;
};
const searchBusinessModels = async (params: { pageNum: number; pageSize: number; searchKeyword: string; status: boolean }) => {
   
        const response = await defaultAxiosInstance.post('/api/BusinessModels/search', params);
        return response.data;
   
};
const GetBusinessModelByIdApi = async (id: string) => {
    const response = await defaultAxiosInstance.get(`/api/BusinessModels/getById`, { params: { id } });
    return response.data;
};
const UpdateBusinessModelApi = async (data: { id: string; name: string; }) => {
    const response = await defaultAxiosInstance.put('/api/BusinessModels/update', data);
    return response.data;
};
const DeleteBusinessModelApi = async (id: string) => {
    const response = await defaultAxiosInstance.delete('/api/BusinessModels/delete', { params: { id } });
    return response.data;
};
export {
    UpdateBusinessModelApi,
    DeleteBusinessModelApi,
    searchBusinessModels,
    CreateBusinessModelApi,
    GetBusinessModelByIdApi,
};