'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const Home: React.FC = () => {
  const router = useRouter(); // Khởi tạo router

  useEffect(() => {
    // Chuyển hướng ngay lập tức đến /auth/login khi component mount
    router.push('/auth/login');
  }, [router]); // Thêm router vào dependency array để đảm bảo useEffect chạy lại nếu router thay đổi (ít khi xảy ra)

  // Không return component nào cả, vì chúng ta muốn chuyển hướng ngay lập tức
  // Có thể return null hoặc một spinner nhỏ nếu mày muốn có chút hiệu ứng chờ
  return null;
};

export default Home;