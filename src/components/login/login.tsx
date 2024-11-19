import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useAuth } from "../../provider/authProvider";
import { loginUser } from "../../store/authThunk";
import CustomModal from "../../helpers/models/model";
import './login.css';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [requiredError, setRequiredError] = useState<{ email: boolean; password: boolean }>({ email: false, password: false });

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!login || !password) {
      setRequiredError({
        email: !login,
        password: !password,
      });
      // setShowModal(true);
      return;
    }

    if (!captchaVerified) {
      setShowModal(true);
    } else {
      await dispatch(loginUser({ email: login.trim(), password: password.trim() }));
      navigate("/2fa");
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const forgetPassword = () => {
    navigate("/forget-password");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="login-container">
      <CustomModal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Recaptcha verification failed"
        message="Please verify reCAPTCHA."
      />
      <div className="login-logo">
        <img src="https://test.natgashub.com/Assets/NatGasHub-Logo1.svg" alt="oilShipper Logo" />
      </div>
      <div>


        <p className="login-header">Sign in to start your session</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="inForm-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="icon email-icon" />
              <input
                type="email"
                placeholder="Email"
                value={login}
                onChange={(e) => setLogin(e.target.value.trim())}
                onFocus={() => setRequiredError({ ...requiredError, email: false })}
                className={`logInput ${requiredError.email ? 'error' : ''}`}
              />
            </div>
            {requiredError.email && <span className="error-text">Required*</span>}
          </div>

          <div className="inForm-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="icon lock-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                autoComplete="true"
                onChange={(e) => setPassword(e.target.value.trim())}
                onFocus={() => setRequiredError({ ...requiredError, password: false })}
                className={`logInput ${requiredError.password ? 'error' : ''}`}
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {requiredError.password && <span className="error-text">Required*</span>}
          </div>

          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleCaptchaChange}
            />
          </div>

          <div className="form-footer">
            <div className="rememberMe">
              <input type="checkbox" className="checkBoxRem" /> Remember Me
            </div>
            <span onClick={forgetPassword} className="forgot-link" style={{ cursor: "pointer", color: "#FF6C3A" }}>
              Can't access your account?
            </span>
          </div>

          <div className="login-btns">
            <button type="submit" className="login-button">Log in</button>
            <button type="button" className="sso-button">Sign in with SSO (Single Sign On)</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
