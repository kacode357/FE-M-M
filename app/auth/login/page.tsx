'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { UserIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

import { LoginUserApi, GetCurrentUserApi } from '@/services/user.services';
import { AuthContext } from '@/contexts/AuthContext';

// Component Spinner tự làm bằng SVG và Tailwind
const LoadingSpinner = () => (
  <svg
    className="h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const LoginPage = () => {
  const { setAuthData } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Logic xử lý giữ nguyên
  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries()) as { username: string; password: string };

    try {
      const loginResponse = await LoginUserApi({
        userName: values.username,
        password: values.password,
      });

      if (loginResponse.accessToken && loginResponse.refreshToken) {
        localStorage.setItem('accessToken', loginResponse.accessToken);
        localStorage.setItem('refreshToken', loginResponse.refreshToken);

        const userResponse = await GetCurrentUserApi();

        setAuthData({
          accessToken: loginResponse.accessToken,
          refreshToken: loginResponse.refreshToken,
          user: userResponse,
        });
        
        toast.success(`Chào mừng quay trở lại, ${userResponse.fullname || userResponse.email}!`);

        router.push('/admin');
      }
    } catch (error) {
      toast.error('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Phần banner bên trái giữ nguyên cho đẹp */}
      <div className="relative hidden w-1/2 items-center justify-around bg-gradient-to-tr from-orange-400 to-orange-600 lg:flex">
        <div>
          <h1 className="text-4xl font-bold text-white">Chào Mừng Trở Lại!</h1>
          <p className="mt-4 text-white">Đăng nhập để tiếp tục quản lý công việc của bạn.</p>
          <div className="mt-8 rounded-lg  p-6 backdrop-blur-sm">
             <Image
                src="/images/logo-app.png" // Đường dẫn tới logo của mày
                alt="Logo ứng dụng"
                width={120}
                height={120}
                className="mx-auto"
              />
          </div>
        </div>
        <div className="absolute -bottom-2 -left-2 h-32 w-32 rounded-full border-4 border-orange-300"></div>
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full border-4 border-orange-300"></div>
      </div>

      {/* Phần form đăng nhập đã được tối giản */}
      <div className="flex w-full items-center justify-center p-4 lg:w-1/2">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Đăng Nhập Tài Khoản</h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={onFinish}>
            {/* Input Username */}
            <div className="relative">
              <label htmlFor="username" className="sr-only">Tên đăng nhập</label>
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Tên đăng nhập"
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Mật khẩu"
              />
            </div>
            
            {/* Button Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-lg border border-transparent bg-orange-600 px-4 py-3 text-base font-bold text-white transition-all duration-300 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-orange-400"
              >
                {loading ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng Nhập</span>
                    <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;