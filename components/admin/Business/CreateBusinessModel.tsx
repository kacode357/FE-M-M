import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { CreateBusinessModelApi } from '@/services/business.services';

interface CreateBusinessModelProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateBusinessModel: React.FC<CreateBusinessModelProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      await CreateBusinessModelApi({ name: values.name });
      message.success('Tạo mô hình kinh doanh thành công');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo mô hình kinh doanh');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo mô hình kinh doanh"
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBusinessModel;