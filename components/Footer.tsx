'use client';

import React from 'react';
import { Layout, Input, Button } from 'antd';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import '@/styles/footer.css';

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
  return (
    <Footer className="footer">
      <div className="footer-main">
        {/* Cột 1: Logo, slogan, mô tả, và icon mạng xã hội */}
        <div className="footer-column-1">
          <div className="footer-logo">
            <Image
              src="/images/logo-mm-final-2.png"
              alt="Mầm Map Logo"
              width={120}
              height={40}
              className="object-contain"
            />
            <span className="footer-slogan">
              Lên Map, Măm vặt - Sài Gòn phủ phê
            </span>
          </div>
          <p className="footer-description">
            Với mong muốn xây dựng hệ sinh thái ăn vặt, giúp mọi người khám phá và kết nối với các quán ăn vặt chất lượng, Măm Map được ra đời như 1 ứng dụng tìm món ăn vặt thông minh, giúp bạn khám phá quán ăn theo nhu cầu cá nhân.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={32} className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={32} className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={32} className="social-icon" />
            </a>
          </div>
        </div>

        {/* Container bên phải: Cột 2, Cột 3, và phần email */}
        <div className="footer-right">
          <div className="footer-columns">
            {/* Cột 2: Liên kết Người dùng */}
            <div className="footer-section">
              <h4 className="footer-title">Liên kết Người dùng</h4>
              <p className="footer-text">
                <a href="#" className="footer-link">Về chúng tôi</a>
                <br />
                <a href="#" className="footer-link">Liên hệ</a>
                <br />
                <a href="#" className="footer-link">Phương thức thanh toán</a>
                <br />
                <a href="#" className="footer-link">Điều khoản Dịch vụ</a>
              </p>
            </div>

            {/* Cột 3: Liên hệ chúng tôi */}
            <div className="footer-section">
              <h4 className="footer-title">Liên hệ chúng tôi</h4>
              <p className="footer-text">
                123 đường Lá Đa, phường Lá Mít, quận Đọt Cây, thành phố Mơ Màng
                <br />
                <br />
                +09000000 biết
              </p>
            </div>
          </div>

          {/* Phần điền email và nút Đăng ký */}
          <div className="email-subscription">
            <Input
              placeholder="Nhập email của bạn"
              className="email-input"
              style={{ fontFamily: 'var(--font-baloo-2)' }}
            />
            <Button className="subscribe-button">Đăng ký</Button>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền và liên kết */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} ARR, All rights reserved
        </p>
        <p className="footer-links-bottom">
          <a href="#" className="footer-link-bottom">Privacy Policy</a>,{' '}
          <a href="#" className="footer-link-bottom">Terms of Use</a>
        </p>
      </div>
    </Footer>
  );
};

export default FooterComponent;