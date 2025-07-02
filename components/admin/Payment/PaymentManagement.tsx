'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Tag, Space } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { searchPayments } from '@/services/payment.services';

// --- INTERFACE ĐÃ CẬP NHẬT CHO KHỚP VỚI API THẬT ---
interface Payment {
  id: string; // Đổi từ paymentId
  userId: string; // Đổi từ userName
  premiumPackageName: string;
  amount: number;
  paymentCode: string;
  paymentStatus: boolean; // Đổi từ status string
  createdAt: string; // Đổi từ paymentDate
}

interface TablePagination extends TablePaginationConfig {
    current: number;
    pageSize: number;
    total: number;
}

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const [pagination, setPagination] = useState<TablePagination>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  // --- HÀM FETCH ĐÃ BỎ HẾT DATA GIẢ ---
  const fetchPayments = async (keyword: string, page: number, pageSize: number) => {
    setLoading(true);
    try {
      const params = {
        paymentCode: keyword,
        pageNum: page,
        pageSize: pageSize,
      };
      const response = await searchPayments(params);
      
      // Lấy data và pageInfo thật từ response API
      if (response && response.pageData) {
        setPayments(response.pageData);
        setPagination(prev => ({ ...prev, total: response.pageInfo.total }));
      } else {
        // Nếu API không trả về gì thì set mảng rỗng
        setPayments([]);
        setPagination(prev => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      console.error('Lỗi khi tải lịch sử giao dịch:', error);
      setPayments([]); // Nếu có lỗi cũng set mảng rỗng
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(searchKeyword, pagination.current, pagination.pageSize);
  }, [searchKeyword, pagination.current, pagination.pageSize]);

  const handleTableChange: TableProps<Payment>['onChange'] = (newPagination) => {
    setPagination(prev => ({
        ...prev,
        current: newPagination.current || 1,
        pageSize: newPagination.pageSize || 5,
    }));
  };

  const handleSearch = () => {
    setSearchKeyword(searchText);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handleReset = () => {
    setSearchText('');
    setSearchKeyword('');
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // --- CÁC CỘT TRONG BẢNG ĐÃ ĐƯỢC SỬA LẠI CHO ĐÚNG ---
  const columns: TableProps<Payment>['columns'] = [
    {
      title: 'STT',
      key: 'stt',
      width: '5%',
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Mã Giao Dịch',
      dataIndex: 'paymentCode',
      key: 'paymentCode',
    },
    {
      title: 'Gói Premium',
      dataIndex: 'premiumPackageName',
      key: 'premiumPackageName',
    },
    {
      title: 'Số Tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: 'Thời Gian Tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString('vi-VN'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: boolean) => {
        // Dùng boolean để quyết định màu và text
        const color = status ? 'green' : 'red';
        const text = status ? 'Thành công' : 'Thất bại';
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div>
    
      <div className="flex justify-between mb-4">
        <Space>
           <Input
            placeholder="Tìm theo mã giao dịch..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            onPressEnter={handleSearch}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Đặt lại
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={payments}
        loading={loading}
        rowKey="id" // Đổi rowKey thành "id" cho khớp với API
        bordered
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default PaymentManagement;