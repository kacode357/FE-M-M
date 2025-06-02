'use client';

import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import '@/styles/component1.css';

const { Title, Paragraph } = Typography;

const Component1: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg w-full mt-7">
      {/* Phần text bên trái */}
      <div className="w-full sm:w-1/2 mb-6 sm:mb-0 sm:pr-4 sm:pl-40">
        <Title
          level={2}
          style={{
            fontFamily: 'var(--font-baloo-2)',
            color: '#f28c38',
            fontWeight: 700,
            marginBottom: 0,
          }}
          className="title-xl"
        >
          ĐÓI BỤNG<span style={{ color: '#FFE001', marginLeft: '10px' }}>?</span>
        </Title>
        <Title
          level={4}
          style={{
            fontFamily: 'var(--font-baloo-2)',
            color: '#f28c38',
            fontWeight: 600,
            marginBottom: '2px',
          }}
          className="title-2xl"
        >
          Lên <span style={{ color: '#FFE001' }}>Map</span>,{' '}
          <span style={{ color: '#FFE001' }}>Măm</span> vật ngay thôi
        </Title>
        <Paragraph
          style={{
            fontFamily: 'var(--font-baloo-2)',
            color: '#171717',
            fontWeight: 400,
            marginBottom: 0,
          }}
          className="text-lg sm:text-xl"
        >
          Với mong muốn xây dựng hệ sinh thái ăn uống, giúp mọi người khám phá và kết nối với các quán ăn, chỗ tụng, Mầm Map được ra đời nhằm 1 ứng dụng tìm kiếm đồ ăn thông minh, giúp bạn khám phá quán ăn theo nhu cầu của bạn.
        </Paragraph>
      </div>
      {/* Phần ảnh bên phải */}
      <div className="w-full sm:w-1/2 flex justify-center sm:justify-end p-2">
        <div className="relative w-[600px] h-[500px] overflow-hidden">
          <Image
            src="/images/img-component1.png"
            alt="Food image"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Component1;