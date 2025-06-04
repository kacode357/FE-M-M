'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Select } from 'antd';
import { CreateUserApi, CreateMerchantApi } from '@/services/user.services';

const { Option } = Select;

interface CreateUserProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'User' | 'Merchant'>('User');

  const handleSubmit = async (values: {
    userName: string;
    email: string;
    fullName: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const payload = {
        userName: values.userName,
        email: values.email,
        fullName: values.fullName,
        password: values.password,
      };
      const api = role === 'User' ? CreateUserApi : CreateMerchantApi;
      await api(payload);
      message.success(`${role} created successfully`);
      form.resetFields();
      setRole('User'); // Reset role to default
      onSuccess();
      onClose();
    } catch (error) {
      message.error(`Error creating ${role.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create User or Merchant"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select
            value={role}
            onChange={(value: 'User' | 'Merchant') => setRole(value)}
            placeholder="Select role"
          >
            <Option value="User">User</Option>
            <Option value="Merchant">Merchant</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="userName"
          label="Username"
          rules={[{ required: true, message: 'Please enter username' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter full name' }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUser;