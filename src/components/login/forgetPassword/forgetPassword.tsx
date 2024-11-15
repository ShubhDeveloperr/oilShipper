import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./forgetPassword.css";
import { useDispatch } from "react-redux";
import { setToken } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../../../helpers/models/model";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [requiredError, setRequiredError] = useState<{ email: boolean }>({ email: false });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email == "") {
      setRequiredError({
        email: !email,
      });
      // setShowModal(true);
      return;
    }

    if (!captchaVerified) {
      setShowModal(true);
    }

    if (captchaVerified && email) {
      console.log("Form submitted with email:", email);
    } 
  };

  const handleCancel = () => {
        dispatch(setToken(''))
        navigate('/login')     
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="forgot-password-container">
      <CustomModal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Recaptcha verification failed"
        message="Please verify reCAPTCHA."
      />
      <div className="fPlogo">
        <img
          src="https://test.natgashub.com/Assets/NatGasHub-Logo1.svg"
          alt="NatGasHub Logo"
          className="fpImg"
        />
      </div>
      <h2 className="title">Forgot Password?</h2>
      <p className="subtitle">
        To recover your account, begin by entering your email.
      </p>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="mainWrapper">
        <div className="inputWrapper">
        {/* <FontAwesomeIcon icon={faEnvelope} className="icon email-icon" /> */}
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setRequiredError({ email: false })}
            placeholder="Email"
            className="email-input"
          />
        </div>
        {requiredError.email && <span className="error-text">Required*</span>}
        </div>
        <div className="captcha-container-f">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleCaptchaChange}
          />
        </div>
        <div className="button-group">
          <button type="submit" className="next-button">Next</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
