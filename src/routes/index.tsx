import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import LoginForm from "../components/login/login";
import Dashboard from "../components/core/dashboard/dashboard";
import TwoFactorVerification from "../components/login/twoFactorAuth/twoFactorAuth";
import { ProtectedRoute } from "./protectedRoute";
import ForgotPassword from "../components/login/forgetPassword/forgetPassword";

// AuthRedirect Component: Redirects authenticated users away from login and 2FA routes
const AuthRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isTwoFactorAuthenticated = useSelector((state: RootState) => state.auth.isTwoFactorAuthenticated);
  
  if (isAuthenticated && isTwoFactorAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  // if (!isAuthenticated ) {
  //   return <Navigate to="/login" replace />;
  // }
  
  return <>{children}</>;
};

const Routes = () => {
  const routes = [
    {
      path: "/login",
      element: (
        <AuthRedirect>
          <LoginForm />
        </AuthRedirect>
      ),
    },
    {
      path: "/2fa",
      element: (
        <AuthRedirect>
          <TwoFactorVerification />
        </AuthRedirect>
      ),
    },
    {
      path: "/forget-password",
      element: (
        <AuthRedirect>
          <ForgotPassword />
        </AuthRedirect>
      ),
    },
    {
      path: "/",
      element: <ProtectedRoute />, 
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "noms", element: <div style={{textAlign:"center"}}>Noms Page</div> },
        { path: "schedules", element: <div style={{textAlign:"center"}}>Schedules Page</div> },
        { path: "product-transfer", element: <div style={{textAlign:"center"}}>Product Transfer Page</div> },
        { path: "tickets", element: <div style={{textAlign:"center"}}>Tickets Page</div> },
        { path: "allocations", element: <div style={{textAlign:"center"}}>Allocations Page</div> },
        { path: "bulletins", element: <div style={{textAlign:"center"}}>Bulletins Page</div> },
        { path: "tariffs", element: <div style={{textAlign:"center"}}>Tariffs Page</div> },
        { path: "profile", element: <div style={{textAlign:"center"}}>User Profile</div> },
        {
          path: "/",
          element: <Navigate to="/login" replace />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Routes;
