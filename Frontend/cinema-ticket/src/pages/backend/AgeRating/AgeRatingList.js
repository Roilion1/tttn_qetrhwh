import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgeRatingList = () => {
  const [ageRatings, setAgeRatings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/age-ratings');
        setAgeRatings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách độ tuổi:', error);
      }
    })();
  }, []);

  const deleteAgeRating = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/age-ratings/delete/${id}`);
      setAgeRatings(ageRatings.filter(item => item.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa độ tuổi:', error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.get(`http://localhost:8080/api/age-ratings/status/${id}`);
      setAgeRatings(ageRatings.map(item => {
        if (item.id === id) {
          item.status = item.status === 1 ? 0 : 1;
        }
        return item;
      }));
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái độ tuổi:', error);
    }
  };

  return (
    <div>
      <div className='flex flex-row justify-between items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
        <h1 className='text-3xl uppercase text-green-800'>Quản lý độ tuổi</h1>
        <div>
          <Link to="/admin/age-rating/create" className="text-sm ml-2">Thêm độ tuổi</Link>
          <Link to="/admin/age-rating/trash" className="text-sm ml-2">Thùng rác</Link>
        </div>
      </div>

      <div className='bg-white p-3 border rounded-lg'>
        <table className='table-auto w-full text-center border-collapse'>
          <thead>
            <tr className='border-b'>
              <th className='border px-4 py-2'>#</th>
              <th className='border px-4 py-2'>Mức giới hạn</th>
              <th className='border px-4 py-2'>Mô tả</th>
              <th className='border px-4 py-2'>Ngày tạo</th>
              <th className='border px-4 py-2'>Chức năng</th>
              <th className='border px-4 py-2'>ID</th>
            </tr>
          </thead>
          <tbody className='divide-y'>
            {ageRatings.map((item, index) => {
              const jsxStatus = item.status === 1 ? (
                <button onClick={() => toggleStatus(item.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                  <FaToggleOn className='text-sm' />
                </button>
              ) : (
                <button onClick={() => toggleStatus(item.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                  <FaToggleOff className='text-sm' />
                </button>
              );

              return (
                <tr key={item.id}>
                  <td className='border px-4 py-2'><input type='checkbox' /></td>
                  <td className='border px-4 py-2'>{item.rating}</td>
                  <td className='border px-4 py-2'>{item.description}</td>
                  <td className='border px-4 py-2'>{new Date(item.created_at).toLocaleString()}</td>
                  <td className='border px-4 py-2 text-center'>
                    {jsxStatus}
                    <button
                      className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'
                      onClick={() => navigate(`/admin/age-rating/update/${item.id}`)}
                    >
                      <FaEdit className='text-sm' />
                    </button>
                    <button
                      className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'
                      onClick={() => navigate(`/admin/age-rating/show/${item.id}`)}
                    >
                      <FaEye className='text-sm' />
                    </button>
                    <button
                      className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                      onClick={() => deleteAgeRating(item.id)}
                    >
                      <FaTrashAlt className='text-sm' />
                    </button>
                  </td>
                  <td className='border px-4 py-2 text-center'>{item.id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgeRatingList;
