'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { UserOutlined, ShopOutlined, HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import {
  GetDashboardTotalsApi,
  GetMerchantPercentageApi,
  GetRevenueByDateApi,
  GetRevenueByMonthApi,
} from '@/services/dashboard.services';

interface TotalsData {
  users: number;
  merchants: number;
  snackPlaces: number;
}

interface MerchantPercentageData {
  totalMerchants: number;
  totalPremiumMerchants: number;
  regularMerchants: number;
  premiumMerchantBreakdown: { packageId: number; packageName: string; premiumMerchantCount: number; percent: number }[];
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
  const [merchantPercentage, setMerchantPercentage] = useState<MerchantPercentageData | null>(null);
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

        // Gọi API lấy tỷ lệ merchant
        const merchantRes = await GetMerchantPercentageApi();
        console.log('GetMerchantPercentageApi response:', merchantRes);
        setMerchantPercentage(merchantRes);

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

  // Màu sắc cho PieChart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Tổng quan */}
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
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
                <ShopOutlined style={{ marginRight: 8 }} />
                Tổng số merchants
              </span>
            }
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            hoverable
          >
            <h2 style={{ color: '#00C49F', margin: 0 }}>{totals?.merchants || 0}</h2>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title={
              <span>
                <HomeOutlined style={{ marginRight: 8 }} />
                Tổng số snack places
              </span>
            }
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            hoverable
          >
            <h2 style={{ color: '#FFBB28', margin: 0 }}>{totals?.snackPlaces || 0}</h2>
          </Card>
        </Col>
      </Row>

      {/* Tỷ lệ merchant */}
      <Card
        title={
          <span>
            <PieChartOutlined style={{ marginRight: 8 }} />
            Tỷ lệ Merchant
          </span>
        }
        style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '20px' }}
        hoverable
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <p><strong>Tổng merchants:</strong> {merchantPercentage?.totalMerchants || 0}</p>
            <p><strong>Merchants thường:</strong> {merchantPercentage?.regularMerchants || 0}</p>
            <p><strong>Merchants premium:</strong> {merchantPercentage?.totalPremiumMerchants || 0}</p>
          </Col>
          <Col xs={24} md={12}>
            <PieChart width={window.innerWidth < 768 ? 200 : 300} height={200}>
              <Pie
                data={merchantPercentage?.premiumMerchantBreakdown || []}
                dataKey="percent"
                nameKey="packageName"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name}: ${(percent ?? 0).toFixed(2)}%`}
              >
                {merchantPercentage?.premiumMerchantBreakdown.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
              <Legend />
            </PieChart>
          </Col>
        </Row>
      </Card>

      {/* Biểu đồ doanh thu theo ngày */}
      <Card
        title="Doanh thu theo ngày (Tháng 6/2025)"
        style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '20px' }}
        hoverable
      >
        <LineChart
          width={window.innerWidth < 768 ? 300 : 600}
          height={300}
          data={revenueByDate}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
          <YAxis />
          <Tooltip formatter={(value: number) => `${value.toLocaleString()} VNĐ`} />
          <Legend />
          <Line type="monotone" dataKey="totalAmount" name="Doanh thu" stroke="#8884d8" />
        </LineChart>
      </Card>

      {/* Biểu đồ doanh thu theo tháng */}
      <Card
        title="Doanh thu theo tháng (Năm 2025)"
        style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        hoverable
      >
        <BarChart
          width={window.innerWidth < 768 ? 300 : 600}
          height={300}
          data={revenueByMonth}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => `Tháng ${month}`} />
          <YAxis />
          <Tooltip formatter={(value: number) => `${value.toLocaleString()} VNĐ`} />
          <Legend />
          <Bar dataKey="totalAmount" name="Doanh thu" fill="#82ca9d" />
        </BarChart>
      </Card>
    </div>
  );
};

export default Dashboard;