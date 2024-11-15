import React from 'react';
import './model.css';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="cModal-overlay" onClick={onClose}>
      <div className="cModal-content" onClick={(e) => e.stopPropagation()}>
        {/* <button className="cModal-close-btn" onClick={onClose} aria-label="Close">&times;</button> */}
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="cModal-footer-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomModal;
