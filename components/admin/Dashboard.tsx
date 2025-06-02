'use client';

import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={3}>Dashboard</Title>
      <Paragraph>Welcome to the Admin Dashboard. Here you can view key metrics and manage your application.</Paragraph>
    </div>
  );
};

export default Dashboard;