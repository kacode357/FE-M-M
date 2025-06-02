'use client';

import React from 'react';
import { Typography, Rate, Avatar } from 'antd';
import Image from 'next/image';
import '@/styles/component3.css';

const { Title, Paragraph } = Typography;

const Component3: React.FC = () => {
  return (
    <div className="py-6 px-4 sm:py-8 sm:px-8 bg-white">
      {/* Tiêu đề chính */}
      <Title
        level={3}
        style={{
          fontFamily: 'var(--font-baloo-2)',
          color: '#f28c38',
          fontWeight: 700,
          marginBottom: '2rem',
        }}
        className="component3-title-main"
      >
        Khách hàng nói gì?
      </Title>

      {/* Nội dung: Đánh giá + Hình ảnh */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Phần đánh giá bên trái */}
        <div className="w-full sm:w-1/2 ">
          <div className="flex items-start mb-4">
            <Avatar
              src="/images/avartar-component3.png"
              size={64}
              alt="Nguyễn Thanh Công"
              className="mr-4"
            />
            <div>
              <Title
                level={5}
                style={{
                  fontFamily: 'var(--font-baloo-2)',
                  color: '#f28c38',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                }}
                className="component3-title"
              >
                Nguyễn Thanh Công
              </Title>
              <Paragraph
                style={{
                  fontFamily: 'var(--font-baloo-2)',
                  color: '#171717',
                  fontWeight: 400,
                  marginBottom: '0.5rem',
                }}
                className="component3-paragraph-small"
              >
                Nhân viên văn phòng
              </Paragraph>
              <Rate disabled defaultValue={5} style={{ color: '#fadb14' }} />
            </div>
          </div>
          <Paragraph
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#171717',
              fontWeight: 400,
            }}
            className="component3-paragraph"
          >
            Tui là dân mê ăn uống chính hiệu, mà không tói tiệm ăn nào ăn cũng phải hỏi “ở
            đây có gì ăn không trợ”. Từ ngày có Mầm Map, cuộc đời tui bớt nhọc nhằn hơn,
            không cần phải hỏi, App gợi ý tòan món tui thích, review thì chân thực, nhìn là
            mê, search roẹt cái là có đường đi liền. Đi chấm là phải mở Mầm Map trước,
            không sợ đói bụng giữa đường nữa!
          </Paragraph>
        </div>

        {/* Hình ảnh bên phải */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <div className="relative w-[150px] h-[150px] sm:w-[400px] sm:h-[400px]">
            <Image
              src="/images/img-component3.png"
              alt="Customer review image"
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

export default Component3;