import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { getTasteById, updateTaste } from '@/services/taste.services';

interface UpdateTasteProps {
  visible: boolean;
  tasteId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateTaste: React.FC<UpdateTasteProps> = ({ visible, tasteId, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && tasteId) {
      const fetchTaste = async () => {
        try {
          const response = await getTasteById(tasteId);
          form.setFieldsValue({ name: response.name });
        } catch (error) {
          message.error('Lỗi khi lấy thông tin khẩu vị');
        }
      };
      fetchTaste();
    }
  }, [visible, tasteId, form]);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      await updateTaste({ id: tasteId, name: values.name });
      message.success('Cập nhật khẩu vị thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi cập nhật khẩu vị');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật khẩu vị"
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTaste;