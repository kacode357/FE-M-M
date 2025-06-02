import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { deleteFoodType } from '@/services/foodtype.services';

interface DeleteFoodTypeProps {
  visible: boolean;
  foodTypeId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteFoodType: React.FC<DeleteFoodTypeProps> = ({ visible, foodTypeId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteFoodType(foodTypeId);
      message.success('Xóa loại món ăn thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi xóa loại món ăn');
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
      <p>Bạn có chắc chắn muốn xóa loại món ăn này?</p>
    </Modal>
  );
};

export default DeleteFoodType;