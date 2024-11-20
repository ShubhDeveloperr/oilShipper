import React, { useState } from 'react';
import { FaBars, FaChevronLeft, FaTachometerAlt, FaList, FaFileAlt, FaRegNewspaper, FaTicketAlt } from 'react-icons/fa';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './sidebar.css';
import Header from '../Header/header';
import { logout } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';
import Footer from '../Footer/footer';

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
    <div className="layout">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src='https://test.natgashub.com/Assets/NatGasHub-Logo1.svg' alt='logo' className='companylogo' />
        </div>
        <nav>
          <ul>
            <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')} end><FaTachometerAlt /> {collapsed ? '' : 'Dashboard'}</NavLink></li>
            <li><NavLink to="/noms" className={({ isActive }) => (isActive ? 'active-link' : '')}><FaList /> {collapsed ? '' : 'Noms'}</NavLink></li>
            <li><NavLink to="/schedules" className={({ isActive }) => (isActive ? 'active-link' : '')}><FaFileAlt /> {collapsed ? '' : 'Schedules'}</NavLink></li>
            <li><NavLink to="/product-transfer" className={({ isActive }) => (isActive ? 'active-link' : '')}><FaTicketAlt /> {collapsed ? '' : 'Product Transfer'}</NavLink></li>
            <li><NavLink to="/tickets" className={({ isActive }) => (isActive ? 'active-link' : '')}><FaTicketAlt /> {collapsed ? '' : 'Tickets'}</NavLink></li>
            <li><NavLink to="/allocations" className={({ isActive }) => (isActive ? 'active-link' : '')}><FaList /> {collapsed ? '' : 'Allocations'}</NavLink></li>
            <li><NavLink to="/bulletins" className={({ isActive }) => (isActive ? 'active-link' : '')}><FaRegNewspaper /> {collapsed ? '' : 'Bulletins'}</NavLink></li>
            <li><NavLink to="/tariffs" className={({ isActive }) => (isActive ? 'active-link' : '')}><FaFileAlt /> {collapsed ? '' : 'Tariffs'}</NavLink></li>
            {/* <li><NavLink to="/" onClick={()=>logout} className={({ isActive }) => (isActive ? 'active-link' : '')}><FaFileAlt /> {collapsed ? '' : 'Logout'}</NavLink></li> */}
          </ul>
        </nav>
      </div>
      <div className="main-content">
        {/* //header */}
        <Header
          shipperName="Enercross LLC"
          shipperId="078711334"
          userName="Shubham Saxena"
          onManageSecurity={handleManageSecurity}
          onChangePassword={handleChangePassword}
          onLogout={handleLogout}
        />
        {/* toggle button */}
        <div className='topHeader'>
          <div className='togBtn'>
            <button className="toggle-btn" onClick={toggleSidebar}>
              {collapsed ? <FaBars /> : <FaChevronLeft />}
            </button>
          </div>
        </div>
        {/* Routes all screens */}
        <Outlet />
        {/* footer */}
        <div className='foo-ter'>
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
