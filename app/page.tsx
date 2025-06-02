'use client';

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import HeaderComponent from '@/components/Header';
import FooterComponent from '@/components/Footer';
import Component1 from '@/components/home/Component1';
import Component2 from '@/components/home/Component2';
import Component3 from '@/components/home/Component3';
import Component4 from '@/components/home/Component4';
import Component5 from '@/components/home/Component5';
import Component6 from '@/components/home/Component6';
import Component7 from '@/components/home/Component7';
import '@/styles/antd-custom.css';

const { Content } = Layout;

const Home: React.FC = () => {
  // Logic cuộn từ từ lên đầu trang (đã bị xóa, nhưng giữ lại comment)
  
  // Cleanup interval khi component unmount (để tránh memory leak)
  useEffect(() => {
    return () => {
      const scrollInterval = setInterval(() => {}, 99999);
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <Layout className="min-h-screen bg-white"> {/* Đổi màu nền tổng thể thành trắng */}
      {/* Header */}
      <HeaderComponent />

      {/* Nội dung chính */}
      <Content className="bg-white"> {/* Đổi từ bg-gray-100 thành bg-white */}
        <div className="w-full flex flex-col gap-4">
          <Component1 />
          <Component2 />
          <Component3 />
          <Component4 />
          <Component5 />
          <Component6 />
          <Component7 />
        </div>
      </Content>

      {/* Footer */}
      <FooterComponent />
    </Layout>
  );
};

export default Home;