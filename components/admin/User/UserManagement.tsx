'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Typography, Select } from 'antd';
import { EditTwoTone, DeleteTwoTone, ReloadOutlined } from '@ant-design/icons';
import { SearchUsersApi } from '@/services/user.services';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import type { TablePaginationConfig } from 'antd/es/table';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface User {
  id: string;
  userName: string;
  mail: string;
  phoneNumber: string | null;
  fullName: string;
  dob: string | null;
  status: boolean;
  image: string;
  roles: string[];
}

interface PageInfo {
  pageNum: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface ApiResponse {
  status: number;
  message: string;
  pageData: User[];
  pageInfo: PageInfo;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

const UserManagement: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchData = async (pageNum = 1, pageSize = 10, role = '') => {
    setLoading(true);
    try {
      const response: ApiResponse = await SearchUsersApi({
        searchKeyword: '',
        status: true,
        role,
        pageNum,
        pageSize,
      });
      setData(response.pageData);
      setPagination({
        current: response.pageInfo.pageNum,
        pageSize: response.pageInfo.pageSize,
        total: response.pageInfo.total,
      });
    } catch (error) {
      message.error('Error fetching user list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = (value: string | undefined) => {
    setSelectedRole(value);
    fetchData(1, pagination.pageSize, value || '');
  };

  const handleReset = () => {
    setSelectedRole(undefined);
    fetchData(1, pagination.pageSize, '');
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchData(newPagination.current || 1, newPagination.pageSize || 10, selectedRole || '');
  };

  const handleSuccess = () => {
    fetchData(pagination.current, pagination.pageSize, selectedRole || '');
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'mail',
      key: 'mail',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (phoneNumber: string | null) => phoneNumber || 'N/A',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob: string | null) => dob || 'N/A',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => roles.join(', ') || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (status ? 'Active' : 'Inactive'),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: unknown, record: User) => (
        <Space>
          <Button
            type="link"
            icon={<EditTwoTone />}
            onClick={() => {
              setSelectedUserId(record.id);
              setUpdateVisible(true);
            }}
          />
          <Button
            type="link"
            danger
            icon={<DeleteTwoTone twoToneColor="#ff4d4f" />}
            onClick={() => {
              setSelectedUserId(record.id);
              setDeleteVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>User Management</Title>
      <Paragraph>Manage your users here. Add, edit, or delete user accounts as needed.</Paragraph>
      <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Select
            placeholder="Filter by role"
            style={{ width: 150 }}
            value={selectedRole}
            onChange={handleRoleChange}
            allowClear
          >
            <Option value="User">User</Option>
            <Option value="Merchant">Merchant</Option>
          </Select>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Reset
          </Button>
        </Space>
        <Button type="primary" onClick={() => setCreateVisible(true)}>
          Create New
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <CreateUser
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        onSuccess={handleSuccess}
      />
      {selectedUserId && (
        <>
          <UpdateUser
            visible={updateVisible}
            userId={selectedUserId}
            onClose={() => {
              setUpdateVisible(false);
              setSelectedUserId(null);
            }}
            onSuccess={handleSuccess}
          />
          <DeleteUser
            visible={deleteVisible}
            userId={selectedUserId}
            onClose={() => {
              setDeleteVisible(false);
              setSelectedUserId(null);
            }}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </div>
  );
};

export default UserManagement;