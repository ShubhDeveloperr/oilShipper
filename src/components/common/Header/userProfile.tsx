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
          <Dropdown align="end" className={styles.headerDropdown}>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className={styles.headerDropdownToggle}
            >
              <span className={styles.dropdownTitle}>
                Shipper: {shipperName || "Enercross LLC"} (
                {shipperId || "078711334"})
              </span>
              <FaUser className={styles.userIcon} />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.headerDropdownMenu}>
              <div className={styles.dropdownUser}>
                <strong>{userName}</strong>
              </div>
              <div className={styles.dropdownSupport}>Support</div>
              <div className={styles.dropdownItemAll}>
                <Dropdown.Item
                  onClick={onManageSecurity}
                  className={styles.dropdownItem}
                >
                  Manage Security
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={onChangePassword}
                  className={styles.dropdownItem}
                >
                  Change Password
                </Dropdown.Item>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={onLogout}
                className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
    </div>
  );
}
