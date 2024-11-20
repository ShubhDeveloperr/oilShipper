import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Sidebar from "../components/common/Sidebar/sidebar";

export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isTwoFactorAuthenticated = useSelector((state: RootState) => state.auth.isTwoFactorAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && !isTwoFactorAuthenticated) {
    return <Navigate to="/2fa" />;
  }

  return (
    <>
      <Sidebar activeRoute="dashboard" />
    </>
  );
};
