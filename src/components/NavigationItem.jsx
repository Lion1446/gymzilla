import React from 'react';
import { FaGaugeHigh, FaUser, FaGear } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({ target }) => {
  const url = '/' + target.toLowerCase();
  const linkClass = ({ isActive }) =>
    isActive ? 'bg-[#D32029]' : 'bg-[#0F0F0F]';

  if (target == 'Dashboard') {
    return (
      <NavLink
        className={linkClass}
        to={url}
        style={{
          color: 'white',
          height: '42px',
          padding: '9px 24px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FaGaugeHigh style={{ marginRight: '10px' }} />
        {target}
      </NavLink>
    );
  } else if (target == 'Members') {
    <NavLink
      className={linkClass}
      to={url}
      style={{
        color: 'white',
        height: '42px',
        padding: '9px 24px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FaUser style={{ marginRight: '10px' }} />
      {target}
    </NavLink>;
  } else {
    <NavLink
      className={linkClass}
      to={url}
      style={{
        color: 'white',
        height: '42px',
        padding: '9px 24px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FaGear style={{ marginRight: '10px' }} />
      {target}
    </NavLink>;
  }
};

export default NavigationItem;
