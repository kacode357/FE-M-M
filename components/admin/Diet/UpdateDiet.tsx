import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { getDietById, updateDiet } from '@/services/diet.services';

interface UpdateDietProps {
  visible: boolean;
  dietId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateDiet: React.FC<UpdateDietProps> = ({ visible, dietId, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && dietId) {
      const fetchDiet = async () => {
        try {
          const response = await getDietById(dietId);
          form.setFieldsValue({ name: response.name });
        } catch (error) {
          message.error('Lỗi khi lấy thông tin chế độ ăn');
        }
      };
      fetchDiet();
    }
  }, [visible, dietId, form]);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      await updateDiet({ id: dietId, name: values.name });
      message.success('Cập nhật chế độ ăn thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi cập nhật chế độ ăn');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật chế độ ăn"
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateDiet;