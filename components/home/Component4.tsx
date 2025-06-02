'use client';

import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import '@/styles/component4.css';

const { Title, Paragraph } = Typography;

const Component4: React.FC = () => {
  return (
    <div className="py-6 px-4 sm:py-8 sm:px-8 " style={{ backgroundColor: '#fff5e7' }}>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-8 pl-8 pt-7">
        {/* Bên trái: Tiêu đề */}
        <div className="w-full sm:w-1/2">
          <Title
            level={3}
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#FFE001',
              fontWeight: 500,
              fontSize: '40px',
              marginBottom: 0,
            }}
          >
            Về chúng tôi
          </Title>
          <Title
            level={4}
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#FF9500',
              fontWeight: 'bold',
              fontSize: '40px',
              lineHeight: '1.2',
            }}
          >
            Tầm nhìn và sứ mệnh của Măm Map
          </Title>
        </div>

        {/* Bên phải: Tầm nhìn + Sứ mệnh */}
        <div className="w-full sm:w-1/2 flex flex-col gap-8">
          {/* Tầm nhìn */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] mr-4">
                <Image
                  src="/images/icon-tamnhin.png"
                  alt="Tầm nhìn"
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
                  marginBottom: 0,
                }}
                className="component4-title"
              >
                Tầm nhìn
              </Title>
            </div>
            <Paragraph
              style={{
                fontFamily: 'var(--font-baloo-2)',
                color: '#171717',
                fontWeight: 400,
              }}
              className="component4-paragraph"
            >
              Xây dựng hệ sinh thái ẩm thực đường phố, giúp mọi người khám phá & kết nối với những món ăn vặt ngon nhất.
            </Paragraph>
          </div>

          {/* Sứ mệnh */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] mr-4">
                <Image
                  src="/images/icon-sumenh.png"
                  alt="Sứ mệnh"
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
                  marginBottom: 0,
                }}
                className="component4-title"
              >
                Sứ mệnh
              </Title>
            </div>
            <Paragraph
              style={{
                fontFamily: 'var(--font-baloo-2)',
                color: '#171717',
                fontWeight: 400,
              }}
              className="component4-paragraph"
            >
              Kết nối người yêu ẩm thực với những quán ăn vặt ngon nhất, thông qua công nghệ AI & cộng đồng review đáng tin cậy. Hỗ trợ các quán ăn vặt nhỏ lẻ tăng trưởng, giúp họ tiếp cận khách hàng mới thông qua review chân thực và quảng bá thông minh.
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component4;