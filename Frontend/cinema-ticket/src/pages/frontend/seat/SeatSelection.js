// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from "axios";

// const SEAT_PRICE = 45000;
// const rows = 6;
// const seatsPerRow = 7;

// const SeatSelection = () => {
//     const [selectedSeats, setSelectedSeats] = useState([]);
//     const [bookedSeats, setBookedSeats] = useState([]);
//     const [userBookedSeats, setUserBookedSeats] = useState([]);
//     const [showUserInfoForm, setShowUserInfoForm] = useState(false);
//     const [guestInfo, setGuestInfo] = useState({ fullName: '', birthDate: '', address: '', phone: '' });
//     const [timeoutId, setTimeoutId] = useState(null);
//     const [remainingTime, setRemainingTime] = useState(0);

//     // Parse currentUser từ localStorage
//     const [currentUser, setCurrentUser] = useState(() => {
//         try {
//             const storedUser = JSON.parse(localStorage.getItem('currentUser'));
//             return storedUser?.email || null;
//         } catch {
//             return null;
//         }
//     });

//     const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie")) || {};
//     const movieTitle = selectedMovie.title || "Chưa chọn phim";
//     const movieImage = selectedMovie.image ? `http://localhost:8080/images/${selectedMovie.image}` : "";
//     const selectedShowTime = selectedMovie.showTime || "";

//     const navigate = useNavigate();
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const movieName = selectedMovie.title;

//     const seatKey = `paidSeats_${selectedMovie.id}`;
//     const paidSeatData = JSON.parse(localStorage.getItem(seatKey)) || {};
//     const allPaidSeats = Object.values(paidSeatData).flat();
//     const isSeatPaid = (seat) => allPaidSeats.includes(seat);

//     useEffect(() => {
//         const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser')) || {};
//         const movieBookings = allBookings[movieName] || {};

//         let userSeats = [];
//         let allBooked = [];

//         Object.entries(movieBookings).forEach(([email, booking]) => {
//             const seatsArray = Array.isArray(booking) ? booking : booking?.seats || [];

//             if (email === currentUser) {
//                 userSeats = seatsArray;
//             }

//             allBooked.push(...seatsArray);
//         });

//         setBookedSeats(allBooked);
//         setUserBookedSeats(userSeats);

//         const storedSelectedSeats = JSON.parse(localStorage.getItem(`selectedSeats_${currentUser}_${selectedShowTime}`)) || [];
//         setSelectedSeats(storedSelectedSeats);

//         const storedRemainingTime = localStorage.getItem('remainingTime');
//         if (storedRemainingTime) {
//             setRemainingTime(parseInt(storedRemainingTime, 10));
//         }

//         console.log("👤 currentUser:", currentUser);
//         console.log("🎯 userBookedSeats:", userSeats);
//         console.log("📦 allBookedSeats:", allBooked);
//         console.log("💺 Selected from storage:", storedSelectedSeats);
//     }, [movieName, currentUser, selectedShowTime]);

//     useEffect(() => {
//         // Cập nhật thời gian còn lại mỗi giây
//         if (remainingTime > 0) {
//             const intervalId = setInterval(() => {
//                 setRemainingTime((prev) => {
//                     const newTime = prev - 1;
//                     localStorage.setItem('remainingTime', newTime); 
//                     if (newTime <= 0) {
//                         handleCancelSeats(selectedSeats);
//                         return 0; 
//                     }
//                     return newTime;
//                 });
//             }, 1000);
//             return () => clearInterval(intervalId);
//         } else {
//             // Nếu không còn ghế nào được chọn, dừng thời gian
//             clearTimeout(timeoutId);
//             setTimeoutId(null);
//         }
//     }, [remainingTime, selectedSeats]);

//     const handleSeatClick = (row, seat) => {
//         const rowLabel = String.fromCharCode(64 + row);
//         const seatId = `${rowLabel}-${seat}`;
//         const isBookedByOthers = bookedSeats.includes(seatId) && !userBookedSeats.includes(seatId);

//         // Ngăn chặn việc chọn ghế đã được đặt
//         if (isBookedByOthers) return;

//         // Kiểm tra số ghế đã chọn
//         if (selectedSeats.length >= 6 && !selectedSeats.includes(seatId)) {
//             alert("Bạn chỉ có thể chọn tối đa 6 ghế.");
//             return;
//         }

//         // Kiểm tra ghế liền nhau trong tất cả các hàng
//         const selectedRowSeats = selectedSeats.filter(seat => seat.startsWith(rowLabel));
//         const seatNumbers = selectedRowSeats.map(seat => parseInt(seat.split('-')[1]));
//         const newSeatNumber = seat;

