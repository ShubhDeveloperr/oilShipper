import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
import { logout } from "../../../store/authSlice";
import "./logout.css"

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };

  return (
    <button className="logoutBtn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
