import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import './header.css';

type HeaderProps = {
    shipperName: string;
    shipperId: string;
    userName: string;
    onManageSecurity: () => void;
    onChangePassword: () => void;
    onLogout: () => void;
};

const Header: React.FC<HeaderProps> = ({
    shipperName,
    shipperId,
    userName,
    onManageSecurity,
    onChangePassword,
    onLogout,
}) => {
    return (
        <div className="header-container">
            <div className="header-left">
                <input type="text" placeholder="Batch Code" className="batch-code-input" />
                <button className="batch-search-btn">Batch Search</button>
            </div>
            <div className="header-right">
                <div> <span className="header-icon">8</span> <span>Third Party</span></div>
                <div> <span className="header-icon">99+</span> <span>Alerts</span></div>
                <div> <span className="header-icon">1</span> <span>Bulletins</span></div>
                <div className="header-shipper">
                    <div className="">
                        <div className="header-right">
                            <Dropdown align="end" className="header-dropdown">
                                <Dropdown.Toggle variant="light" id="dropdown-basic" className="header-dropdown-toggle">
                                    <span className="dropdown-title">
                                        Shipper: {shipperName || 'Enercross LLC'} ({shipperId || '078711334'})
                                    </span>
                                    <FaUser className="user-icon" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="header-dropdown-menu">
                                    <div className="dropdown-user">
                                        <strong>{userName}</strong>
                                    </div>
                                    <div className="dropdown-support">Support</div>
                                    <div className='dropdown-item-all'>
                                        <Dropdown.Item onClick={onManageSecurity} className="dropdown-item">
                                            Manage Security
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={onChangePassword} className="dropdown-item">
                                            Change Password
                                        </Dropdown.Item>
                                    </div>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={onLogout} className="dropdown-item logout-item">
                                        Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
