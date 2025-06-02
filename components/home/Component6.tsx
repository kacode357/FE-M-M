'use client';

import React from 'react';
import { Typography, Steps } from 'antd';
import Image from 'next/image';
import '@/styles/component6.css';

const { Title, Paragraph } = Typography;
const { Step } = Steps;

const Component6: React.FC = () => {
  return (
    <div className="py-6 px-4 sm:py-8 sm:px-8 bg-white rounded-lg m-2 sm:m-4">
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
        className="component6-title"
      >
        Dùng Măm Map sao cho đúng?
      </Title>

      {/* Steps nằm ngang, mỗi bước xếp dọc */}
      <Steps
        current={2}
        className="custom-steps"
        direction="vertical"
        responsive={true}
      >
        {/* Bước 1: Tìm kiếm quán yêu thích */}
        <Step
          title={
            <div className="step-content">
              <div className="step-image">
                <Image
                  src="/images/timkiemquanyeuthich.png"
                  alt="Tìm kiếm quán yêu thích"
                  width={80}
                  height={80}
                  className="object-contain"
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
                className="component6-step-title"
              >
                Tìm kiếm quán yêu thích
              </Title>
              <Paragraph
                style={{
                  fontFamily: 'var(--font-baloo-2)',
                  color: '#171717',
                  fontWeight: 400,
                }}
                className="component6-step-description"
              >
                Không biết ăn gì? Măm Map giúp bạn tìm quán đúng gu chỉ trong vài chạm. Bộ lọc thông minh, cá nhân hóa 100% trải nghiệm ăn vặt của bạn.
              </Paragraph>
            </div>
          }
        />

        {/* Bước 2: Đánh giá */}
        <Step
          title={
            <div className="step-content">
              <div className="step-image">
                <Image
                  src="/images/danhgia.png"
                  alt="Đánh giá"
                  width={80}
                  height={80}
                  className="object-contain"
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
                className="component6-step-title"
              >
                Đánh giá
              </Title>
              <Paragraph
                style={{
                  fontFamily: 'var(--font-baloo-2)',
                  color: '#171717',
                  fontWeight: 400,
                }}
                className="component6-step-description"
              >
                Không chỉ chấm điểm “ngon – dở”, Măm Map có bộ tiêu chí chuyên biệt cho món ăn vặt. Mỗi review đều là thật, mang chất riêng, giúp bạn tiết kiệm thời gian trong việc chọn quán.
              </Paragraph>
            </div>
          }
        />

        {/* Bước 3: Tham gia cộng đồng */}
        <Step
          title={
            <div className="step-content">
              <div className="step-image">
                <Image
                  src="/images/thamgiacongdong.png"
                  alt="Tham gia cộng đồng"
                  width={80}
                  height={80}
                  className="object-contain"
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
                className="component6-step-title"
              >
                Tham gia cộng đồng
              </Title>
              <Paragraph
                style={{
                  fontFamily: 'var(--font-baloo-2)',
                  color: '#171717',
                  fontWeight: 400,
                }}
                className="component6-step-description"
              >
                Góp mặt vào cộng đồng Măm-er để chia sẻ review chân thật, đọc các “món tủ” của các tín đồ ăn vặt, cùng nhau khám phá bản đồ ăn vặt thành phố.
              </Paragraph>
            </div>
          }
        />
      </Steps>
    </div>
  );
};

export default Component6;