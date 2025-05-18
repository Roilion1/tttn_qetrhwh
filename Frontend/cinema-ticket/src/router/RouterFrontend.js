import Home from "../pages/frontend/home";
import Promotion from "../pages/frontend/promotion/Promotion";
import Event from "../pages/frontend/app-content/Event";
import Login from "../pages/frontend/auth/Login";
import Register from "../pages/frontend/auth/Register";
import SeatSelection from "../pages/frontend/seat/SeatSelection";
import CheckoutPage from "../pages/pay/CheckoutPage";
import QRCodePage from "../pages/pay/QRCodePage";
import BookingPage from './../pages/frontend/home/product/BookingPage';

const RouterFrontend = [
  { path: "/", element: <Home /> }, 
  { path: "/Promotion", element: <Promotion /> }, 
  { path: "/Event", element: <Event /> },
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
  { path: "/SeatSelection", element: <SeatSelection /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/qr-code", element: <QRCodePage /> },
  { path: "/booking/:id", element: <BookingPage  /> },
];

export default RouterFrontend;