//         // Kiểm tra xem ghế đã chọn có liền nhau không
//         const isAdjacent = selectedSeats.some(seat => {
//             const [selectedRow, selectedSeat] = seat.split('-');
//             return selectedRow === rowLabel && Math.abs(parseInt(selectedSeat) - newSeatNumber) === 1;
//         });

//         // Nếu không có ghế nào đã chọn, cho phép chọn ghế mới
//         if (selectedSeats.length === 0 || isAdjacent) {
//             setSelectedSeats((prev) => {
//                 const newSelectedSeats = prev.includes(seatId)
//                     ? prev.filter((id) => id !== seatId)
//                     : [...prev, seatId];

//                 // Lưu ghế đã chọn vào localStorage với khóa duy nhất cho người dùng và khung giờ
//                 localStorage.setItem(`selectedSeats_${currentUser}_${selectedShowTime}`, JSON.stringify(newSelectedSeats));
//                 return newSelectedSeats;
//             });

//             console.log("Selected Seats:", selectedSeats);

//             // Thiết lập thời gian chờ 1 phút
//             if (timeoutId) {
//                 clearTimeout(timeoutId); 
//             }
//             const timeLimit = 15;
//             setRemainingTime(timeLimit);
//             localStorage.setItem('remainingTime', timeLimit); 
//             const id = setTimeout(() => {
//                 handleCancelSeats(selectedSeats);
//             }, timeLimit * 1000);
//             setTimeoutId(id);
//         } else {
//             alert("Bạn chỉ có thể chọn ghế liền nhau.");
//         }
//     };

//     const handleCancelSeats = (seats) => {
//         const updatedBookedSeats = bookedSeats.filter(seat => !seats.includes(seat));
//         setBookedSeats(updatedBookedSeats);
//         setSelectedSeats([]); 
//         alert("Thời gian đặt vé đã hết. Ghế đã được hủy.");
//         setRemainingTime(0);
//         localStorage.removeItem('remainingTime'); 
//         localStorage.removeItem(`selectedSeats_${currentUser}_${selectedShowTime}`);
//     };

//     const handleGuestInfoChange = (e) => {
//         const { name, value } = e.target;
//         setGuestInfo({ ...guestInfo, [name]: value });
//     };

//     const handleSubmit = async () => {
//         if (selectedSeats.length === 0) {
//             alert("Vui lòng chọn ít nhất 1 ghế trước khi đặt vé.");
//             return;
//         }
    
//         const success = await reserveSeats(); // <-- Gọi API
    
//         if (success) {
//             clearTimeout(timeoutId); 
//             setRemainingTime(0); 
//             localStorage.removeItem('remainingTime'); 
//             localStorage.removeItem(`selectedSeats_${currentUser}_${selectedShowTime}`); 
    
//             // Chuyển sang trang thanh toán với dữ liệu ghế
//             navigate(`/checkout?movie=${selectedMovie.title}&seats=${selectedSeats.join(",")}&email=${currentUser}`);
//         }
//     };    

//     const reserveSeats = async () => {
//         try {
//             const token = localStorage.getItem('token'); // Lấy token từ localStorage
    
//             // Chuyển đổi selectedSeats thành định dạng mà backend mong đợi
//             const seatsToReserve = selectedSeats.map(seat => {
//                 return {
//                     seatNumber: seat, 
//                     seatType: "NORMAL" 
//                 };
//             });
    
//             const response = await fetch("http://localhost:8080/api/seats/reserve", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`, 
//                 },
//                 body: JSON.stringify({
//                     email: currentUser ,
//                     movieId: selectedMovie.id,
//                     seats: seatsToReserve, 
//                     showTime: selectedShowTime,
//                 }),
//             });
    
//             if (!response.ok) {
//                 const errData = await response.json().catch(() => ({}));
//                 throw new Error(errData.message || "Đặt ghế thất bại.");
//             }
    
//             const data = await response.json();
//             console.log("✅ Ghế đã được đặt thành công:", data);
            
//             // Cập nhật trạng thái ghế trong localStorage
//             updateBookedSeats(selectedSeats);
    
//             return true;
//         } catch (error) {
//             console.error("❌ Lỗi đặt ghế:", error.message);
//             alert(`Không thể đặt ghế: ${error.message}`);
//             return false;
//         }
//     };       

//     const updateBookedSeats = (seats) => {
//         setBookedSeats((prev) => [...prev, ...seats]);
//         // Lưu ghế đã đặt vào localStorage
//         const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser ')) || {};
//         const movieBookings = allBookings[movieName] || {};
//         movieBookings[currentUser ] = { seats: [...(movieBookings[currentUser ]?.seats || []), ...seats] };
//         allBookings[movieName] = movieBookings;
//         localStorage.setItem('bookedSeatsByUser ', JSON.stringify(allBookings));
//     };

