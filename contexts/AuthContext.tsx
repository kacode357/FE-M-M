'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { GetCurrentUserApi, RefreshTokenApi } from '@/services/user.services';

interface AuthUser {
  id: string;
  fullname: string;
  email: string;
  roles: string[];
}

interface AuthData {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
}

interface AuthContextType {
  authData: AuthData;
  setAuthData: (data: AuthData) => void;
}

export const AuthContext = createContext<AuthContextType>({
  authData: { accessToken: null, refreshToken: null, user: null },
  setAuthData: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>({
    accessToken: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
    refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,
    user: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      if (authData.accessToken && !authData.user) {
        try {
          const userResponse = await GetCurrentUserApi();
          setAuthData({
            ...authData,
            user: {
              id: userResponse.id,
              fullname: userResponse.fullname,
              email: userResponse.email,
              roles: userResponse.roles,
            },
          });
          console.log('Restored Auth Data from API:', { ...authData, user: userResponse });
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setAuthData({ accessToken: null, refreshToken: null, user: null });
        }
      }
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!authData.accessToken || !authData.refreshToken) return;

    const refreshInterval = 20 * 60 * 1000; // 20 minutes in milliseconds
    const tokenRefreshTimer = setInterval(async () => {
      const userConfirmed = window.confirm('Bạn còn đang sử dụng trang web? Nhấn OK để tiếp tục.');
      if (userConfirmed) {
        try {
          const response = await RefreshTokenApi({
            accessToken: authData.accessToken!,
            refreshToken: authData.refreshToken!,
          });
          const { accessToken, refreshToken } = response;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          setAuthData({ ...authData, accessToken, refreshToken });
          console.log('Token refreshed successfully');
        } catch (error) {
          console.error('Token refresh failed:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setAuthData({ accessToken: null, refreshToken: null, user: null });
        }
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAuthData({ accessToken: null, refreshToken: null, user: null });
      }
    }, refreshInterval);

    return () => clearInterval(tokenRefreshTimer);
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};