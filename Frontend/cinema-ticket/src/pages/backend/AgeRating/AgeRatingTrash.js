import React, { useEffect, useState } from 'react';
import { MdOutlineRestore } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const AgeRatingTrash = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/age-ratings/trash`);
        setItems(res.data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách độ tuổi đã xoá:', error);
      }
    })();
  }, []);

  const handleRestore = async (id) => {
    try {
      await axios.get(`${API_BASE_URL}/age-ratings/restore/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Lỗi khôi phục độ tuổi:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/age-ratings/destroy/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Lỗi xoá vĩnh viễn độ tuổi:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Thùng rác độ tuổi</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên độ tuổi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items.map((ageRating, index) => (
            <tr key={ageRating.id}>
              <td>{index + 1}</td>
              <td>{ageRating.rating}</td>
              <td className="flex gap-2">
                <button onClick={() => handleRestore(ageRating.id)}>
                  <MdOutlineRestore />
                </button>
                <button onClick={() => handleDelete(ageRating.id)}>
                  <FaTrash className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgeRatingTrash;
