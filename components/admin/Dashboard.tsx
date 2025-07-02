'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { UserOutlined, HomeOutlined, DollarOutlined } from '@ant-design/icons'; // SỬA: Bỏ ShopOutlined, thêm DollarOutlined
import {
  GetDashboardTotalsApi,
  GetRevenueByDateApi,
  GetRevenueByMonthApi,
} from '@/services/dashboard.services';

// SỬA: Cập nhật interface để thêm 'money'
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
  // XÓA: Không cần state cho merchant nữa
  // const [merchantPercentage, setMerchantPercentage] = useState<MerchantPercentageData | null>(null); 
  const [revenueByDate, setRevenueByDate] = useState<RevenueByDateData[]>([]);
  const [revenueByMonth, setRevenueByMonth] = useState<RevenueByMonthData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Gọi API lấy tổng số
        const totalsRes = await GetDashboardTotalsApi();
        console.log('GetDashboardTotalsApi response:', totalsRes);
        setTotals(totalsRes);

        // XÓA: Không gọi API của merchant nữa
        // const merchantRes = await GetMerchantPercentageApi();
        // console.log('GetMerchantPercentageApi response:', merchantRes);
        // setMerchantPercentage(merchantRes);

        // Gọi API lấy doanh thu theo ngày
        const revenueDateRes = await GetRevenueByDateApi({ from: '6/1/2025', to: '6/30/2025' });
        console.log('GetRevenueByDateApi response:', revenueDateRes);
        setRevenueByDate(revenueDateRes);

        // Gọi API lấy doanh thu theo tháng
        const revenueMonthRes = await GetRevenueByMonthApi({ year: 2025 });
        console.log('GetRevenueByMonthApi response:', revenueMonthRes);
        setRevenueByMonth(revenueMonthRes);
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
      {/* Tổng quan */}
      <Row gutter={[16, 16]} style={{ marginBottom: '40px' }}>
        <Col xs={24} sm={12} md={8}>
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
        <Col xs={24} sm={12} md={8}>
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
        {/* MỚI: Thêm Card Tổng Doanh Thu */}
        <Col xs={24} sm={12} md={8}>
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
      </Row>

      {/* XÓA: Bỏ hoàn toàn phần tỷ lệ merchant */}

      {/* SỬA: Bọc 2 biểu đồ vào Row để căn giữa và làm responsive */}
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