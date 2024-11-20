import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
   const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <span className="footer-helpdesk">
          Helpdesk: <a href="mailto:OilPro@OilShipperHub.com">OilPro@OilShipperHub.com</a>
        </span>
        <span className="footer-contact">713.999.1188</span>
      </div>
      <div className="footer-bottom">
        SOC2 Certified. Penetration Tested. Nom One & Done™. Sharing data is a violation of
        confidentiality agreement. Copyright ©{currentYear}.
      </div>
    </footer>
  );
};

export default Footer;
