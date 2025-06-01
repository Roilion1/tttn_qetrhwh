import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../../api/Api";
import { FaPlay } from "react-icons/fa";

const moviesPerPage = 4;

const Product = () => {
  const [moviesNowShowing, setMoviesNowShowing] = useState([]);
  const [moviesUpcoming, setMoviesUpcoming] = useState([]);
  const [currentIndexNowShowing, setCurrentIndexNowShowing] = useState(0);
  const [currentIndexUpcoming, setCurrentIndexUpcoming] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMovies("now-showing", setMoviesNowShowing);
    fetchMovies("coming-soon", setMoviesUpcoming);
  }, []);

  const fetchMovies = async (endpoint, setState) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${Api}/movies/${endpoint}`, { headers });
      const movies = res.data;

      const moviesWithShowtimes = await Promise.all(
        movies.map(async (movie) => {
          try {
            const showtimeRes = await axios.get(`${Api}/showtimes/movie/${movie.id}`, {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const showtimes = showtimeRes.data;

            if (showtimes.length > 0) {
              const sorted = showtimes.sort(
                (a, b) => new Date(a.showDate) - new Date(b.showDate)
              );
              movie.firstShowtimeDate = new Date(sorted[0].showDate).toLocaleDateString("vi-VN");
            } else {
              movie.firstShowtimeDate = "Chưa có lịch chiếu";
            }
          } catch (err) {
            console.error(`Lỗi khi lấy lịch chiếu phim ID ${movie.id}`, err);
            movie.firstShowtimeDate = "Không lấy được lịch";
          }

          return movie;
        })
      );

      setState(moviesWithShowtimes);
    } catch (error) {
      console.error(`Lỗi khi tải phim từ "${endpoint}"`, error);
    }
  };

  const handleWatchTrailer = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Trailer hiện chưa có.");
    }
  };

  const handleBookingClick = (movie) => {
    navigate(`/booking/${movie.id}`, { state: { movie } });
  };

  const renderMovieCards = (movies, currentIndex) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10">
      {movies.slice(currentIndex, currentIndex + moviesPerPage).map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-800 p-4 rounded-lg shadow-md text-white"
        >
          <img
            src={`http://localhost:8080/images/${movie.image}`}
            alt={movie.title}
            className="w-full h-96 object-cover rounded-xl mb-3 transition-transform duration-300 hover:scale-105"
          />
          <h3 className="text-2xl font-bold">{movie.title}</h3>
          <p className="text-sm text-gray-300 my-2">{movie.description}</p>
          <p className="text-sm text-gray-400 mb-3">
            Ngày khởi chiếu: {movie.firstShowtimeDate || "Đang tải..."}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleWatchTrailer(movie.trailer)}
              className="flex items-center text-white border border-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-black transition"
            >
              <FaPlay className="mr-2" /> Xem Trailer
            </button>
            <button
              onClick={() => handleBookingClick(movie)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold"
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const handleSlide = (setter, list, direction) => {
    setter((prev) => {
      const maxIndex = Math.floor((list.length - 1) / moviesPerPage) * moviesPerPage;
      if (direction === "prev") {
        return prev === 0 ? maxIndex : prev - moviesPerPage;
      }
      return prev + moviesPerPage > list.length - 1 ? 0 : prev + moviesPerPage;
    });
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#101432] to-[#1d2243] text-white py-10">
      <h2 className="text-3xl font-bold text-center mb-6">PHIM ĐANG CHIẾU</h2>
      <div className="relative flex justify-center items-center mb-10">
        <button
          onClick={() =>
            handleSlide(setCurrentIndexNowShowing, moviesNowShowing, "prev")
          }
          className="absolute left-2 z-10 bg-black bg-opacity-50 p-3 rounded-full"
        >
          <MdNavigateBefore size={30} />
        </button>
        {renderMovieCards(moviesNowShowing, currentIndexNowShowing)}
        <button
          onClick={() =>
            handleSlide(setCurrentIndexNowShowing, moviesNowShowing, "next")
          }
          className="absolute right-2 z-10 bg-black bg-opacity-50 p-3 rounded-full"
        >
          <MdNavigateNext size={30} />
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-6">PHIM SẮP CHIẾU</h2>
      <div className="relative flex justify-center items-center mb-10">
        <button
          onClick={() =>
            handleSlide(setCurrentIndexUpcoming, moviesUpcoming, "prev")
          }
          className="absolute left-2 z-10 bg-black bg-opacity-50 p-3 rounded-full"
        >
          <MdNavigateBefore size={30} />
        </button>
        {renderMovieCards(moviesUpcoming, currentIndexUpcoming)}
        <button
          onClick={() =>
            handleSlide(setCurrentIndexUpcoming, moviesUpcoming, "next")
          }
          className="absolute right-2 z-10 bg-black bg-opacity-50 p-3 rounded-full"
        >
          <MdNavigateNext size={30} />
        </button>
      </div>
    </div>
  );
};

export default Product;
