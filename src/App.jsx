import { permittedRoutes } from "./routes";
import { Navigate, useRoutes } from "react-router-dom";
import "./App.css";  
import { DashboardLayout } from "./layouts/dashboard.layout";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgotPass/ForgotPassword";
import VerifyCode from "./pages/auth/forgotPass/VerifyCode";
import ResetPassword from "./pages/auth/forgotPass/ResetPassword";

function App() {
  const mainRoutes = {
    path: "/",
    element:  "",
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Login/> },
      // { path: "/otp", element: <OTP /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path:"/forgot-password",element: <ForgotPassword />},
      { path:"/verify-code",element: <VerifyCode  />},
      { path:"/reset-password",element: <ResetPassword />},
    ],
  };

  const routing = useRoutes([mainRoutes, ...permittedRoutes()]);

  return (
    <div className=" ">
      {routing} 
      <ToastContainer />
    </div>
  );
}

export default App;