//     const saveBooking = (email) => {
//         const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser')) || {};
//         const movieBookings = allBookings[movieName] || {};

//         const userBooking = movieBookings[email] || { seats: [] };

//         const newSeats = [...userBooking.seats, ...selectedSeats];

//         movieBookings[email] = { seats: newSeats };
//         allBookings[movieName] = movieBookings;

//         localStorage.setItem('bookedSeatsByUser', JSON.stringify(allBookings));
//     };

//     const handleCancelSeat = (seatId) => {
//         const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser')) || {};
//         const movieBookings = allBookings[movieName] || {};
//         const userBooking = movieBookings[currentUser];

//         if (!userBooking || !userBooking.seats.includes(seatId)) {
//             alert("Bạn không sở hữu ghế này.");
//             return;
//         }

//         const updatedSeats = userBooking.seats.filter(seat => seat !== seatId);

//         movieBookings[currentUser] = {
//             seats: updatedSeats,
//         };

//         allBookings[movieName] = movieBookings;
//         localStorage.setItem('bookedSeatsByUser', JSON.stringify(allBookings));

//         setUserBookedSeats(updatedSeats);
//         setBookedSeats(updatedSeats);
//     };

//     const handleGuestSubmit = () => {
//         const guestEmail = `guest_${Date.now()}@guest.com`;
//         localStorage.setItem('currentUser', guestEmail);

//         const users = JSON.parse(localStorage.getItem('users')) || {};
//         users[guestEmail] = { password: '', ...guestInfo };
//         localStorage.setItem('users', JSON.stringify(users));

//         // saveBooking(guestEmail);
//         // navigate(`/checkout?movie=${movieName}&seats=${selectedSeats.join(",")}`);
//     };

//     const totalPrice = selectedSeats.length * SEAT_PRICE;
//     console.log("Total Price:", totalPrice);

//     // Chuyển đổi thời gian còn lại thành định dạng phút:giây
//     const formatTime = (time) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = time % 60;
//         return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//     };

//     return (
//         <div className="min-h-screen p-4 bg-gradient-to-br from-black via-blue-600/20 to-black bg-opacity-90 backdrop-blur-sm text-white">
//             <h2 className="text-2xl font-bold text-center text-white mb-4">
//                 Chọn ghế cho phim: 
//                 <span className="bg-gradient-to-r from-red-500 text-red-500 bg-clip-text">
//                     {movieTitle}
//                 </span>
//             </h2>

//             {/* Hiển thị hình ảnh bộ phim */}
//             {movieImage && (
//                 <div className="mb-4">
//                     <img src={movieImage} alt={movieTitle} className="w-96 h-auto absolute top-16 left-20 flex flex-col items-center" />
//                 </div>
//             )}

//             {/* Màn hình, Ghế */}
//             <div className="flex flex-col items-center justify-center w-full px-4">
//                 {/* Màn hình */}
//                 <div className="seat-screen mb-6 relative" data-aos="fade-up">
//                     <img src="/images/img-screen.png" alt="Màn hình" className="w-[360px] md:w-[460px] lg:w-[520px]" />
//                     <div className="text-white font-semibold text-center absolute left-1/2 transform -translate-x-1/2 bottom-4 rotate-11">
//                         Màn hình
//                     </div>
//                 </div>

//                 {/* Hình ảnh cửa nhỏ */}
//                 <div className="absolute top-1/4 right-80 flex flex-col items-center">
//                     <img 
//                         src="/images/C1.png" 
//                         alt="Cửa" 
//                         className="w-10 h-10 transform -translate-y-3 filter brightness-150 contrast-125 hue-rotate-180 drop-shadow-lg rounded-lg" 
//                     />
//                     <span className="mt-1 text-white text-sm font-semibold bg-opacity-50 px-2 py-0.5 rounded">
//                         Cửa
//                     </span>
//                 </div>

//                 {/* Ghế */}
//                 <div className="grid grid-cols-1 gap-4 mb-6">
//                     {Array.from({ length: rows }).map((_, rowIndex) => {
//                         const rowLabel = String.fromCharCode(65 + rowIndex);

//                         // Dãy ghế đôi F
//                         if (rowLabel === 'F') {
//                             return (
//                                 <div key={rowLabel} className="flex justify-center items-center gap-4">
//                                     <div className="w-12 text-center font-semibold text-black">{rowLabel}</div>
//                                     {Array.from({ length: Math.floor(seatsPerRow / 2) }).map((_, pairIndex) => {
//                                         const seatNumber1 = pairIndex * 2 + 1;
//                                         const seatNumber2 = seatNumber1 + 1;
//                                         const seatId1 = `${rowLabel}-${seatNumber1}`;
//                                         const seatId2 = `${rowLabel}-${seatNumber2}`;
//                                         const isBookedByOthers =
//                                             bookedSeats.includes(seatId1) || bookedSeats.includes(seatId2);

