import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { deleteTaste } from '@/services/taste.services';

interface DeleteTasteProps {
  visible: boolean;
  tasteId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteTaste: React.FC<DeleteTasteProps> = ({ visible, tasteId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTaste(tasteId);
      message.success('Xóa khẩu vị thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi xóa khẩu vị');
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
      <p>Bạn có chắc chắn muốn xóa khẩu vị này?</p>
    </Modal>
  );
};

export default DeleteTaste;