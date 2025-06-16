import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, message } from 'antd';
import { SearchOutlined, EditTwoTone, DeleteTwoTone, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { searchPremiumPackage } from '@/services/premiumPackage.services';
import CreatePremiumPackage from './CreatePremiumPackage';
import UpdatePremiumPackage from './UpdatePremiumPackage';
import DeletePremiumPackage from './DeletePremiumPackage';
import type { TablePaginationConfig } from 'antd/es/table';

interface PremiumPackage {
  id: string;
  name: string;
  price: number;
  descriptions: string[];
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
  pageData: PremiumPackage[];
  pageInfo?: PageInfo;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

const PremiumPackageManagement: React.FC = () => {
  const [data, setData] = useState<PremiumPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  const fetchData = async (pageNum = 1, pageSize = 10, searchKeyword = '') => {
    setLoading(true);
    try {
      const response: ApiResponse = await searchPremiumPackage({ pageNum, pageSize, searchKeyword, status: true });
      setData(response.pageData);
      console.log(response.pageData);
      setPagination({
        current: response.pageInfo?.pageNum || pageNum,
        pageSize: response.pageInfo?.pageSize || pageSize,
        total: response.pageInfo?.total || 0,
      });
    } catch (error) {
      message.error('Lỗi khi lấy danh sách gói premium');
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
      title: 'Tên gói',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number | undefined) =>
        price != null
          ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
          : 'N/A',
    },
    {
      title: 'Mô tả',
      dataIndex: 'descriptions',
      key: 'descriptions',
      render: (descriptions: string[]) => descriptions.join(', ') || 'Không có mô tả',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: PremiumPackage) => (
        <Space>
          <Button
            type="link"
            icon={<EditTwoTone />}
            onClick={() => {
              setSelectedPackageId(record.id);
              setUpdateVisible(true);
            }}
          />
          <Button
            type="link"
            danger
            icon={<DeleteTwoTone twoToneColor="#ff4d4f" />}
            onClick={() => {
              setSelectedPackageId(record.id);
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
            placeholder="Tìm kiếm gói premium"
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#f28c38', borderColor: '#f28c38' }}
          onClick={() => setCreateVisible(true)}
        >
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
      <CreatePremiumPackage
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        onSuccess={handleSuccess}
      />
      {selectedPackageId && (
        <>
          <UpdatePremiumPackage
            visible={updateVisible}
            packageId={selectedPackageId}
            onClose={() => {
              setUpdateVisible(false);
              setSelectedPackageId(null);
            }}
            onSuccess={handleSuccess}
          />
          <DeletePremiumPackage
            visible={deleteVisible}
            packageId={selectedPackageId}
            onClose={() => {
              setDeleteVisible(false);
              setSelectedPackageId(null);
            }}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </div>
  );
};

export default PremiumPackageManagement;