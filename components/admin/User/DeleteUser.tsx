'use client';

import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';

interface DeleteUserProps {
  visible: boolean;
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ visible, userId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Simulate a delete operation (no API call)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      message.success('User deleted successfully');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Confirm Deletion"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger loading={loading} onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this user?</p>
    </Modal>
  );
};

export default DeleteUser;