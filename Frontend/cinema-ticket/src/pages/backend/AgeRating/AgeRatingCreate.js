import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AgeRatingCreate() {
    const [ageRating, setAgeRating] = useState({
        description: '',
        rating: '',
        status: '',
        created_by: 1, // Có thể sửa lại sau tùy user login
        updated_by: 1
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAgeRating({ ...ageRating, [name]: value });
    };

    const handleAddAgeRating = async (e) => {
        e.preventDefault();
        try {
            const formatted = {
                ...ageRating,
                status: parseInt(ageRating.status),
            };
            await axios.post('http://localhost:8080/api/age-ratings', formatted);
            navigate('/admin/age-rating');
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm độ tuổi giới hạn');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Thêm độ tuổi giới hạn</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleAddAgeRating} className="space-y-4">
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
                        placeholder="Ví dụ: P, C13, C18..."
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

                <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">
                    Thêm phân loại
                </button>
            </form>
        </div>
    );
}

export default AgeRatingCreate;
