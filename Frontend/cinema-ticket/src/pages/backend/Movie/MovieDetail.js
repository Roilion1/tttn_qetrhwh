import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieService from '../../../services/MovieService';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await MovieService.show(id);
                setMovie(res.movie);
            } catch (error) {
                console.error('Lỗi khi lấy phim:', error);
            }
        })();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className='bg-white p-5 rounded-lg'>
            <h1 className='text-2xl font-bold'>{movie.title}</h1>
            <p><strong>Đạo diễn:</strong> {movie.director}</p>
            <p><strong>Thời lượng:</strong> {movie.duration} phút</p>
            <p><strong>Thể loại:</strong> {movie.genre}</p>
            <p><strong>Ngày phát hành:</strong> {movie.release_date}</p>
            <p><strong>Mô tả:</strong> {movie.description}</p>
            <p><strong>Trạng thái:</strong> {movie.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
        </div>
    );
};

export default MovieDetail;