//                                         const isSelected = selectedSeats.includes(seatId1) && selectedSeats.includes(seatId2);
//                                         const isUserBooked = userBookedSeats.includes(seatId1) && userBookedSeats.includes(seatId2);

//                                         let seatColor = 'bg-gray-200 text-black';
//                                         if (bookedSeats.includes(seatId1) || bookedSeats.includes(seatId2)) {
//                                             seatColor = 'bg-red-500 text-white cursor-not-allowed';
//                                         }
//                                         if (isSelected) seatColor = 'bg-yellow-500 text-black'; // Màu vàng cho ghế đã chọn nhưng chưa thanh toán

//                                         return (
//                                             <div key={`${seatId1}-${seatId2}`} className="relative">
//                                                 <button
//                                                     onClick={() => {
//                                                         if (isBookedByOthers) return;
//                                                         const bothSelected = selectedSeats.includes(seatId1) && selectedSeats.includes(seatId2);
//                                                         setSelectedSeats((prev) =>
//                                                             bothSelected
//                                                                 ? prev.filter(id => id !== seatId1 && id !== seatId2)
//                                                                 : [...prev, seatId1, seatId2]
//                                                         );
//                                                     }}
//                                                     className={`w-24 h-12 rounded-lg border-2 border-gray-400 transition-all ${seatColor} hover:bg-blue-300 disabled:cursor-not-allowed`}
//                                                     disabled={isBookedByOthers}
//                                                 >
//                                                     {seatNumber1}-{seatNumber2}
//                                                 </button>

//                                                 {isUserBooked && (
//                                                     <button
//                                                         onClick={() => {
//                                                             handleCancelSeat(seatId1);
//                                                             handleCancelSeat(seatId2);
//                                                         }}
//                                                         className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full hover:bg-yellow-600"
//                                                     >
//                                                         Hủy
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         );
//                                     })} 
//                                 </div>
//                             );
//                         }

//                         // Các dãy ghế A-E
//                         return (
//                             <div key={rowLabel} className="flex justify-center items-center gap-4">
//                                 <div className="w-12 text-center font-semibold text-black">{rowLabel}</div>
//                                 {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
//                                     const seatId = `${rowLabel}-${seatIndex + 1}`;
//                                     const isSelected = selectedSeats.includes(seatId);
//                                     const isBookedByOthers = bookedSeats.includes(seatId);
//                                     const isUserBooked = userBookedSeats.includes(seatId);

//                                     let seatColor = 'bg-gray-200 text-black';
                                    
//                                     if (bookedSeats.includes(seatId)) {
//                                         seatColor = 'bg-red-500 text-white cursor-not-allowed';
//                                     }
//                                     if (isSelected) seatColor = 'bg-yellow-500 text-black'; 

//                                     return (
//                                         <div key={seatId} className="relative">
//                                             <button
//                                                 onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1)}
//                                                 className={`w-12 h-12 rounded-lg border-2 border-gray-400 transition-all ${seatColor} hover:bg-blue-300 disabled:cursor-not-allowed`}
//                                                 disabled={isBookedByOthers}
//                                             >
//                                                 {seatIndex + 1}
//                                             </button>

//                                             {isSelected && (
//                                                 <button
//                                                     onClick={() => {
//                                                         handleCancelSeat(seatId);
//                                                         setSelectedSeats((prev) => prev.filter((id) => id !== seatId)); 
//                                                     }}
//                                                     className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full hover:bg-yellow-600"
//                                                 >
//                                                     Hủy
//                                                 </button>
//                                             )}

//                                             {isUserBooked && (
//                                                 <button
//                                                     onClick={() => handleCancelSeat(seatId)}
//                                                     className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full hover:bg-yellow-600"
//                                                 >
//                                                     Hủy
//                                                 </button>
//                                             )}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             {/* Hiển thị thời gian còn lại */}
//             {remainingTime > 0 && currentUser && ( 
//                 <div className="text-center text-lg font-semibold mb-4">
//                     Thời gian còn lại để đặt vé: {formatTime(remainingTime)}
//                 </div>
//             )}

//             {/* Nút hiển thị màu ghế */}
//             <div className="flex justify-center gap-6 mb-6">
//                 <div className="flex items-center gap-2">
//                     <div className="w-6 h-6 bg-gray-300 border border-gray-400 rounded"></div>
//                     <span>Chưa chọn</span>
//                 </div>
//                 {/* <div className="flex items-center gap-2">
//                     <div className="w-6 h-6 bg-blue-500 border border-gray-400 rounded"></div>
//                     <span>Đã chọn</span>
//                 </div> */}
//                 <div className="flex items-center gap-2">
//                     <div className="w-6 h-6 bg-yellow-500 border border-gray-400 rounded"></div>
//                     <span>Chưa thanh toán</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <div className="w-6 h-6 bg-red-500 border border-gray-400 rounded"></div>
//                     <span>Đã đặt</span>
//                 </div>
//             </div>

