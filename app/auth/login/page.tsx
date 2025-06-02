'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { LoginUserApi, GetCurrentUserApi } from '@/services/user.services';
import { AuthContext } from '@/contexts/AuthContext';

const { Title } = Typography;

const LoginPage = () => {
  const { setAuthData } = useContext(AuthContext);
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      // Call API to authenticate user
      const loginResponse = await LoginUserApi({
        userName: values.username,
        password: values.password,
      });

      if (loginResponse.accessToken && loginResponse.refreshToken) {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', loginResponse.accessToken);
        localStorage.setItem('refreshToken', loginResponse.refreshToken);

        // Fetch current user data
        const userResponse = await GetCurrentUserApi();

        // Store user data and tokens in AuthContext
        const authData = {
          accessToken: loginResponse.accessToken,
          refreshToken: loginResponse.refreshToken,
          user: {
            id: userResponse.id,
            fullname: userResponse.fullname,
            email: userResponse.email,
            roles: userResponse.roles,
          },
        };
        setAuthData(authData);

          router.push('/admin');
      
      }
    } catch (error) {}
  };

  const testNotification = () => {
    notification.info({
      message: 'Test Notification',
      description: 'This is a test to confirm notifications are working!',
      duration: 3,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-10 shadow-lg">
        <Title level={2} className="mb-8 text-center text-3xl font-bold text-gray-800">
          Welcome Back
        </Title>
        <Form name="login_form" layout="vertical" onFinish={onFinish} className="space-y-6">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Enter your username" className="h-12 rounded-lg" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Enter your password" className="h-12 rounded-lg" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="h-12 rounded-lg bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Log In
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              block
              onClick={testNotification}
              className="h-12 rounded-lg bg-gray-200 text-gray-800 transition-colors duration-200 hover:bg-gray-300"
            >
              Test Notification
            </Button>
          </Form.Item>
          <Form.Item className="text-center">
            <Link href="/" className="text-blue-600 transition-colors duration-200 hover:text-blue-800">
              Back to Home
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;