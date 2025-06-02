import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { DeleteBusinessModelApi } from '@/services/business.services';

interface DeleteBusinessModelProps {
  visible: boolean;
  businessId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteBusinessModel: React.FC<DeleteBusinessModelProps> = ({ visible, businessId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await DeleteBusinessModelApi(businessId);
      message.success('Xóa mô hình kinh doanh thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi xóa mô hình kinh doanh');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Xác nhận xóa"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="delete" type="primary" danger loading={loading} onClick={handleDelete}>
          Xóa
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa mô hình kinh doanh này?</p>
    </Modal>
  );
};

export default DeleteBusinessModel;