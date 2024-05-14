import React from 'react';
import { FaGaugeHigh, FaGear, FaUser, FaClipboardUser } from 'react-icons/fa6';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const SideNavBar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log('logout');
    navigate('/', { replace: true });
  };
  const linkClass = ({ isActive }) =>
    isActive ? 'bg-[#D32029]' : 'bg-[#0F0F0F]';
  return (
    <div
      style={{
        backgroundColor: '#0F0F0F',
        flex: 1,
        borderRight: '1px solid #262626',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src="/Gymzilla_logo 1.png" alt="gymzilla-logo" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '30px',
          }}
        >
          <NavLink
            className={linkClass}
            to="/dashboard"
            end
            activeClassName="active"
            style={{
              color: 'white',
              height: '42px',
              width: '220px',
              padding: '9px 24px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaGaugeHigh style={{ marginRight: '10px' }} />
            Dashboard
          </NavLink>
          <NavLink
            className={linkClass}
            to="/dashboard/attendances"
            style={{
              color: 'white',
              height: '42px',
              width: '220px',
              padding: '9px 24px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaClipboardUser style={{ marginRight: '10px' }} />
            Attendances
          </NavLink>
          <NavLink
            className={linkClass}
            to="/dashboard/members"
            style={{
              color: 'white',
              height: '42px',
              padding: '9px 24px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaUser style={{ marginRight: '10px' }} />
            Members
          </NavLink>
          <NavLink
            className={linkClass}
            to="/dashboard/settings"
            style={{
              color: 'white',
              height: '42px',
              padding: '9px 24px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaGear style={{ marginRight: '10px' }} />
            Settings
          </NavLink>
        </div>
      </div>
      <button
        onClick={() => {
          handleLogOut();
        }}
        style={{ color: '#D32029', marginBottom: '20px' }}
      >
        Log out
      </button>
    </div>
  );
};

export default SideNavBar;
