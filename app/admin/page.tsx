'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardOutlined, UserOutlined, ShopOutlined, AppleOutlined, CoffeeOutlined, ForkOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Typography, Image } from 'antd';
import Dashboard from '@/components/admin/Dashboard';
import UserManagement from '@/components/admin/UserManagement';
import BusinessModels from '@/components/admin/Business/BusinessModels';
import DietManagement from '@/components/admin/Diet/DietManagement';
import TasteManagement from '@/components/admin/Taste/TasteManagement';
import FoodTypeManagement from '@/components/admin/FoodType/FoodTypeManagement';
import { AuthContext } from '@/contexts/AuthContext';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const MENU_ITEMS = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Bảng điều khiển' },
  { key: 'users', icon: <UserOutlined />, label: 'Người dùng' },
  { key: 'business', icon: <ShopOutlined />, label: 'Mô hình kinh doanh' },
  { key: 'diet', icon: <AppleOutlined />, label: 'Chế độ ăn' },
  { key: 'taste', icon: <CoffeeOutlined />, label: 'Khẩu vị' },
  { key: 'foodtype', icon: <ForkOutlined />, label: 'Loại món ăn' },
];

const AdminPage: React.FC = () => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const { authData, setAuthData } = useContext(AuthContext);
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    if (!authData.accessToken) router.push('/auth/login');
  }, [authData, router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthData({ accessToken: null, refreshToken: null, user: null });
    router.push('/auth/login');
  };

  const breadcrumbItems = [
    { title: 'Quản trị' },
    {
      title: 
        selectedKey === 'dashboard' ? 'Bảng điều khiển' :
        selectedKey === 'users' ? 'Người dùng' :
        selectedKey === 'business' ? 'Mô hình kinh doanh' :
        selectedKey === 'diet' ? 'Chế độ ăn' :
        selectedKey === 'taste' ? 'Khẩu vị' :
        selectedKey === 'foodtype' ? 'Loại món ăn' : '',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#001529' }}>
        <Image
          src="/images/logo-mm-final-2.png"
          alt="Logo"
          width={250}
          height={80}
          preview={false}
          style={{ objectFit: 'contain' }}
        />
        <Text strong style={{ color: '#fff', fontSize: 18, flex: 1, textAlign: 'center' }}>
          Trang quản lý của Admin
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Text strong style={{ color: '#fff', fontSize: 18 }}>
            {authData.user?.fullname || 'Người dùng'}
          </Text>
          <Button type="primary" danger onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </Header>
      <Layout style={{ padding: '0 24px' }}>
        <Breadcrumb items={breadcrumbItems} style={{ margin: '16px 0' }} />
        <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              items={MENU_ITEMS}
              onClick={({ key }) => setSelectedKey(key)}
              style={{ height: '100%' }}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: '75vh' }}>
            {selectedKey === 'dashboard' && <Dashboard />}
            {selectedKey === 'users' && <UserManagement />}
            {selectedKey === 'business' && <BusinessModels />}
            {selectedKey === 'diet' && <DietManagement />}
            {selectedKey === 'taste' && <TasteManagement />}
            {selectedKey === 'foodtype' && <FoodTypeManagement />}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} - Tạo bởi Ant UED
      </Footer>
    </Layout>
  );
};

export default AdminPage;