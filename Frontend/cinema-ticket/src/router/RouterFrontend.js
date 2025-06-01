import Home from "../pages/frontend/home";
import Promotion from "../pages/frontend/promotion/Promotion";
import Event from "../pages/frontend/app-content/Event";
import Login from "../pages/frontend/auth/Login";
import Register from "../pages/frontend/auth/Register";
import SeatSelection from "../pages/frontend/seat/SeatSelection";
import CheckoutPage from "../pages/pay/CheckoutPage";
import BookingPage from './../pages/frontend/home/product/BookingPage';
import CheckoutAuthPage from "../pages/pay/CheckoutAuthPage";
import PaymentSuccessPage from './../pages/pay/PaymentSuccessPage';

const RouterFrontend = [
  { path: "/", element: <Home /> }, 
  { path: "/Promotion", element: <Promotion /> }, 
  { path: "/Event", element: <Event /> },
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
  { path: "/SeatSelection", element: <SeatSelection /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/checkout-auth", element: <CheckoutAuthPage /> },
  { path: "/booking/:id", element: <BookingPage  /> },
  { path: "/payment-success", element: <PaymentSuccessPage />}, 
];

export default RouterFrontend;