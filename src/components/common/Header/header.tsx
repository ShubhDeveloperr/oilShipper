import "./header.css";
import ShipperDropdown from "./shipperDropDown";
import UserNotifications from "./userNotifications";
import UserProfile from "./userProfile";

type HeaderProps = {
  shipperName: string;
  shipperId: string;
  userName: string;
  onManageSecurity: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
};

const Header = ({
  shipperName,
  shipperId,
  userName,
  onManageSecurity,
  onChangePassword,
  onLogout,
}: HeaderProps) => {
  return (
    <div className="header-container">
      <ShipperDropdown />
      <div className="header-right">
        <UserNotifications />
        <UserProfile
          shipperName={shipperName}
          shipperId={shipperId}
          userName={userName}
          onManageSecurity={onManageSecurity}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
};

export default Header;
