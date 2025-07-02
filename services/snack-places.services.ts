import { defaultAxiosInstance } from '@/config/axios.config';

// Định nghĩa kiểu dữ liệu cho params để dùng lại cho tiện
type SnackPlaceSearchParams = {
    pageNum: number;
    pageSize: number;
    searchKeyword: string;
    status: boolean;
};

/**
 * @Mục đích: Tìm kiếm các quán ăn vặt theo tiêu chí.
 * @Endpoint: /api/SnackPlaces/search-snackplaces
 * @Phương thức: POST
 */
const searchSnackPlaces = async (params: SnackPlaceSearchParams) => {
    const response = await defaultAxiosInstance.post('/api/SnackPlaces/search-snackplaces', params);
    return response.data;
};

// Mốt mày có thêm API cho SnackPlaces (create, update, delete) thì thêm vào đây

// --- EXPORT API ---
export {
    searchSnackPlaces,
};