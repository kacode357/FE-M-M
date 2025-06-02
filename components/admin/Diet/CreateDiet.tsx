import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { createDiet } from '@/services/diet.services';

interface CreateDietProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateDiet: React.FC<CreateDietProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      await createDiet({ name: values.name });
      message.success('Tạo chế độ ăn thành công');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo chế độ ăn');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo chế độ ăn"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Tên chế độ ăn"
          rules={[{ required: true, message: 'Vui lòng nhập tên chế độ ăn' }]}
        >
          <Input placeholder="Nhập tên chế độ ăn" />
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

export default CreateDiet;