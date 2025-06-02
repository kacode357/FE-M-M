import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { GetBusinessModelByIdApi, UpdateBusinessModelApi } from '@/services/business.services';

interface UpdateBusinessModelProps {
  visible: boolean;
  businessId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateBusinessModel: React.FC<UpdateBusinessModelProps> = ({ visible, businessId, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && businessId) {
      const fetchBusinessModel = async () => {
        try {
          const response = await GetBusinessModelByIdApi(businessId);
          console.log('Fetched Business Model:', response);
          form.setFieldsValue({ name: response.name });
        } catch (error) {
          message.error('Lỗi khi lấy thông tin mô hình kinh doanh');
        }
      };
      fetchBusinessModel();
    }
  }, [visible, businessId, form]);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      await UpdateBusinessModelApi({ id: businessId, name: values.name });
      message.success('Cập nhật mô hình kinh doanh thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi cập nhật mô hình kinh doanh');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật mô hình kinh doanh"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Tên mô hình"
          rules={[{ required: true, message: 'Vui lòng nhập tên mô hình' }]}
        >
          <Input placeholder="Nhập tên mô hình" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBusinessModel;