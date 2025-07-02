import { defaultAxiosInstance } from '@/config/axios.config';

// Định nghĩa kiểu dữ liệu cho params để code cho chuẩn
interface PaymentSearchParams {
  paymentCode: string;
  pageNum: number;
  pageSize: number;
}

/**
 * @Mục đích: Tìm kiếm các giao dịch thanh toán.
 * @Endpoint: /api/Payment/search
 * @Phương thức: POST
 * @Tham số (params):
 * - paymentCode: Mã giao dịch
 * - pageNum: số trang
 * - pageSize: số lượng kết quả mỗi trang
 */
const searchPayments = async (params: PaymentSearchParams) => {
  const response = await defaultAxiosInstance.post('/api/Payment/search', params);
  // Trả về thẳng data từ response
  return response.data;
};

// --- EXPORT API ---
export {
    searchPayments,
};