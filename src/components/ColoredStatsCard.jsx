import React from 'react';
import { FaUserGroup, FaClock, FaTriangleExclamation } from 'react-icons/fa6';

const ColoredStatsCard = ({ title, value, iconData, backgroundColor }) => {
  const icon =
    iconData == 'activeMembers' ? (
      <FaUserGroup style={{ color: 'white', height: '60%', width: 'auto' }} />
    ) : iconData == 'expiringMembers' ? (
      <FaClock style={{ color: 'white', height: '60%', width: 'auto' }} />
    ) : iconData == 'expiredMembers' ? (
      <FaTriangleExclamation
        style={{ color: 'white', height: '60%', width: 'auto' }}
      />
    ) : null;
  return (
    <div
      style={{
        height: '90px',
        width: '250px',
        borderRadius: '10px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: backgroundColor,
      }}
    >
      {icon}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          marginLeft: '10px',
        }}
      >
        <h1 style={{ color: '#ACACAC', fontSize: '14px' }}>{title}</h1>
        <h1 style={{ color: 'white', fontSize: '30px' }}>{value}</h1>
      </div>
    </div>
  );
};

export default ColoredStatsCard;
