import React, { useState, useEffect } from 'react';
import { Link, useRoutes, useNavigate } from 'react-router-dom';
import RouterBackend from './../../router/RouterBackend';
import { isAdminAuthenticated, logoutAdmin } from './auth/authAdmin'; // Import authentication functions

const LayoutBackend = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(isAdminAuthenticated()); // Check login status
  const navigate = useNavigate();

  useEffect(() => {
    // Update login status on component mount
    setIsLoggedIn(isAdminAuthenticated());
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmitSearch = () => {
    console.log('Tìm kiếm:', searchTerm);
    navigate(`/search?q=${searchTerm}`);
  };

  const handleLogout = () => {
    logoutAdmin(); // Call logout function
    setIsLoggedIn(false); // Update login status
  };

  return (
    <div className="flex flex-no-wrap">
      {/* Sidebar starts */}
      <div className="basis-3/12 w-64 absolute sm:relative bg-indigo-800 shadow md:h-full flex-col justify-between hidden sm:flex">
        <div>
          <div className="h-16 w-full flex items-center px-8">
            <h1>ADMIN</h1>
          </div>
          <ul className="mt-12">
            <li className="flex w-full justify-between text-gray-600 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center py-3 px-8">
              <div className="flex items-center">
                <span className="text-sm ml-2 text-white">
                  <Link to="/admin">Dashboard</Link>
                </span>
              </div>
            </li>
            <li className="flex w-full justify-between text-gray-600 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
              <div className="flex items-center">
                <span className="text-sm ml-2 text-white">
                  <Link to="/admin/movie">Movie</Link>
                </span>
              </div>
            </li>
            <li className="flex w-full justify-between text-gray-600 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
              <div className="flex items-center">
                <span className="text-sm ml-2 text-white">
                  <Link to="/admin/age-rating">AgeRating</Link>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar ends */}

      <div className='basis-9/12'>
        <div className='flex items-center bg-slate-400 p-2 rounded-lg shadow-sm'>
          <div className='relative flex-1'>
            <input
              type='text'
              placeholder='Search'
              value={searchTerm}
              onChange={handleSearch}
              className='w-full pl-3 pr-10 py-1 rounded-full bg-white border border-gray-300 focus:outline-none'
            />
            <button className='absolute right-2 top-1/2 transform -translate-y-1/2' onClick={handleSubmitSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 items-center mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 15V8.5M7.5 8.5C9.70914 8.5 11.5 6.70914 11.5 4.5C11.5 2.29086 9.70914 0.5 7.5 0.5C5.29086 0.5 3.5 2.29086 3.5 4.5C3.5 6.70914 5.29086 8.5 7.5 8.5Z" stroke="#000000" />
              </svg>
            </button>
          </div>

          <div className='flex items-center space-x-4 ml-4'>
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} aria-label="Đăng xuất">
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-teal h-20 w-20 text-white items-center mt-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M7.50024 8.5V0.5M2.618 2.49866C1.317 3.76883 0.5 5.53376 0.5 7.49548C0.5 11.359 3.635 14.5 7.5 14.5C11.367 14.5 14.5 11.359 14.5 7.49548C14.5 5.53676 13.693 3.76883 12.395 2.49866" stroke="#000000" strokeLinecap="square"/>
                  </svg>
                </button>
                <Link to="/cart" aria-label="Giỏ hàng" className="relative inline-flex items-center">
                  <svg className="fill-current text-teal inline-block h-12 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z"/>
                  </svg>
                  <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full' style={{ transform: 'translate(50%, -50%)' }}>3</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="login" aria-label="Đăng nhập">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-teal inline-block h-20 w-20 text-gray-600 items-center mt-4" fill="none" viewBox="0 0 20 20">
                      <path d="M7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5ZM7.5 14.5V9.5H6C4.61929 9.5 3.5 8.38071 3.5 7C3.5 5.61929 4.61929 4.5 6 4.5H7.69388C9.54874 4.5 11.0805 5.94903 11.1834 7.80103L11.5 13.5M7 9.5H7.38197C8.06717 9.5 8.69357 9.11287 9 8.5M4 6.5H5M6 6.5H7" stroke="#000000"/>
                    </svg>
                  </button>
                </Link>
                <Link to="register" aria-label="Đăng ký">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-teal inline-block h-20 w-20 text-gray-600 items-center" fill="none" viewBox="0 0 20 20">
                      <path d="M10 2C7.8 2 6 3.8 6 6c0 2.2 2 4.8 4 7.2 2-2.4 4-5 4-7.2 0-2.2-1.8-4-4-4zM2 18c0-2.8 3.6-5 8-5s8 2.2 8 5H2z" />
                    </svg>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        {useRoutes(RouterBackend)}
      </div>
    </div>
  );
}

export default LayoutBackend;
