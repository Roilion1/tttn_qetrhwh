import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/movies');
                const data = response.data;
                console.log('Dữ liệu API:', data);
                setMovies(Array.isArray(data.movies) ? data.movies : data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách phim:', error);
            }
        })();
    }, []);

    const deleteMovie = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/movies/delete/${id}`);
            setMovies(movies.filter(movie => movie.id !== id));
        } catch (error) {
            console.error('Lỗi khi xóa phim:', error);
        }
    };

    const toggleStatus = async (id) => {
        try {
            await axios.get(`http://localhost:8080/api/movies/status/${id}`);
            setMovies(movies.map(movie => {
                if (movie.id === id) {
                    movie.status = movie.status === 1 ? 0 : 1;
                }
                return movie;
            }));
        } catch (error) {
            console.error('Lỗi khi thay đổi trạng thái phim:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-between items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <h1 className='text-3xl uppercase text-green-800'>Quản lý phim</h1>
                <div>
                    <Link to="/admin/movie/create" className="text-sm ml-2">Thêm phim</Link>
                    <Link to="/admin/movie/trash" className="text-sm ml-2">Thùng rác</Link>
                </div>
            </div>

            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center border-collapse'>
                    <thead>
                        <tr className='border-b'>
                            <th className='border px-4 py-2'>#</th>
                            <th className='border px-4 py-2'>Poster</th>
                            <th className='border px-4 py-2'>Tên phim</th>
                            <th className='border px-4 py-2'>Thời lượng</th>
                            <th className='border px-4 py-2'>Giá vé</th>
                            <th className='border px-4 py-2'>Vị trí</th>
                            <th className='border px-4 py-2'>Chức năng</th>
                            <th className='border px-4 py-2'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {movies.map((movie, index) => {
                            const jsxStatus = movie.status === 1 ? (
                                <button onClick={() => toggleStatus(movie.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOn className='text-sm' />
                                </button>
                            ) : (
                                <button onClick={() => toggleStatus(movie.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOff className='text-sm' />
                                </button>
                            );

                            return (
                                <tr key={movie.id}>
                                    <td className='border px-4 py-2 text-center'>
                                        <input type='checkbox' />
                                    </td>
                                    <td className='border px-4 py-2'>
                                    <img
                                        src={`http://localhost:8080/images/${movie.image}`}
                                        alt={movie.name}
                                        className='w-24 h-24 object-cover mx-auto rounded-lg shadow'
                                    />
                                    </td>
                                    <td className='border px-4 py-2'>{movie.name}</td>
                                    <td className='border px-4 py-2'>{movie.duration} phút</td>
                                    <td className='border px-4 py-2'>{movie.price.toLocaleString()} VND</td>
                                    <td className='border px-4 py-2'>{movie.position.replace('_', ' ')}</td>
                                    <td className='border px-4 py-2 text-center'>
                                        {jsxStatus}
                                        <button
                                            className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/movie/update/${movie.id}`)}
                                        >
                                            <FaEdit className='text-sm' />
                                        </button>
                                        <button
                                            className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/movie/show/${movie.id}`)}
                                        >
                                            <FaEye className='text-sm' />
                                        </button>
                                        <button
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => deleteMovie(movie.id)}
                                        >
                                            <FaTrashAlt className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='border px-4 py-2 text-center'>{movie.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieList;
