import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { setTwoFactorAuthenticated } from "../store/authSlice";
import './twoFactorAuth.css';
import { setToken, setTwoFactorAuthenticated } from "../../../store/authSlice";
import CustomModal from "../../../helpers/models/model";

const TwoFactorVerification: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerify = () => {
    const hardcodedCode = "911085"; 
    if (code === hardcodedCode) {
      dispatch(setTwoFactorAuthenticated(true));
      navigate("/dashboard");
    } else {
      setShowModal(true);
    }
  };

  const cancelAuth =()=>{
    dispatch(setToken(''))
    navigate('/login')    
  }

  const handleModalClose = () => {
    setShowModal(false);
  };


  return (
    <div className="two-factor-container">
      <CustomModal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Verification failed"
        message="Invalid verification code. Please try again."
      />
      <img src="https://test.natgashub.com/Assets/OrangeNom1DoneLogo.jpg" height={200} width={300} alt="Logo" className="factlogo" />
      <h2>2 Factor Verification</h2>
      <p>A verification code has been sent to your email address. Please enter the code below to log in.</p>
      <Form.Group controlId="form2faCode" className="w-100 mb-2" >
        <Form.Control
          type="text"
          placeholder="Enter 2 factor verification code here"
          value={code}
          className="facInpt"
          onChange={(e) => setCode(e.target.value)}
        />
      </Form.Group>
      <div className="button-group">
        <Button className="facBtn" onClick={handleVerify}>Verify</Button>
        <Button className="facBtn" onClick={cancelAuth}>Cancel</Button>
        <Button className="facBtn">Resend</Button>
      </div>
    </div>
  );
};

export default TwoFactorVerification;
