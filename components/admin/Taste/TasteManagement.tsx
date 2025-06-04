import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, message } from 'antd';
import { SearchOutlined, EditTwoTone, DeleteTwoTone, ReloadOutlined } from '@ant-design/icons';
import { searchTaste } from '@/services/taste.services';
import CreateTaste from './CreateTaste';
import UpdateTaste from './UpdateTaste';
import DeleteTaste from './DeleteTaste';
import type { TablePaginationConfig } from 'antd/es/table';

interface Taste {
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
  pageData: Taste[];
  pageInfo: PageInfo;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

const TasteManagement: React.FC = () => {
  const [data, setData] = useState<Taste[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedTasteId, setSelectedTasteId] = useState<string | null>(null);

  const fetchData = async (pageNum = 1, pageSize = 8, searchKeyword = '') => {
    setLoading(true);
    try {
      const response: ApiResponse = await searchTaste({ pageNum, pageSize, searchKeyword, status: true });
      setData(response.pageData);
      setPagination({
        current: response.pageInfo.pageNum,
        pageSize: response.pageInfo.pageSize,
        total: response.pageInfo.total,
      });
    } catch (error) {
      message.error('Lỗi khi lấy danh sách khẩu vị');
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
      title: 'Tên khẩu vị',
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
      render: (_: unknown, record: Taste) => (
        <Space>
          <Button
            type="link"
            icon={<EditTwoTone />}
            onClick={() => {
              setSelectedTasteId(record.id);
              setUpdateVisible(true);
            }}
          />
          <Button
            type="link"
            danger
            icon={<DeleteTwoTone twoToneColor="#ff4d4f" />}
            onClick={() => {
              setSelectedTasteId(record.id);
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
            placeholder="Tìm kiếm khẩu vị"
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
      <CreateTaste
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        onSuccess={handleSuccess}
      />
      {selectedTasteId && (
        <>
          <UpdateTaste
            visible={updateVisible}
            tasteId={selectedTasteId}
            onClose={() => {
              setUpdateVisible(false);
              setSelectedTasteId(null);
            }}
            onSuccess={handleSuccess}
          />
          <DeleteTaste
            visible={deleteVisible}
            tasteId={selectedTasteId}
            onClose={() => {
              setDeleteVisible(false);
              setSelectedTasteId(null);
            }}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </div>
  );
};

export default TasteManagement;