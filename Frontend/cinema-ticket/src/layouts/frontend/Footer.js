import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/branches");
        setBranches(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ rạp:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <div className="bg-[#101432] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Logo và thông tin rạp */}
          <div className="flex flex-col items-center md:items-start">
            <img src="/images/TH.jpg" alt="Logo" className="w-32 mb-4" />
            <p className="text-sm mb-2">Công Ty Phim</p>
            <p className="text-sm">Hotline: 0378 804 171</p>
            <p className="text-sm">Email: caosonlam3003@gmail.com</p>
          </div>

          {/* Liên kết trang */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4">Liên Kết</h3>
            <ul className="space-y-4">
              <li><a href="/" className="hover:text-yellow-400">Về Chúng Tôi</a></li>
              <li><a href="/" className="hover:text-yellow-400">Chính Sách Bảo Mật</a></li>
              <li><a href="/" className="hover:text-yellow-400">Điều Khoản Dịch Vụ</a></li>
              <li><a href="/" className="hover:text-yellow-400">Hỗ Trợ</a></li>
            </ul>
          </div>

          {/* Địa chỉ rạp */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4">Địa Chỉ Rạp</h3>
            <ul className="text-sm space-y-2">
              {branches.length > 0 ? (
                branches.map(branch => (
                  <li key={branch.id}>
                    {branch.name} {branch.address}
                  </li>
                ))
              ) : (
                <li>Đang tải địa chỉ...</li>
              )}
            </ul>
          </div>
        </div>

        {/* Mạng xã hội */}
        <div className="flex flex-col items-center md:items-start mt-6">
          <h3 className="text-xl font-semibold mb-4">Mạng Xã Hội</h3>
          <div className="flex space-x-6">
            <a href="/" className="text-white hover:text-yellow-400"><FaFacebookF size={24} /></a>
            <a href="/" className="text-white hover:text-yellow-400"><FaInstagram size={24} /></a>
            <a href="/" className="text-white hover:text-yellow-400"><FaTwitter size={24} /></a>
            <a href="/" className="text-white hover:text-yellow-400"><FaLinkedinIn size={24} /></a>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="text-center mt-6 text-sm">
          <p>&copy; 2025 Công Ty Phim. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
