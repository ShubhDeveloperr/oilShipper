import React, { useState } from 'react';
import { FaBars, FaChevronLeft, FaTachometerAlt, FaList, FaFileAlt, FaRegNewspaper, FaTicketAlt } from 'react-icons/fa';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import './sidebar.css';
import Header from '../Header/header';
import { logout } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';
import Footer from '../Footer/footer';
import ShipperDropdown from '../Header/shipperDropDown';
import styles from './sidebar.module.css'

type SidebarProps = {
  activeRoute: string;
};

const Sidebar: React.FC<SidebarProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleManageSecurity = () => {
    console.log('Manage Security clicked');
  };

  const handleChangePassword = () => {
    console.log('Change Password clicked');
  };

  const handleLogout = () => {
    console.log('Log Out clicked');
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.layout}>
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <img src='https://test.natgashub.com/Assets/NatGasHub-Logo1.svg' alt='logo' className={styles.companylogo} />
        </div>
        <nav className={styles.navbar}>
          <ul>
            <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? `${styles.activeLink}` : '')} end><FaTachometerAlt /> {collapsed ? '' : 'Dashboard'}</NavLink></li>
            <li><NavLink to="/noms" className={({ isActive }) => (isActive ? `${styles.activeLink}` : '')}><FaList /> {collapsed ? '' : 'Noms'}</NavLink></li>
            <li><NavLink to="/schedules" className={({ isActive }) => (isActive ? `${styles.activeLink}` : '')}><FaFileAlt /> {collapsed ? '' : 'Schedules'}</NavLink></li>
            <li><NavLink to="/product-transfer" className={({ isActive }) => (isActive ? `${styles.activeLink}` : '')}><FaTicketAlt /> {collapsed ? '' : 'Product Transfer'}</NavLink></li>
            <li><NavLink to="/tickets" className={({ isActive }) => (isActive ? `${styles.activeLink}` : '')}><FaTicketAlt /> {collapsed ? '' : 'Tickets'}</NavLink></li>
            <li><NavLink to="/allocations" className={({ isActive }) => (isActive ? `${styles.activeLink}` : '')}><FaList /> {collapsed ? '' : 'Allocations'}</NavLink></li>
            <li><NavLink to="/bulletins" className={({ isActive }) => (isActive ? `${styles.activeLink}` : '')}><FaRegNewspaper /> {collapsed ? '' : 'Bulletins'}</NavLink></li>
            <li><NavLink to="/tariffs" className={({ isActive }) => (isActive ? `${styles.activeLink}` : '')}><FaFileAlt /> {collapsed ? '' : 'Tariffs'}</NavLink></li>
            {/* <li><NavLink to="/" onClick={()=>logout} className={({ isActive }) => (isActive ? `${styles.activeLink}` : '')}><FaFileAlt /> {collapsed ? '' : 'Logout'}</NavLink></li> */}
          </ul>
        </nav>
      </div>
      <div className={styles.mainContent}>
        {/* toggle button */}
        <div className={styles.topHeader}>
          <div className={styles.togBtn}>
            <button className={styles.toggleBtn} onClick={toggleSidebar}>
              {collapsed ? <FaBars /> : <FaChevronLeft />}
            </button>
          <ShipperDropdown />
          </div>

        {/* //header */}
        <Header
          shipperName="Enercross LLC"
          shipperId="078711334"
          userName="Shubham Saxena"
          onManageSecurity={handleManageSecurity}
          onChangePassword={handleChangePassword}
          onLogout={handleLogout}
          />
          </div>
        {/* Routes all screens */}
        <Outlet />
        {/* footer */}
        <div className={styles.foooter}>
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