//             {/* Tổng tiền */}
//             <div className="text-right font-semibold justify-between items-center text-xl mb-6">
//                 <div className="font-semibold text-lg">Tổng tiền</div>
//                 <div className="font-semibold text-xl">{totalPrice.toLocaleString()} VND</div>
//             </div>

//             {/* Nút Đặt vé */}
//             <div className="mt-6">
//                 <button
//                     onClick={handleSubmit}
//                     className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-blue-700"
//                 >
//                     Đặt vé
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SeatSelection; 



import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const SEAT_PRICE = 45000;
const rows = 6;
const seatsPerRow = 7;

const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [userBookedSeats, setUserBookedSeats] = useState([]);
    const [showUserInfoForm, setShowUserInfoForm] = useState(false);
    const [guestInfo, setGuestInfo] = useState({ fullName: '', birthDate: '', address: '', phone: '' });
    const [timeoutId, setTimeoutId] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);

    // Parse currentUser  từ localStorage
    const [currentUser , setCurrentUser ] = useState(() => {
        try {
            const storedUser  = JSON.parse(localStorage.getItem('currentUser '));
            return storedUser ?.email || null;
        } catch {
            return null;
        }
    });

    const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie")) || {};
    const movieTitle = selectedMovie.title || "Chưa chọn phim";
    const movieImage = selectedMovie.image ? `http://localhost:8080/images/${selectedMovie.image}` : "";
    const selectedShowTime = selectedMovie.showTime || "";

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const movieName = selectedMovie.title;

    const seatKey = `paidSeats_${selectedMovie.id}`;
    const paidSeatData = JSON.parse(localStorage.getItem(seatKey)) || {};
    const allPaidSeats = Object.values(paidSeatData).flat();
    const isSeatPaid = (seat) => allPaidSeats.includes(seat);

    useEffect(() => {
        const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser ')) || {};
        const movieBookings = allBookings[movieName] || {};

        let userSeats = [];
        let allBooked = [];

        Object.entries(movieBookings).forEach(([email, booking]) => {
            const seatsArray = Array.isArray(booking) ? booking : booking?.seats || [];

            if (email === currentUser ) {
                userSeats = seatsArray;
            }

            allBooked.push(...seatsArray);
        });

        setBookedSeats(allBooked);
        setUserBookedSeats(userSeats);

        const storedSelectedSeats = JSON.parse(localStorage.getItem(`selectedSeats_${currentUser }_${selectedShowTime}`)) || [];
        setSelectedSeats(storedSelectedSeats);

        const storedRemainingTime = localStorage.getItem('remainingTime');
        if (storedRemainingTime) {
            setRemainingTime(parseInt(storedRemainingTime, 10));
        }

        console.log("👤 currentUser :", currentUser );
        console.log("🎯 userBookedSeats:", userSeats);
        console.log("📦 allBookedSeats:", allBooked);
        console.log("💺 Selected from storage:", storedSelectedSeats);
    }, [movieName, currentUser , selectedShowTime]);

    useEffect(() => {
        // Cập nhật thời gian còn lại mỗi giây
        if (remainingTime > 0) {
            const intervalId = setInterval(() => {
                setRemainingTime((prev) => {
                    const newTime = prev - 1;
                    localStorage.setItem('remainingTime', newTime); 
                    if (newTime <= 0) {
                        handleCancelSeats(selectedSeats);
                        return 0; 
                    }
                    return newTime;
                });
            }, 1000);
            return () => clearInterval(intervalId);
        } else {
            // Nếu không còn ghế nào được chọn, dừng thời gian
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    }, [remainingTime, selectedSeats]);

    const handleSeatClick = (row, seat) => {
        const rowLabel = String.fromCharCode(64 + row);
        const seatId = `${rowLabel}-${seat}`;
        const isBookedByOthers = bookedSeats.includes(seatId) && !userBookedSeats.includes(seatId);

        // Ngăn chặn việc chọn ghế đã được đặt
        if (isBookedByOthers) return;

        // Kiểm tra số ghế đã chọn
        if (selectedSeats.length >= 6 && !selectedSeats.includes(seatId)) {
            alert("Bạn chỉ có thể chọn tối đa 6 ghế.");
            return;
        }

        // Kiểm tra ghế liền nhau trong tất cả các hàng
        const selectedRowSeats = selectedSeats.filter(seat => seat.startsWith(rowLabel));
        const seatNumbers = selectedRowSeats.map(seat => parseInt(seat.split('-')[1]));
        const newSeatNumber = seat;

        // Kiểm tra xem ghế đã chọn có liền nhau không
        const isAdjacent = selectedSeats.some(seat => {
            const [selectedRow, selectedSeat] = seat.split('-');
            return selectedRow === rowLabel && Math.abs(parseInt(selectedSeat) - newSeatNumber) === 1;
        });

        // Nếu không có ghế nào đã chọn, cho phép chọn ghế mới
        if (selectedSeats.length === 0 || isAdjacent) {
            setSelectedSeats((prev) => {
                const newSelectedSeats = prev.includes(seatId)
                    ? prev.filter((id) => id !== seatId)
                    : [...prev, seatId];

                // Lưu ghế đã chọn vào localStorage với khóa duy nhất cho người dùng và khung giờ
                localStorage.setItem(`selectedSeats_${currentUser }_${selectedShowTime}`, JSON.stringify(newSelectedSeats));
                return newSelectedSeats;
            });

            console.log("Selected Seats:", selectedSeats);

            // Thiết lập thời gian chờ 1 phút
            if (timeoutId) {
                clearTimeout(timeoutId); 
            }
            const timeLimit = 15;
            setRemainingTime(timeLimit);
            localStorage.setItem('remainingTime', timeLimit); 
            const id = setTimeout(() => {
                handleCancelSeats(selectedSeats);
            }, timeLimit * 1000);
            setTimeoutId(id);
        } else {
            alert("Bạn chỉ có thể chọn ghế liền nhau.");
        }
    };

    const handleCancelSeats = (seats) => {
        const updatedBookedSeats = bookedSeats.filter(seat => !seats.includes(seat));
        setBookedSeats(updatedBookedSeats);
        setSelectedSeats([]); 
        alert("Thời gian đặt vé đã hết. Ghế đã được hủy.");
        setRemainingTime(0);
        localStorage.removeItem('remainingTime'); 
        localStorage.removeItem(`selectedSeats_${currentUser }_${selectedShowTime}`);
    };

    const handleGuestInfoChange = (e) => {
        const { name, value } = e.target;
        setGuestInfo({ ...guestInfo, [name]: value });
    };

    const handleSubmit = async () => {
        if (selectedSeats.length === 0) {
            alert("Vui lòng chọn ít nhất 1 ghế trước khi đặt vé.");
            return;
        }
    
        const success = await reserveSeats(); // <-- Gọi API
    
        if (success) {
            clearTimeout(timeoutId); 
            setRemainingTime(0); 
            localStorage.removeItem('remainingTime'); 
            localStorage.removeItem(`selectedSeats_${currentUser }_${selectedShowTime}`); 
    
            // Chuyển sang trang thanh toán với dữ liệu ghế
            navigate(`/checkout?movie=${selectedMovie.title}&seats=${selectedSeats.join(",")}&email=${currentUser }`);
        }
    };    

    const reserveSeats = async () => {
        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
    
            // Gọi API để lấy danh sách ghế
            const seatResponse = await axios.get("http://localhost:8080/api/seats", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            // Tạo một bản đồ để ánh xạ seatNumber với ID
            const seatMap = {};
            seatResponse.data.forEach(seat => {
                seatMap[seat.seatNumber] = seat.id; // ánh xạ seatNumber với ID
            });
    
            // Chuyển đổi selectedSeats thành định dạng mà backend mong đợi
            const seatsToReserve = await Promise.all(selectedSeats.map(async (seat) => {
                const seatId = seatMap[seat]; // Lấy ID từ bản đồ
    
                if (seatId) {
                    return {
                        seatId: seatId, // Lấy ID ghế từ bản đồ
                        userId: currentUser .id, // ID người dùng
                        showtimeId: selectedMovie.id // ID khung giờ
                    };
                } else {
                    throw new Error(`Ghế ${seat} không tồn tại.`);
                }
            }));
    
            const response = await fetch("http://localhost:8080/api/seats/reserve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify({
                    email: currentUser ,
                    movieId: selectedMovie.id,
                    seats: seatsToReserve, 
                    showTime: selectedShowTime,
                }),
            });
    
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Đặt ghế thất bại.");
            }
    
            const data = await response.json();
            console.log("✅ Ghế đã được đặt thành công:", data);
            
            // Cập nhật trạng thái ghế trong localStorage
            updateBookedSeats(selectedSeats);
    
            return true;
        } catch (error) {
            console.error("❌ Lỗi đặt ghế:", error.message);
            alert(`Không thể đặt ghế: ${error.message}`);
            return false;
        }
    };           

    const updateBookedSeats = (seats) => {
        setBookedSeats((prev) => [...prev, ...seats]);
        // Lưu ghế đã đặt vào localStorage
        const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser  ')) || {};
        const movieBookings = allBookings[movieName] || {};
        movieBookings[currentUser  ] = { seats: [...(movieBookings[currentUser  ]?.seats || []), ...seats] };
        allBookings[movieName] = movieBookings;
        localStorage.setItem('bookedSeatsByUser  ', JSON.stringify(allBookings));
    };

    const saveBooking = (email) => {
        const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser ')) || {};
        const movieBookings = allBookings[movieName] || {};

        const userBooking = movieBookings[email] || { seats: [] };

        const newSeats = [...userBooking.seats, ...selectedSeats];

        movieBookings[email] = { seats: newSeats };
        allBookings[movieName] = movieBookings;

        localStorage.setItem('bookedSeatsByUser ', JSON.stringify(allBookings));
    };

    const handleCancelSeat = (seatId) => {
        const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser ')) || {};
        const movieBookings = allBookings[movieName] || {};
        const userBooking = movieBookings[currentUser ];

        if (!userBooking || !userBooking.seats.includes(seatId)) {
            alert("Bạn không sở hữu ghế này.");
            return;
        }

        const updatedSeats = userBooking.seats.filter(seat => seat !== seatId);

        movieBookings[currentUser ] = {
            seats: updatedSeats,
        };

        allBookings[movieName] = movieBookings;
        localStorage.setItem('bookedSeatsByUser ', JSON.stringify(allBookings));

        setUserBookedSeats(updatedSeats);
        setBookedSeats(updatedSeats);
    };

    const handleGuestSubmit = () => {
        const guestEmail = `guest_${Date.now()}@guest.com`;
        localStorage.setItem('currentUser ', guestEmail);

        const users = JSON.parse(localStorage.getItem('users')) || {};
        users[guestEmail] = { password: '', ...guestInfo };
        localStorage.setItem('users', JSON.stringify(users));

        // saveBooking(guestEmail);
        // navigate(`/checkout?movie=${movieName}&seats=${selectedSeats.join(",")}`);
    };

    const totalPrice = selectedSeats.length * SEAT_PRICE;
    console.log("Total Price:", totalPrice);

    // Chuyển đổi thời gian còn lại thành định dạng phút:giây
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="min-h-screen p-4 bg-gradient-to-br from-black via-blue-600/20 to-black bg-opacity-90 backdrop-blur-sm text-white">
            <h2 className="text-2xl font-bold text-center text-white mb-4">
                Chọn ghế cho phim: 
                <span className="bg-gradient-to-r from-red-500 text-red-500 bg-clip-text">
                    {movieTitle}
                </span>
            </h2>

            {/* Hiển thị hình ảnh bộ phim */}
            {movieImage && (
                <div className="mb-4">
                    <img src={movieImage} alt={movieTitle} className="w-96 h-auto absolute top-16 left-20 flex flex-col items-center" />
                </div>
            )}

            {/* Màn hình, Ghế */}
            <div className="flex flex-col items-center justify-center w-full px-4">
                {/* Màn hình */}
                <div className="seat-screen mb-6 relative" data-aos="fade-up">
                    <img src="/images/img-screen.png" alt="Màn hình" className="w-[360px] md:w-[460px] lg:w-[520px]" />
                    <div className="text-white font-semibold text-center absolute left-1/2 transform -translate-x-1/2 bottom-4 rotate-11">
                        Màn hình
                    </div>
                </div>

                {/* Hình ảnh cửa nhỏ */}
                <div className="absolute top-1/4 right-80 flex flex-col items-center">
                    <img 
                        src="/images/C1.png" 
                        alt="Cửa" 
                        className="w-10 h-10 transform -translate-y-3 filter brightness-150 contrast-125 hue-rotate-180 drop-shadow-lg rounded-lg" 
                    />
                    <span className="mt-1 text-white text-sm font-semibold bg-opacity-50 px-2 py-0.5 rounded">
                        Cửa
                    </span>
                </div>

                {/* Ghế */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {Array.from({ length: rows }).map((_, rowIndex) => {
                        const rowLabel = String.fromCharCode(65 + rowIndex);

                        // Dãy ghế đôi F
                        if (rowLabel === 'F') {
                            return (
                                <div key={rowLabel} className="flex justify-center items-center gap-4">
                                    <div className="w-12 text-center font-semibold text-black">{rowLabel}</div>
                                    {Array.from({ length: Math.floor(seatsPerRow / 2) }).map((_, pairIndex) => {
                                        const seatNumber1 = pairIndex * 2 + 1;
                                        const seatNumber2 = seatNumber1 + 1;
                                        const seatId1 = `${rowLabel}-${seatNumber1}`;
                                        const seatId2 = `${rowLabel}-${seatNumber2}`;
                                        const isBookedByOthers =
                                            bookedSeats.includes(seatId1) || bookedSeats.includes(seatId2);

                                        const isSelected = selectedSeats.includes(seatId1) && selectedSeats.includes(seatId2);
                                        const isUserBooked = userBookedSeats.includes(seatId1) && userBookedSeats.includes(seatId2);

                                        let seatColor = 'bg-gray-200 text-black';
                                        if (bookedSeats.includes(seatId1) || bookedSeats.includes(seatId2)) {
                                            seatColor = 'bg-red-500 text-white cursor-not-allowed';
                                        }
                                        if (isSelected) seatColor = 'bg-yellow-500 text-black'; // Màu vàng cho ghế đã chọn nhưng chưa thanh toán

                                        return (
                                            <div key={`${seatId1}-${seatId2}`} className="relative">
                                                <button
                                                    onClick={() => {
                                                        if (isBookedByOthers) return;
                                                        const bothSelected = selectedSeats.includes(seatId1) && selectedSeats.includes(seatId2);
                                                        setSelectedSeats((prev) =>
                                                            bothSelected
                                                                ? prev.filter(id => id !== seatId1 && id !== seatId2)
                                                                : [...prev, seatId1, seatId2]
                                                        );
                                                    }}
                                                    className={`w-24 h-12 rounded-lg border-2 border-gray-400 transition-all ${seatColor} hover:bg-blue-300 disabled:cursor-not-allowed`}
                                                    disabled={isBookedByOthers}
                                                >
                                                    {seatNumber1}-{seatNumber2}
                                                </button>

                                                {isUserBooked && (
                                                    <button
                                                        onClick={() => {
                                                            handleCancelSeat(seatId1);
                                                            handleCancelSeat(seatId2);
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full hover:bg-yellow-600"
                                                    >
                                                        Hủy
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })} 
                                </div>
                            );
                        }

                        // Các dãy ghế A-E
                        return (
                            <div key={rowLabel} className="flex justify-center items-center gap-4">
                                <div className="w-12 text-center font-semibold text-black">{rowLabel}</div>
                                {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                                    const seatId = `${rowLabel}-${seatIndex + 1}`;
                                    const isSelected = selectedSeats.includes(seatId);
                                    const isBookedByOthers = bookedSeats.includes(seatId);
                                    const isUserBooked = userBookedSeats.includes(seatId);

                                    let seatColor = 'bg-gray-200 text-black';
                                    
                                    if (bookedSeats.includes(seatId)) {
                                        seatColor = 'bg-red-500 text-white cursor-not-allowed';
                                    }
                                    if (isSelected) seatColor = 'bg-yellow-500 text-black'; 

                                    return (
                                        <div key={seatId} className="relative">
                                            <button
                                                onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1)}
                                                className={`w-12 h-12 rounded-lg border-2 border-gray-400 transition-all ${seatColor} hover:bg-blue-300 disabled:cursor-not-allowed`}
                                                disabled={isBookedByOthers}
                                            >
                                                {seatIndex + 1}
                                            </button>

                                            {isSelected && (
                                                <button
                                                    onClick={() => {
                                                        handleCancelSeat(seatId);
                                                        setSelectedSeats((prev) => prev.filter((id) => id !== seatId)); 
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full hover:bg-yellow-600"
                                                >
                                                    Hủy
                                                </button>
                                            )}

                                            {isUserBooked && (
                                                <button
                                                    onClick={() => handleCancelSeat(seatId)}
                                                    className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full hover:bg-yellow-600"
                                                >
                                                    Hủy
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Hiển thị thời gian còn lại */}
            {remainingTime > 0 && currentUser  && ( 
                <div className="text-center text-lg font-semibold mb-4">
                    Thời gian còn lại để đặt vé: {formatTime(remainingTime)}
                </div>
            )}

            {/* Nút hiển thị màu ghế */}
            <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 border border-gray-400 rounded"></div>
                    <span>Chưa chọn</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-500 border border-gray-400 rounded"></div>
                    <span>Chưa thanh toán</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 border border-gray-400 rounded"></div>
                    <span>Đã đặt</span>
                </div>
            </div>

            {/* Tổng tiền */}
            <div className="text-right font-semibold justify-between items-center text-xl mb-6">
                <div className="font-semibold text-lg">Tổng tiền</div>
                <div className="font-semibold text-xl">{totalPrice.toLocaleString()} VND</div>
            </div>

            {/* Nút Đặt vé */}
            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Đặt vé
                </button>
            </div>
        </div>
    );
};

export default SeatSelection;
