'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Thêm icon CreditCardOutlined cho thanh toán
import { DashboardOutlined, UserOutlined, ShopOutlined, AppleOutlined, CoffeeOutlined, ForkOutlined, LeftOutlined, RightOutlined, DollarOutlined, BankOutlined, CreditCardOutlined, StarOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { AuthContext } from '@/contexts/AuthContext';
import Dashboard from '@/components/admin/Dashboard';
import UserManagement from '@/components/admin/User/UserManagement';
import BusinessModels from '@/components/admin/Business/BusinessModels';
import DietManagement from '@/components/admin/Diet/DietManagement';
import TasteManagement from '@/components/admin/Taste/TasteManagement';
import FoodTypeManagement from '@/components/admin/FoodType/FoodTypeManagement';
import PremiumPackageManagement from '@/components/admin/PremiumPackage/PremiumPackageManagement';
import SnackPlaceManagement from '@/components/admin/SnackPlace/SnackPlaceManagement';
// Import component Payment mới
import PaymentManagement from '@/components/admin/Payment/PaymentManagement';
import AppRatingManagement from '@/components/admin/AppRatingManagement';


interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  { key: 'dashboard', icon: <DashboardOutlined className="text-xl" />, label: 'Thống kê' },
  { key: 'users', icon: <UserOutlined className="text-xl" />, label: 'Người dùng' },
  { key: 'business', icon: <ShopOutlined className="text-xl" />, label: 'Mô hình kinh doanh' },
  { key: 'snackplace', icon: <BankOutlined className="text-xl" />, label: 'Quán ăn vặt' },
  { key: 'diet', icon: <AppleOutlined className="text-xl" />, label: 'Chế độ ăn' },
  { key: 'taste', icon: <CoffeeOutlined className="text-xl" />, label: 'Khẩu vị' },
  { key: 'foodtype', icon: <ForkOutlined className="text-xl" />, label: 'Loại món ăn' },
  { key: 'premium', icon: <DollarOutlined className="text-xl" />, label: 'Gói Premium' },
  { key: 'payment', icon: <CreditCardOutlined className="text-xl" />, label: 'Lịch sử giao dịch' },
   { key: 'apprating', icon: <StarOutlined className="text-xl" />, label: 'Đánh giá app' },
];

const AdminPage: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const { authData, setAuthData } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authData.accessToken) {
      router.push('/auth/login');
    }
  }, [authData, router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthData({ accessToken: null, refreshToken: null, user: null });
    router.push('/auth/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/logo-mm-final-2.png"
            alt="Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            Trang Quản Lý Admin
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#FF9500] hover:bg-[#E68A00] text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Đăng xuất
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-64' : 'w-16'
          }`}
        >
          <nav className="mt-4 flex flex-col h-full">
            <div className="flex-1">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.key)}
                  className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors ${
                    selectedKey === item.key ? 'bg-[#FFF7ED] border-l-4 border-[#FF9500] text-[#FF9500]' : ''
                  }`}
                >
                  <span className="flex-shrink-0 text-xl">
                    {item.icon}
                  </span>
                  <span
                    className={`ml-3 truncate whitespace-nowrap transition-opacity duration-300 ${
                      isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                    } ${selectedKey === item.key ? 'font-semibold' : ''}`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center px-4 py-3 mb-4 text-[#FF9500] hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <LeftOutlined className="text-lg" /> : <RightOutlined className="text-lg" />}
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[80vh]">
            {selectedKey === 'dashboard' && <Dashboard />}
            {selectedKey === 'users' && <UserManagement />}
            {selectedKey === 'business' && <BusinessModels />}
            {selectedKey === 'snackplace' && <SnackPlaceManagement />}
            {selectedKey === 'diet' && <DietManagement />}
            {selectedKey === 'taste' && <TasteManagement />}
            {selectedKey === 'foodtype' && <FoodTypeManagement />}
            {selectedKey === 'premium' && <PremiumPackageManagement />}
            {selectedKey === 'payment' && <PaymentManagement />} 
            {selectedKey === 'apprating' && <AppRatingManagement />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;