// services/dashboard.services.ts
import { defaultAxiosInstance } from '@/config/axios.config';

// Lấy tổng số thông tin (users, merchants, snackPlaces)
const GetDashboardTotalsApi = async () => {
    const response = await defaultAxiosInstance.get('/api/dashboard/totals');
    return response.data;
};

// Lấy tỷ lệ merchant (total, premium, regular, breakdown)
const GetMerchantPercentageApi = async () => {
    const response = await defaultAxiosInstance.get('/api/dashboard/merchantPercentage');
    return response.data;
};

// Lấy doanh thu theo khoảng ngày
// params: { from: string, to: string } - định dạng date-time (VD: "6/1/2025")
const GetRevenueByDateApi = async (params: { from: string; to: string }) => {
    const response = await defaultAxiosInstance.get('/api/dashboard/revenueByDate', { params });
    return response.data;
};

// Lấy doanh thu theo tháng trong năm
// params: { year: number } - VD: 2025
const GetRevenueByMonthApi = async (params: { year: number }) => {
    const response = await defaultAxiosInstance.get('/api/dashboard/revenueByMonth', { params });
    return response.data;
};

export {
    GetDashboardTotalsApi,
    GetMerchantPercentageApi,
    GetRevenueByDateApi,
    GetRevenueByMonthApi,
};