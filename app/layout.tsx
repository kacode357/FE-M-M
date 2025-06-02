import type { Metadata } from "next";
import { Geist, Geist_Mono, Baloo_2 } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import "@ant-design/v5-patch-for-react-19";

// Cấu hình font Geist Sans
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Cấu hình font Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cấu hình font Baloo 2
const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Măm Map",
  description: "Ứng dụng tìm kiếm đồ ăn thông minh",
  icons: {
    icon: [
      { url: "/images/logo-mm-final-2.png", type: "image/png" },
      { url: "/images/logo-mm-final-2.png", rel: "shortcut icon", type: "image/png" },
    ],
    apple: "/images/logo-mm-final-2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baloo2.variable} antialiased`}
        style={{ fontFamily: "var(--font-baloo-2)" }}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}