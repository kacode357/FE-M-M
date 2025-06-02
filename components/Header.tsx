'use client';

import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Header className="bg-white shadow-sm">
        <div className="flex items-center justify-between w-full px-4 sm:px-8 h-full">
          {/* Logo - Ẩn trên mobile */}
          <div className="h-12 pl-32 flex items-center hidden sm:flex">
            <Image
              src="/images/logo-mm-final-2.png"
              alt="Mầm Map Logo"
              width={100}
              height={40}
              priority
            />
          </div>
          {/* Menu và nút cho desktop */}
          <div className="hidden sm:flex items-center">
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['nguon-dong']}
              items={[
                { key: 'nguon-dong', label: 'Nguồn động', className: 'source' },
                { key: 'quan-an', label: 'Quản án' },
                { key: 'tin-tuc', label: 'Tin tức' },
              ]}
              style={{ fontFamily: 'var(--font-baloo-2)' }}
            />
            <Button
              className="download-app ml-4"
              style={{ fontFamily: 'var(--font-baloo-2)' }}
            >
              Tải ngay
            </Button>
          </div>
          {/* Nút hamburger cho mobile - Sát bên phải */}
          <div className="flex sm:hidden justify-end mt-2 ml-auto"> 
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: '#f28c38', fontSize: '24px' }} />}
              onClick={showDrawer}
            />
          </div>
        </div>
      </Header>
      {/* Drawer cho menu mobile */}
      <Drawer
        title={
          <div className="flex items-end">
            <Image
              src="/images/logo-mm-final-2.png"
              alt="Mầm Map Logo"
              width={80}
              height={32}
            />
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        className="mobile-drawer"
      >
        <div className="mobile-menu">
          <div className="mobile-menu-item source">Nguồn động</div>
          <div className="mobile-menu-item">Quản án</div>
          <div className="mobile-menu-item">Tin tức</div>
          <div className="mobile-menu-item download">
            <Button className="download-app">Tải ngay</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HeaderComponent;