import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, message } from 'antd';
import { SearchOutlined, EditTwoTone, DeleteTwoTone, ReloadOutlined } from '@ant-design/icons';
import { searchBusinessModels } from '@/services/business.services';
import CreateBusinessModel from './CreateBusinessModel';
import UpdateBusinessModel from './UpdateBusinessModel';
import DeleteBusinessModel from './DeleteBusinessModel';
import type { TablePaginationConfig } from 'antd/es/table';

interface BusinessModel {
  id: string;
  name: string;
  status: boolean;
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
  pageData: BusinessModel[];
  pageInfo: PageInfo;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

const BusinessModels: React.FC = () => {
  const [data, setData] = useState<BusinessModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  const fetchData = async (pageNum = 1, pageSize = 10, searchKeyword = '') => {
    setLoading(true);
    try {
      const response: ApiResponse = await searchBusinessModels({ pageNum, pageSize, searchKeyword, status: true });
      setData(response.pageData);
      setPagination({
        current: response.pageInfo.pageNum,
        pageSize: response.pageInfo.pageSize,
        total: response.pageInfo.total,
      });
    } catch (error) {
      message.error('Lỗi khi lấy danh sách mô hình kinh doanh');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    fetchData(1, pagination.pageSize, value);
  };

  const handleReset = () => {
    setSearchText('');
    fetchData(1, pagination.pageSize, '');
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchData(newPagination.current || 1, newPagination.pageSize || 10, searchText);
  };

  const handleSuccess = () => {
    fetchData(pagination.current, pagination.pageSize, searchText);
  };

  const columns = [
    {
      title: 'Tên mô hình',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (status ? 'Hoạt động' : 'Không hoạt động'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: BusinessModel) => (
        <Space>
          <Button
            type="link"
            icon={<EditTwoTone />}
            onClick={() => {
              setSelectedBusinessId(record.id);
              setUpdateVisible(true);
            }}
          />
          <Button
            type="link"
            danger
            icon={<DeleteTwoTone twoToneColor="#ff4d4f" />}
            onClick={() => {
              setSelectedBusinessId(record.id);
              setDeleteVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Input.Search
            placeholder="Tìm kiếm mô hình"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Đặt lại
          </Button>
        </Space>
        <Button type="primary" onClick={() => setCreateVisible(true)}>
          Tạo mới
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
      <CreateBusinessModel
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        onSuccess={handleSuccess}
      />
      {selectedBusinessId && (
        <>
          <UpdateBusinessModel
            visible={updateVisible}
            businessId={selectedBusinessId}
            onClose={() => {
              setUpdateVisible(false);
              setSelectedBusinessId(null);
            }}
            onSuccess={handleSuccess}
          />
          <DeleteBusinessModel
            visible={deleteVisible}
            businessId={selectedBusinessId}
            onClose={() => {
              setDeleteVisible(false);
              setSelectedBusinessId(null);
            }}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </div>
  );
};

export default BusinessModels;