import { Dropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import styles from "./userProfile.module.css";


type HeaderProps = {
  shipperName: string;
  shipperId: string;
  userName: string;
  onManageSecurity: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
};

export default function UserProfile({
  shipperName,
  shipperId,
  userName,
  onManageSecurity,
  onChangePassword,
  onLogout,
}: HeaderProps) {
  return (
    <div className={styles.headerShipper}>
        <div className={styles.headerRight}>
          <Dropdown align="end" className="header-dropdown">
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="header-dropdown-toggle"
            >
              <span className="dropdown-title">
                Shipper: {shipperName || "Enercross LLC"} (
                {shipperId || "078711334"})
              </span>
              <FaUser className="user-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="header-dropdown-menu">
              <div className="dropdown-user">
                <strong>{userName}</strong>
              </div>
              <div className="dropdown-support">Support</div>
              <div className="dropdown-item-all">
                <Dropdown.Item
                  onClick={onManageSecurity}
                  className="dropdown-item"
                >
                  Manage Security
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={onChangePassword}
                  className="dropdown-item"
                >
                  Change Password
                </Dropdown.Item>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={onLogout}
                className="dropdown-item logout-item"
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
    </div>
  );
}
