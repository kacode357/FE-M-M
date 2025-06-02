import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { getFoodTypeById, updateFoodType } from '@/services/foodtype.services';

interface UpdateFoodTypeProps {
  visible: boolean;
  foodTypeId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateFoodType: React.FC<UpdateFoodTypeProps> = ({ visible, foodTypeId, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && foodTypeId) {
      const fetchFoodType = async () => {
        try {
          const response = await getFoodTypeById(foodTypeId);
          form.setFieldsValue({ name: response.name });
        } catch (error) {
          message.error('Lỗi khi lấy thông tin loại món ăn');
        }
      };
      fetchFoodType();
    }
  }, [visible, foodTypeId, form]);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      await updateFoodType({ id: foodTypeId, name: values.name });
      message.success('Cập nhật loại món ăn thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi cập nhật loại món ăn');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật loại món ăn"
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateFoodType;