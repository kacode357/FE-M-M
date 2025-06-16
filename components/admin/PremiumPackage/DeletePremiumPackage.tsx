import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { deletePremiumPackage } from '@/services/premiumPackage.services';

interface DeletePremiumPackageProps {
  visible: boolean;
  packageId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DeletePremiumPackage: React.FC<DeletePremiumPackageProps> = ({ visible, packageId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePremiumPackage(packageId);
      message.success('Xóa gói premium thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi xóa gói premium');
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
      <p>Bạn có chắc chắn muốn xóa gói premium này?</p>
    </Modal>
  );
};

export default DeletePremiumPackage;