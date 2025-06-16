import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createPremiumPackage } from '@/services/premiumPackage.services';

interface CreatePremiumPackageProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreatePremiumPackage: React.FC<CreatePremiumPackageProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Initialize form with one empty feature input when modal opens
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        descriptions: [''],
      });
    }
  }, [visible, form]);

  const handleSubmit = async (values: { name: string; price: number; descriptions: string[] }) => {
    setLoading(true);
    try {
      await createPremiumPackage({
        name: values.name,
        price: values.price,
        descriptions: values.descriptions.filter(Boolean), // Remove empty strings
      });
      message.success('Tạo gói premium thành công');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo gói premium');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo gói premium"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
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
          rules={[
            { required: true, message: 'Vui lòng nhập giá' },
            { type: 'number', min: 0, message: 'Giá phải lớn hơn hoặc bằng 0' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Nhập giá" />
        </Form.Item>
        <Form.Item label="Tính năng">
          <Form.List
            name="descriptions"
            rules={[
              {
                validator: async (_, descriptions) => {
                  if (!descriptions || descriptions.length === 0 || descriptions.every((desc: string) => !desc)) {
                    return Promise.reject(new Error('Vui lòng nhập ít nhất một tính năng'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: 'Vui lòng nhập tính năng' }]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder={`Tính năng ${index + 1}`} />
                    </Form.Item>
                    {index > 0 && ( // Only show remove button for additional fields
                      <Button
                        type="link"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        style={{ color: '#ff4d4f' }}
                      />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add('')} // Add empty string for new field
                    block
                    icon={<PlusOutlined />}
                    style={{ marginBottom: 8 }}
                  >
                    Thêm tính năng
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={onClose} disabled={loading}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Tạo
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePremiumPackage;