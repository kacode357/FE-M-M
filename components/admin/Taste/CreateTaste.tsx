import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { createTaste } from '@/services/taste.services';

interface CreateTasteProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateTaste: React.FC<CreateTasteProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      await createTaste({ name: values.name });
      message.success('Tạo khẩu vị thành công');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo khẩu vị');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo khẩu vị"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Tên khẩu vị"
          rules={[{ required: true, message: 'Vui lòng nhập tên khẩu vị' }]}
        >
          <Input placeholder="Nhập tên khẩu vị" />
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

export default CreateTaste;