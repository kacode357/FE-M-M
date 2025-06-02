// app/components/NotificationProvider.tsx
'use client';

import { ConfigProvider, notification } from 'antd';
import { ReactNode, useEffect } from 'react';

interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({ children }: NotificationProviderProps) {
  useEffect(() => {
    // Configure notification globally
    notification.config({
      placement: 'top', // or 'topRight', 'bottomLeft', etc.
      duration: 3, // Default duration for all notifications
    });
  }, []);

  return (
    <ConfigProvider>
      {children}
    </ConfigProvider>
  );
}