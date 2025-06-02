import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, message } from 'antd';
import { SearchOutlined, EditTwoTone, DeleteTwoTone, ReloadOutlined } from '@ant-design/icons';
import { searchFoodType } from '@/services/foodtype.services';
import CreateFoodType from './CreateFoodType';
import UpdateFoodType from './UpdateFoodType';
import DeleteFoodType from './DeleteFoodType';
import type { TablePaginationConfig } from 'antd/es/table';

interface FoodType {
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
  pageData: FoodType[];
  pageInfo: PageInfo;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

const FoodTypeManagement: React.FC = () => {
  const [data, setData] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedFoodTypeId, setSelectedFoodTypeId] = useState<string | null>(null);

  const fetchData = async (pageNum = 1, pageSize = 10, searchKeyword = '') => {
    setLoading(true);
    try {
      const response: ApiResponse = await searchFoodType({ pageNum, pageSize, searchKeyword, status: true });
      setData(response.pageData);
      setPagination({
        current: response.pageInfo.pageNum,
        pageSize: response.pageInfo.pageSize,
        total: response.pageInfo.total,
      });
    } catch (error) {
      message.error('Lỗi khi lấy danh sách loại món ăn');
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
      title: 'Tên loại món ăn',
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
      render: (_: unknown, record: FoodType) => (
        <Space>
          <Button
            type="link"
            icon={<EditTwoTone />}
            onClick={() => {
              setSelectedFoodTypeId(record.id);
              setUpdateVisible(true);
            }}
          />
          <Button
            type="link"
            danger
            icon={<DeleteTwoTone twoToneColor="#ff4d4f" />}
            onClick={() => {
              setSelectedFoodTypeId(record.id);
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
            placeholder="Tìm kiếm loại món ăn"
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
      <CreateFoodType
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        onSuccess={handleSuccess}
      />
      {selectedFoodTypeId && (
        <>
          <UpdateFoodType
            visible={updateVisible}
            foodTypeId={selectedFoodTypeId}
            onClose={() => {
              setUpdateVisible(false);
              setSelectedFoodTypeId(null);
            }}
            onSuccess={handleSuccess}
          />
          <DeleteFoodType
            visible={deleteVisible}
            foodTypeId={selectedFoodTypeId}
            onClose={() => {
              setDeleteVisible(false);
              setSelectedFoodTypeId(null);
            }}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </div>
  );
};

export default FoodTypeManagement;