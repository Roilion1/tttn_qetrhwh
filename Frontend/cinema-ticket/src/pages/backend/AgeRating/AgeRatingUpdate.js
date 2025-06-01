import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AgeRatingUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ageRating, setAgeRating] = useState({
    description: '',
    rating: '',
    status: '',
    created_by: 1,
    updated_by: 1
  });

  const [error, setError] = useState('');

  // Lấy dữ liệu hiện tại của AgeRating khi component mount
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/age-ratings/${id}`);
        if (res && res.data) {
          setAgeRating(res.data);
        } else {
          setError('Không tìm thấy phân loại độ tuổi');
        }
      } catch (err) {
        setError('Lỗi khi tải dữ liệu phân loại độ tuổi');
        console.error(err);
      }
    })();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgeRating((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formatted = {
        ...ageRating,
        status: parseInt(ageRating.status),
        updated_by: 1, // Giả định user đang login có id = 1
      };
      await axios.put(`http://localhost:8080/api/age-ratings/${id}`, formatted);
      navigate('/admin/age-rating');
    } catch (err) {
      setError('Lỗi khi cập nhật phân loại độ tuổi');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Cập nhật độ tuổi giới hạn</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Mô tả */}
        <div className="form-group">
          <label className="block text-gray-600 mb-1">Mô tả:</label>
          <input
            type="text"
            name="description"
            value={ageRating.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Rating enum */}
        <div className="form-group">
            <label className="block text-gray-600 mb-1">Phân loại độ tuổi:</label>
            <input
                type="text"
                name="rating"
                value={ageRating.rating}
                onChange={handleInputChange}
                required
                placeholder="Nhập phân loại mới, ví dụ: C16, C18+..."
                className="w-full p-2 border border-gray-300 rounded"
            />
        </div>

        {/* Status */}
        <div className="form-group">
          <label className="block text-gray-600 mb-1">Trạng thái:</label>
          <select
            name="status"
            value={ageRating.status}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Chọn trạng thái</option>
            <option value="1">Hoạt động</option>
            <option value="0">Không hoạt động</option>
          </select>
        </div>

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Cập nhật phân loại
        </button>
      </form>
    </div>
  );
};

export default AgeRatingUpdate;
