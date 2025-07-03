'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
// SỬA: Thêm TransactionOutlined cho card mới
import { UserOutlined, HomeOutlined, DollarOutlined, TransactionOutlined } from '@ant-design/icons';
import {
  GetDashboardTotalsApi,
  GetRevenueByDateApi,
  GetRevenueByMonthApi,
  GetTotalPaymentsApi, // MỚI: Import API lấy tổng giao dịch
} from '@/services/dashboard.services';

interface TotalsData {
  users: number;
  snackPlaces: number;
  money: number;
}

interface RevenueByDateData {
  date: string;
  totalAmount: number;
}

interface RevenueByMonthData {
  month: number;
  totalAmount: number;
}

const Dashboard: React.FC = () => {
  const [totals, setTotals] = useState<TotalsData | null>(null);
  const [revenueByDate, setRevenueByDate] = useState<RevenueByDateData[]>([]);
  const [revenueByMonth, setRevenueByMonth] = useState<RevenueByMonthData[]>([]);
  const [totalPayments, setTotalPayments] = useState<number>(0); // MỚI: State cho tổng giao dịch
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Gọi các API song song để tăng tốc
        const [
            totalsRes, 
            revenueDateRes, 
            revenueMonthRes, 
            paymentsRes // MỚI: Gọi API tổng giao dịch
        ] = await Promise.all([
          GetDashboardTotalsApi(),
          GetRevenueByDateApi({ from: '6/1/2025', to: '6/30/2025' }),
          GetRevenueByMonthApi({ year: 2025 }),
          GetTotalPaymentsApi() 
        ]);

        console.log('GetDashboardTotalsApi response:', totalsRes);
        setTotals(totalsRes);

        console.log('GetRevenueByDateApi response:', revenueDateRes);
        setRevenueByDate(revenueDateRes);

        console.log('GetRevenueByMonthApi response:', revenueMonthRes);
        setRevenueByMonth(revenueMonthRes);
        
        // MỚI: Set state cho tổng giao dịch
        console.log('GetTotalPaymentsApi response:', paymentsRes);
        // Data nằm trong response.data.totalPayments
        if (paymentsRes && paymentsRes.totalPayments) {
          setTotalPayments(paymentsRes.totalPayments);
        }

      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* SỬA: Bọc 4 card vào Row, mỗi card chiếm 6 cột trên màn hình lớn (lg) */}
      <Row gutter={[16, 16]} style={{ marginBottom: '40px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <span>
                <UserOutlined style={{ marginRight: 8 }} />
                Tổng số người dùng
              </span>
            }
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            hoverable
          >
            <h2 style={{ color: '#0088FE', margin: 0 }}>{totals?.users || 0}</h2>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <span>
                <HomeOutlined style={{ marginRight: 8 }} />
                Tổng số quán
              </span>
            }
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            hoverable
          >
            <h2 style={{ color: '#00C49F', margin: 0 }}>{totals?.snackPlaces || 0}</h2>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <span>
                <DollarOutlined style={{ marginRight: 8 }} />
                Tổng Doanh Thu
              </span>
            }
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            hoverable
          >
            <h2 style={{ color: '#FF8042', margin: 0 }}>
              {(totals?.money || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </h2>
          </Card>
        </Col>
        {/* MỚI: Thêm Card Tổng số giao dịch */}
        <Col xs={24} sm={12} lg={6}>
            <Card
                title={
                    <span>
                        <TransactionOutlined style={{ marginRight: 8 }} />
                        Tổng số giao dịch
                    </span>
                }
                style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                hoverable
            >
                <h2 style={{ color: '#FFBB28', margin: 0 }}>{totalPayments}</h2>
            </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify="center">
        {/* Biểu đồ doanh thu theo ngày */}
        <Col xs={24} lg={12}>
          <Card
            title="Doanh thu theo ngày (Tháng 6/2025)"
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: '100%' }}
            hoverable
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueByDate} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('vi-VN')} />
                <YAxis tickFormatter={(value) => `${(value as number / 1000000)} Tr`} />
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} VNĐ`} />
                <Legend />
                <Line type="monotone" dataKey="totalAmount" name="Doanh thu" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Biểu đồ doanh thu theo tháng */}
        <Col xs={24} lg={12}>
          <Card
            title="Doanh thu theo tháng (Năm 2025)"
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: '100%' }}
            hoverable
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByMonth} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={(month) => `T${month}`} />
                <YAxis tickFormatter={(value) => `${(value as number / 1000000)}M`} />
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} VNĐ`} />
                <Legend />
                <Bar dataKey="totalAmount" name="Doanh thu" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;