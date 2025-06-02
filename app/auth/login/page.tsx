'use client';

import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title } = Typography;

const LoginPage = () => {
  const onFinish = (values: { email: string; password: string }) => {
    console.log('Login values:', values);
    localStorage.setItem('authToken', '1');
    console.log('Token stored: 1');
    window.location.href = '/admin';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-10">
        <Title level={2} className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </Title>
        <Form
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-200"
            >
              Log In
            </Button>
          </Form.Item>

          <Form.Item className="text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
              Back to Home
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;