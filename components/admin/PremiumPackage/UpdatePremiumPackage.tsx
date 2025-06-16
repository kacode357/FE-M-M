import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, InputNumber } from 'antd';
import { getPremiumPackageById, updatePremiumPackage } from '@/services/premiumPackage.services';

interface UpdatePremiumPackageProps {
  visible: boolean;
  packageId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdatePremiumPackage: React.FC<UpdatePremiumPackageProps> = ({ visible, packageId, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && packageId) {
      const fetchPackage = async () => {
        try {
          const response = await getPremiumPackageById(packageId);
          form.setFieldsValue({
            name: response.name,
            price: response.price,
            descriptions: response.descriptions.join(', '),
          });
        } catch (error) {
          message.error('Lỗi khi lấy thông tin gói premium');
        }
      };
      fetchPackage();
    }
  }, [visible, packageId, form]);

  const handleSubmit = async (values: { name: string; price: number; descriptions: string }) => {
    setLoading(true);
    try {
      await updatePremiumPackage(packageId, {
        name: values.name,
        price: values.price,
        descriptions: values.descriptions.split(',').map((desc) => desc.trim()).filter(Boolean),
      });
      message.success('Cập nhật gói premium thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi cập nhật gói premium');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật gói premium"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Tên gói"
          rules={[{ required: true, message: 'Vui lòng nhập tên gói' }]}
        >
          <Input placeholder="Nhập tên gói" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá (VND)"
          rules={[{ required: true, message: 'Vui lòng nhập giá' }, { type: 'number', min: 0, message: 'Giá phải lớn hơn hoặc bằng 0' }]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Nhập giá" />
        </Form.Item>
        <Form.Item
          name="descriptions"
          label="Mô tả (ngăn cách bởi dấu phẩy)"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea placeholder="Nhập các mô tả, ví dụ: Tính năng 1, Tính năng 2" />
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

export default UpdatePremiumPackage;