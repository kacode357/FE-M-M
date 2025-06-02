import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { createFoodType } from '@/services/foodtype.services';

interface CreateFoodTypeProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateFoodType: React.FC<CreateFoodTypeProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      await createFoodType({ name: values.name });
      message.success('Tạo loại món ăn thành công');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo loại món ăn');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo loại món ăn"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Tên loại món ăn"
          rules={[{ required: true, message: 'Vui lòng nhập tên loại món ăn' }]}
        >
          <Input placeholder="Nhập tên loại món ăn" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateFoodType;