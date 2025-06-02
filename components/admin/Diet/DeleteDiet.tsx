import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { deleteDiet } from '@/services/diet.services';

interface DeleteDietProps {
  visible: boolean;
  dietId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteDiet: React.FC<DeleteDietProps> = ({ visible, dietId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDiet(dietId);
      message.success('Xóa chế độ ăn thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi xóa chế độ ăn');
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
      <p>Bạn có chắc chắn muốn xóa chế độ ăn này?</p>
    </Modal>
  );
};

export default DeleteDiet;