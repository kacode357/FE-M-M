'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const HeaderComponent: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between w-full px-4 sm:px-8 h-16">
          {/* Logo - Ẩn trên mobile */}
          <div className="h-12 pl-32 flex items-center hidden sm:flex">
            <Image
              src="/images/logo-mm-final-2.png"
              alt="Mầm Map Logo"
              width={100}
              height={40}
              priority
            />
          </div>
          {/* Nút cho desktop */}
          <div className="hidden sm:flex items-center">
            <button
              className="ml-4 bg-yellow-400 text-orange-500 rounded-full px-6 h-10 text-base font-semibold hover:bg-yellow-300 transition-colors font-baloo-2"
            >
              Tải ngay
            </button>
          </div>
          {/* Nút hamburger cho mobile */}
          <div className="flex sm:hidden justify-end mt-2 ml-auto">
            <button onClick={showDrawer}>
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Drawer cho menu mobile */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${
          drawerVisible ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 sm:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <Image
            src="/images/logo-mm-final-2.png"
            alt="Mầm Map Logo"
            width={80}
            height={32}
          />
          <button onClick={closeDrawer}>
            <svg
              className="w-6 h-6 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-4 font-baloo-2">
          <button
            className="my-4 bg-yellow-400 text-orange-500 rounded-full px-6 h-10 text-base font-semibold hover:bg-yellow-300 transition-colors w-full text-center font-baloo-2"
          >
            Tải ngay
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;