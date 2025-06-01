import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AgeRatingDetail = () => {
    const { id } = useParams();
    const [ageRating, setAgeRating] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/age-ratings/show/${id}`);
                setAgeRating(res.data);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin độ tuổi:', error);
            }
        })();
    }, [id]);

    if (!ageRating) return <div className="p-4 text-center text-gray-600">Đang tải thông tin độ tuổi...</div>;

    return (
        <div className='bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-10'>
            <h1 className='text-2xl font-bold text-green-800 mb-4'>Chi tiết phân loại độ tuổi</h1>
            <p><strong>ID:</strong> {ageRating.id}</p>
            <p><strong>Phân loại:</strong> {ageRating.rating}</p>
            <p><strong>Mô tả:</strong> {ageRating.description}</p>
            <p><strong>Trạng thái:</strong> {ageRating.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
            <p><strong>Ngày tạo:</strong> {new Date(ageRating.created_at).toLocaleString()}</p>
            {ageRating.updated_at && (
                <p><strong>Ngày cập nhật:</strong> {new Date(ageRating.updated_at).toLocaleString()}</p>
            )}
        </div>
    );
};

export default AgeRatingDetail;
