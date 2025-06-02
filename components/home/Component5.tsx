'use client';

import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import { FaGooglePlay, FaAppStore } from 'react-icons/fa';
import '@/styles/component5.css';

const { Title, Paragraph } = Typography;

const Component5: React.FC = () => {
  return (
    <div className="py-6 px-4 sm:py-8 sm:px-8 bg-white ">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 pl-8">
        {/* Bên trái: Tiêu đề, mô tả, nút tải */}
        <div className="w-full sm:w-1/2">
          <Title
            level={3}
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#f28c38',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
            className="component5-title"
          >
            TẢI ỨNG DỤNG
          </Title>
          <Paragraph
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#171717',
              fontWeight: 400,
              marginBottom: '1.5rem',
            }}
            className="component5-paragraph"
          >
            Tìm quán ăn vặt xịn xò? Để Măm Map lo. Tải app Măm Map ngay hôm nay – bản đồ ăn vặt cho dân sành ăn!
          </Paragraph>
          {/* Nút tải app */}
          <div className="flex justify-center gap-4">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="download-button flex items-center py-2 px-4 rounded-lg transition"
            >
              <FaGooglePlay size={24} className="mr-3" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm">Get It On</span>
                <span className="text-sm sm:text-base">Google Play</span>
              </div>
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="download-button flex items-center py-2 px-4 rounded-lg transition"
            >
              <FaAppStore size={24} className="mr-3" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm">Download on the</span>
                <span className="text-sm sm:text-base">App Store</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bên phải: Hình ảnh */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <div className="relative w-[200px] h-[200px] sm:w-[400px] sm:h-[400px]">
            <Image
              src="/images/img-component5.png"
              alt="Tải App Mầm Map"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component5;