import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieService from '../../../services/MovieService';

const MovieUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    name: '',
    slug: '',
    description: '',
    trailer: '',
    duration: '',
    price: '',
    image: '',
    status: '',
    position: '',
    ageRatingId: '',
    countryId: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await MovieService.show(id);
        console.log("Phim nhận được:", res); 
        if (res && res.name) {
          setMovie(res);
        } else {
          setError('Dữ liệu phim không hợp lệ');
        }
      } catch (err) {
        setError('Không thể tải thông tin phim');
        console.error(err);
      }
    })();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Đổi chỗ tham số cho đúng
      await MovieService.update(movie, id);
      navigate('/admin/movie');
    } catch (err) {
      setError('Lỗi khi cập nhật phim');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Cập nhật Phim</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Tên phim', name: 'name' },
          { label: 'Slug', name: 'slug' },
          { label: 'Mô tả', name: 'description' },
          { label: 'Trailer', name: 'trailer' },
          { label: 'Thời lượng (phút)', name: 'duration' },
          { label: 'Giá vé', name: 'price' },
          { label: 'URL ảnh', name: 'image' },
          { label: 'ID độ tuổi (ageRatingId)', name: 'ageRatingId' },
          { label: 'ID quốc gia (countryId)', name: 'countryId' },
        ].map(({ label, name }) => (
          <div key={name} className="form-group">
            <label className="block text-gray-600 mb-1">{label}:</label>
            <input
              type="text"
              name={name}
              value={movie[name] || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        ))}

        <div className="form-group">
          <label className="block text-gray-600 mb-1">Vị trí hiển thị:</label>
          <select
            name="position"
            value={movie.position || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Chọn vị trí</option>
            <option value="NOW_SHOWING">Đang chiếu</option>
            <option value="COMING_SOON">Sắp chiếu</option>
            <option value="ENDED">Đã kết thúc</option>
          </select>
        </div>

        <div className="form-group">
          <label className="block text-gray-600 mb-1">Trạng thái:</label>
          <select
            name="status"
            value={movie.status || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Chọn trạng thái</option>
            <option value="1">Hoạt động</option>
            <option value="0">Không hoạt động</option>
          </select>
        </div>

        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Cập nhật Phim
        </button>
      </form>
    </div>
  );
};

export default MovieUpdate;
