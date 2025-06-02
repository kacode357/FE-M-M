'use client';

import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const UserManagement: React.FC = () => {
  return (
    <div>
      <Title level={3}>Quản lý User</Title>
      <Paragraph>Manage your users here. Add, edit, or delete user accounts as needed.</Paragraph>
    </div>
  );
};

export default UserManagement;