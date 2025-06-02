'use client';

import React from 'react';
import { Typography, Card } from 'antd';
import Image from 'next/image';
import '@/styles/component7.css';

const { Title, Paragraph } = Typography;

const teamMembers = [
  {
    avatar: '/images/avatar1.png',
    name: 'Nguyễn Văn A',
    role: 'Founder & CEO',
    description: 'Người sáng lập Măm Map, đam mê ẩm thực đường phố và công nghệ.',
  },
  {
    avatar: '/images/avatar2.png',
    name: 'Trần Thị B',
    role: 'CTO',
    description: 'Chuyên gia công nghệ, đảm bảo Măm Map luôn mượt mà và thông minh.',
  },
  {
    avatar: '/images/avatar3.png',
    name: 'Lê Văn C',
    role: 'Marketing Lead',
    description: 'Người lan tỏa tinh thần Măm Map đến cộng đồng yêu ẩm thực.',
  },
  {
    avatar: '/images/avatar4.png',
    name: 'Phạm Thị D',
    role: 'Designer',
    description: 'Người tạo nên giao diện đẹp mắt và thân thiện cho Măm Map.',
  },
  {
    avatar: '/images/avatar5.png',
    name: 'Hoàng Văn E',
    role: 'Product Manager',
    description: 'Người định hình sản phẩm Măm Map, luôn lắng nghe ý kiến cộng đồng.',
  },
  {
    avatar: '/images/avatar6.png',
    name: 'Đỗ Thị F',
    role: 'Community Manager',
    description: 'Người kết nối cộng đồng Măm-er, xây dựng không gian yêu ẩm thực.',
  },
];

const Component7: React.FC = () => {
  return (
    <div className="py-6 px-4 sm:py-8 sm:px-8 bg-white rounded-lg m-2 sm:m-4">
      {/* Tiêu đề và mô tả */}
      <div className="header-section">
        <div className="header-left">
          <Title
            level={3}
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#f28c38',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
            className="component7-title"
          >
            ĐỘI NGŨ ĐỒNG HÀNH CÙNG MĂM MAP
          </Title>
        </div>
        <div className="header-right">
          <Paragraph
            style={{
              fontFamily: 'var(--font-baloo-2)',
              color: '#171717',
              fontWeight: 400,
            }}
            className="text-sm sm:text-base component7-description"
          >
            Đội ngũ Măm Map là “bản đồ hương vị” kết hợp 6 mảnh ghép với cùng 1 đam mê, đưa các tín đồ ăn vặt đến với quán ngon chỉ sau vài cú chạm.
          </Paragraph>
        </div>
      </div>

      {/* Danh sách thành viên */}
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <Card key={index} className="team-card">
            <div className="team-member">
              <div className="team-avatar">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="object-cover"
                />
              </div>
              <Title
                level={4}
                style={{
                  fontFamily: 'var(--font-baloo-2)',
                  color: '#f28c38',
                  fontWeight: 600,
                  marginTop: '1rem',
                  marginBottom: '0.25rem',
                }}
                className="text-lg sm:text-xl"
              >
                {member.name}
              </Title>
              <Paragraph
                style={{
                  fontFamily: 'var(--font-baloo-2)',
                  color: '#f28c38',
                  fontWeight: 400,
                  marginBottom: '0.5rem',
                }}
                className="text-sm sm:text-base"
              >
                {member.role}
              </Paragraph>
              <Paragraph
                style={{
                  fontFamily: 'var(--font-baloo-2)',
                  color: '#171717',
                  fontWeight: 400,
                }}
                className="text-sm sm:text-base"
              >
                {member.description}
              </Paragraph>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Component7;