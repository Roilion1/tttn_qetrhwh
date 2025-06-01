import React, { useEffect, useState } from 'react';
import { MdOutlineRestore } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import MovieService from '../../../services/MovieService';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const MovieTrash = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await MovieService.trash();
                setMovies(result.movies);
            } catch (error) {
                console.error('Lỗi khi tải phim rác:', error);
            }
        })();
    }, []);

    const deleteMovie = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/movie/destroy/${id}`);
            setMovies(movies.filter(movie => movie.id !== id));
        } catch (error) {
            console.error('Lỗi xoá vĩnh viễn:', error);
        }
    };

    const restoreMovie = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/movie/restore/${id}`);
            setMovies(movies.filter(movie => movie.id !== id));
        } catch (error) {
            console.error('Lỗi khôi phục:', error);
        }
    };

    return (
        <div className='bg-white p-4 rounded shadow'>
            <h1 className='text-xl font-semibold mb-4'>Thùng rác Phim</h1>
            <table className='w-full table-auto'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên phim</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => (
                        <tr key={movie.id}>
                            <td>{index + 1}</td>
                            <td>{movie.title}</td>
                            <td className='flex gap-2'>
                                <button onClick={() => restoreMovie(movie.id)}><MdOutlineRestore /></button>
                                <button onClick={() => deleteMovie(movie.id)}><FaTrash className='text-red-500' /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieTrash;