'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, DatePicker } from 'antd';
import { GetUserByIdApi, UpdateUserApi } from '@/services/user.services';
import moment from 'moment';

interface UpdateUserProps {
  visible: boolean;
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ visible, userId, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && userId) {
      const fetchUser = async () => {
        try {
          const response = await GetUserByIdApi(userId);
          form.setFieldsValue({
            phoneNumber: response.phoneNumber,
            fullname: response.fullname,
            image: response.image,
            dateOfBirth: response.dateOfBirth ? moment(response.dateOfBirth) : null,
          });
        } catch (error) {
          message.error('Error fetching user details');
        }
      };
      fetchUser();
    }
  }, [visible, userId, form]);

  const handleSubmit = async (values: { phoneNumber: string; fullname: string; image: string; dateOfBirth: moment.Moment }) => {
    setLoading(true);
    try {
      await UpdateUserApi({
        id: userId,
        phoneNumber: values.phoneNumber,
        fullname: values.fullname,
        image: values.image,
        dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
      });
      message.success('User updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Error updating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Update User"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter full name' }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select date of birth' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: 'Please enter image URL' }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUser;