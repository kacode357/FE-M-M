'use client';

import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import '@/styles/component2.css'; // Import file CSS mới

const { Title, Paragraph } = Typography;

const Component2: React.FC = () => {
  return (
    <div className="py-6 px-4 sm:py-8 sm:px-8 bg-white ">
      {/* Tiêu đề chính */}
      <Title
        level={3}
        style={{
          fontFamily: 'var(--font-baloo-2)',
          color: '#f28c38',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '2rem',
        }}
        className="component2-title-main" // Sử dụng class mới
      >
        Măm Map có gì?
      </Title>

      {/* Bố cục 3 cột */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
        {/* Cột 1: Tìm kiếm thông minh */}
        <div className="flex flex-col items-center text-center w-full sm:w-1/3">
          <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mb-4">
            <Image
              src="/images/timkiemthongminh.png"
              alt="Tìm kiếm thông minh"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <Title
            level={4}
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#f28c38',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}
            className="component2-title" // Sử dụng class mới
          >
            Tìm kiếm thông minh
          </Title>
          <Paragraph
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#171717',
              fontWeight: 400,
            }}
            className="component2-paragraph" // Sử dụng class mới
          >
           Tìm quán ăn vặt dễ dàng với bộ lọc cá nhân hóa tích hợp công nghệ AI 
          </Paragraph>
        </div>

        {/* Cột 2: Cộng đồng ăn uống */}
        <div className="flex flex-col items-center text-center w-full sm:w-1/3">
          <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mb-4">
            <Image
              src="/images/congdonganvat.png"
              alt="Cộng đồng ăn uống"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <Title
            level={4}
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#f28c38',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}
            className="component2-title" // Sử dụng class mới
          >
            Cộng đồng ăn uống
          </Title>
          <Paragraph
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#171717',
              fontWeight: 400,
            }}
            className="component2-paragraph" // Sử dụng class mới
          >
            Review và đánh giá các quán ăn vặt theo một bộ tiêu chí riêng
          </Paragraph>
        </div>

        {/* Cột 3: Chia sẻ trải nghiệm */}
        <div className="flex flex-col items-center text-center w-full sm:w-1/3">
          <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mb-4">
            <Image
              src="/images/chiasetrainghiem.png"
              alt="Chia sẻ trải nghiệm"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <Title
            level={4}
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#f28c38',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}
            className="component2-title" // Sử dụng class mới
          >
            Chia sẻ trải nghiệm
          </Title>
          <Paragraph
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#171717',
              fontWeight: 400,
            }}
            className="component2-paragraph" // Sử dụng class mới
          >
            Review và đánh giá các quán ăn, tụ điểm yêu thích
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default Component2;