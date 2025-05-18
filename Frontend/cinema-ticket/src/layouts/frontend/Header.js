import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');

    // Đăng xuất
    useEffect(() => {
        const name = localStorage.getItem('userName');
        const image = localStorage.getItem('userImage');
        setUserName(name || '');
        setUserImage(image || '');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImage');
        localStorage.removeItem('userEmail');

        setUserName(''); 
        setUserImage('');
    };

    return (
        <div>
            <header className="bg-white">
                <div className="container mx-20 pb-1">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div>
                            <a href="/" className="block">
                                <img src="/images/logo1.png" alt="logo" className="w-32 ml-0 h-auto" />
                            </a>
                        </div>

                        {/* Tìm kiếm + Tài khoản */}
                        <div className="flex items-center space-x-10">
                            {/* Tìm kiếm */}
                            <div className="relative w-1/2">
                                <input
                                    type="text"
                                    placeholder="Tìm phim"
                                    className="text-black w-full py-2 px-4 rounded-full border-black border-2"
                                />
                                <FaSearch className="absolute right-4 top-3 text-gray-500" />
                            </div>

                            {/* Tài khoản */}
                            <div className="flex items-center gap-3 justify-end whitespace-nowrap">
                                {userName ? (
                                    <div className="flex items-center gap-3">
                                        {userImage && (
                                            <img src={userImage} alt="avatar" className="w-8 h-8 rounded-full object-cover border" />
                                        )}
                                        <span className="text-gray-800 text-base">Xin chào,</span>
                                        <span className="font-medium text-blue-600 text-base">{userName}</span>
                                        <button onClick={handleLogout} className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition" >
                                            Đăng xuất
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Link to="/login" className="flex items-center space-x-2 w-28">
                                            <FaUserCircle className="text-xl" />
                                            <span>Đăng nhập</span>
                                        </Link>
                                        <Link to="/register" className="flex items-center space-x-2 w-24">
                                            <FaUserCircle className="text-xl" />
                                            <span>Đăng ký</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu điều hướng */}
                <nav className="py-4 text-white pt-5 text-center bg-black pb-5">
                    <ul className="flex justify-center items-center space-x-8">
                        <li><Link to="/" className="hover:text-yellow-400 hover:underline">Trang chủ</Link></li>
                        <li><Link to="/promotion" className="hover:text-yellow-400 hover:underline">Khuyến mãi</Link></li>
                        <li><Link to="/event" className="hover:text-yellow-400 hover:underline">Sự kiện</Link></li>
                        <li><Link to="/" className="hover:text-yellow-400 hover:underline">Giới thiệu</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;
