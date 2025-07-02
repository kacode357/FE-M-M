'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Tag, Space, Modal, Image, Descriptions, Spin } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import { EyeOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { searchSnackPlaces } from '@/services/snack-places.services';
import type { TableProps } from 'antd';

// --- INTERFACE DỮ LIỆU (Giữ nguyên, đã chuẩn) ---
interface SnackPlaceAttribute {
  tasteId?: string;
  tasteName?: string;
  dietId?: string;
  dietName?: string;
  foodTypeId?: string;
  foodTypeName?: string;
}

interface SnackPlaceDetail {
  snackPlaceId: string;
  placeName: string;
  ownerName: string;
  address: string;
  email: string;
  phoneNumber: string;
  description: string;
  openingHour: string;
  averagePrice: number;
  image: string;
  mainDish: string;
  status: boolean;
  businessModelName:string;
  attributes: {
    tastes: SnackPlaceAttribute[];
    diets: SnackPlaceAttribute[];
    foodTypes: SnackPlaceAttribute[];
  };
  premiumPackage: {
    packageName: string;
    purchaseDate: string;
    isActive: boolean;
  } | null;
}
// --- KIỂU DỮ LIỆU CHO PHÂN TRANG (Lấy từ Ant Design) ---
interface TablePagination extends TablePaginationConfig {
    current: number;
    pageSize: number;
    total: number;
}


const SnackPlaceManagement: React.FC = () => {
  const [snackPlaces, setSnackPlaces] = useState<SnackPlaceDetail[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [searchText, setSearchText] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // --- STATE MỚI ĐỂ QUẢN LÝ PHÂN TRANG ---
  const [pagination, setPagination] = useState<TablePagination>({
    current: 1,
    pageSize: 5, // Mặc định 10 quán mỗi trang
    total: 0,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSnackPlace, setSelectedSnackPlace] = useState<SnackPlaceDetail | null>(null);

  // --- HÀM GỌI API, GIỜ SẼ LẤY THAM SỐ PHÂN TRANG ---
  const fetchSnackPlaces = async (keyword: string, page: number, pageSize: number) => {
    setLoading(true);
    try {
      const params = {
        pageNum: page,
        pageSize: pageSize,
        searchKeyword: keyword,
        status: true,
      };
      const response = await searchSnackPlaces(params);
      
      if (response && response.pageData) {
        setSnackPlaces(response.pageData);
        // Cập nhật tổng số item từ API để phân trang cho đúng
        setPagination(prev => ({ ...prev, total: response.pageInfo.total }));
      } else {
        setSnackPlaces([]);
        setPagination(prev => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách quán:', error);
      setSnackPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect sẽ chạy lại khi keyword hoặc trang thay đổi
  useEffect(() => {
    fetchSnackPlaces(searchKeyword, pagination.current, pagination.pageSize);
  }, [searchKeyword, pagination.current, pagination.pageSize]);

  // --- HÀM XỬ LÝ KHI THAY ĐỔI TRANG HOẶC PAGE SIZE ---
  const handleTableChange: TableProps<SnackPlaceDetail>['onChange'] = (newPagination) => {
    setPagination({
        current: newPagination.current || 1,
        pageSize: newPagination.pageSize || 5,
        total: newPagination.total || 0,
    });
  };

  const handleSearch = () => {
    setSearchKeyword(searchText);
    // Khi tìm kiếm, quay về trang 1
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handleReset = () => {
    setSearchText('');
    setSearchKeyword('');
    setPagination(prev => ({ ...prev, current: 1 }));
  };
  
  const showDetailModal = (record: SnackPlaceDetail) => {
    setSelectedSnackPlace(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedSnackPlace(null);
  };
  
  // --- CỘT STT ĐÃ SỬA LẠI LOGIC VÀ BỎ 'ANY' ---
  const columns: TableProps<SnackPlaceDetail>['columns'] = [
    {
      title: 'STT',
      key: 'stt',
      width: '5%',
      // Logic STT mới: (trang hiện tại - 1) * số item mỗi trang + index + 1
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Tên Quán Ăn',
      dataIndex: 'placeName',
      key: 'placeName',
      width: '25%',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'}>{status ? 'Hoạt động' : 'Tạm đóng'}</Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '15%',
      // Bỏ 'any', record đã có kiểu SnackPlaceDetail
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => showDetailModal(record)}>
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Space>
           <Input
            placeholder="Tìm kiếm quán ăn..."
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
        dataSource={snackPlaces}
        loading={loading}
        rowKey="snackPlaceId"
        bordered
        pagination={pagination} // Gắn state phân trang vào bảng
        onChange={handleTableChange} // Gắn hàm xử lý thay đổi trang
      />

      <Modal
        title={<span className="text-xl font-semibold">Chi tiết Quán Ăn</span>}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[ <Button key="close" onClick={handleModalClose}>Đóng</Button> ]}
        width={800}
      >
        {selectedSnackPlace ? (
          <Descriptions bordered column={2} size="small">
            {/* Phần Descriptions giữ nguyên, không có 'any' */}
            <Descriptions.Item label="Hình ảnh" span={2}>
              <Image width={200} src={selectedSnackPlace.image} alt={selectedSnackPlace.placeName} />
            </Descriptions.Item>
            <Descriptions.Item label="Tên quán">{selectedSnackPlace.placeName}</Descriptions.Item>
            <Descriptions.Item label="Tên chủ sở hữu">{selectedSnackPlace.ownerName}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" span={2}>{selectedSnackPlace.address}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedSnackPlace.email}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{selectedSnackPlace.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>{selectedSnackPlace.description}</Descriptions.Item>
            <Descriptions.Item label="Giờ mở cửa">{selectedSnackPlace.openingHour}</Descriptions.Item>
            <Descriptions.Item label="Giá trung bình">{selectedSnackPlace.averagePrice.toLocaleString('vi-VN')} VNĐ</Descriptions.Item>
            <Descriptions.Item label="Món chính">{selectedSnackPlace.mainDish}</Descriptions.Item>
            <Descriptions.Item label="Mô hình KD">{selectedSnackPlace.businessModelName}</Descriptions.Item>
            <Descriptions.Item label="Khẩu vị" span={2}>
              {selectedSnackPlace.attributes.tastes.map(t => <Tag key={t.tasteId} color="blue">{t.tasteName}</Tag>)}
            </Descriptions.Item>
            <Descriptions.Item label="Chế độ ăn" span={2}>
              {selectedSnackPlace.attributes.diets.map(d => <Tag key={d.dietId} color="purple">{d.dietName}</Tag>)}
            </Descriptions.Item>
            <Descriptions.Item label="Loại món ăn" span={2}>
              {selectedSnackPlace.attributes.foodTypes.map(f => <Tag key={f.foodTypeId} color="green">{f.foodTypeName}</Tag>)}
            </Descriptions.Item>
             <Descriptions.Item label="Gói Premium">
                {selectedSnackPlace.premiumPackage ? (
                    <Tag color={selectedSnackPlace.premiumPackage.isActive ? 'gold' : 'default'}>
                        {selectedSnackPlace.premiumPackage.packageName}
                    </Tag>
                ) : 'Không có'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đăng ký gói">
                {selectedSnackPlace.premiumPackage ? new Date(selectedSnackPlace.premiumPackage.purchaseDate).toLocaleDateString('vi-VN') : 'N/A'}
            </Descriptions.Item>
          </Descriptions>
        ) : (
           <div className="flex justify-center items-center h-48"><Spin size="large" /></div>
        )}
      </Modal>
    </div>
  );
};

export default SnackPlaceManagement;