import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieService from '../../../services/MovieService';

function MovieCreate() {
    const [movie, setMovie] = useState({
        name: '',
        slug: '',
        description: '',
        trailer: '',
        duration: '',
        price: '',
        image: '',
        position: '',
        ageRatingId: '',
        countryId: '',
        status: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleAddMovie = async (e) => {
        e.preventDefault();
        try {
            // Chuyển đổi kiểu dữ liệu nếu cần
            const formattedMovie = {
                ...movie,
                duration: parseInt(movie.duration),
                price: parseFloat(movie.price),
                ageRatingId: parseInt(movie.ageRatingId),
                countryId: parseInt(movie.countryId),
                status: parseInt(movie.status)
            };
            await MovieService.add(formattedMovie);
            navigate('/admin/movie');
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm phim');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Thêm Phim</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleAddMovie} className="space-y-4">
                {[
                    { name: 'name', label: 'Tên phim' },
                    { name: 'slug', label: 'Slug' },
                    { name: 'description', label: 'Mô tả' },
                    { name: 'trailer', label: 'Trailer' },
                    { name: 'duration', label: 'Thời lượng (phút)' },
                    { name: 'price', label: 'Giá vé' },
                    { name: 'image', label: 'Link ảnh' }
                ].map(field => (
                    <div key={field.name} className="form-group">
                        <label className="block text-gray-600 mb-1">{field.label}:</label>
                        <input
                            type="text"
                            name={field.name}
                            value={movie[field.name]}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                ))}

                {/* Position Enum */}
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Vị trí hiển thị:</label>
                    <select
                        name="position"
                        value={movie.position}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Chọn vị trí</option>
                        <option value="NOW_SHOWING">Đang chiếu</option>
                        <option value="COMING_SOON">Sắp chiếu</option>
                        <option value="ENDED">Đã ngưng</option>
                    </select>
                </div>

                {/* Age Rating */}
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Độ tuổi giới hạn (ID):</label>
                    <input
                        type="number"
                        name="ageRatingId"
                        value={movie.ageRatingId}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Country */}
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Quốc gia (ID):</label>
                    <input
                        type="number"
                        name="countryId"
                        value={movie.countryId}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Status */}
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={movie.status}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                    </select>
                </div>

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                    Thêm Phim
                </button>
            </form>
        </div>
    );
}

export default MovieCreate;
