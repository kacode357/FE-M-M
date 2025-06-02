'use client';

import React, { useState } from 'react';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import Dashboard from '@/components/admin/Dashboard';
import UserManagement from '@/components/admin/UserManagement';

const { Header, Content, Footer, Sider } = Layout;

const menuItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Quản lý User',
  },
];

const AdminPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/auth/login';
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="demo-logo" />
        <Button
          type="primary"
          onClick={handleLogout}
          style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
        >
          Logout
        </Button>
      </Header>
      <div style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'Admin' }, { title: selectedKey === 'dashboard' ? 'Dashboard' : 'Quản lý User' }]}
        />
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              style={{ height: '100%' }}
              items={menuItems}
              onClick={handleMenuClick}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {selectedKey === 'dashboard' ? <Dashboard /> : <UserManagement />}
          </Content>
        </Layout>
      </div>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default AdminPage;