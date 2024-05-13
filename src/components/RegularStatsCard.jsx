import React from 'react';
import { FaClipboardUser, FaUserGroup, FaUserPlus } from 'react-icons/fa6';

const RegularStatsCard = ({ title, value, iconData }) => {
  const icon =
    iconData == 'attendance' ? (
      <FaClipboardUser
        style={{ color: 'white', height: '60%', width: 'auto' }}
      />
    ) : iconData == 'newMembers' ? (
      <FaUserPlus style={{ color: 'white', height: '60%', width: 'auto' }} />
    ) : iconData == 'renewedMembers' ? (
      <FaUserGroup style={{ color: 'white', height: '60%', width: 'auto' }} />
    ) : null;
  return (
    <div
      style={{
        height: '90px',
        width: '250px',
        borderRadius: '10px',
        border: '1px solid #262626',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
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
        <h1 style={{ color: '#ACACAC', fontSize: '12px' }}>{title}</h1>
        <h1 style={{ color: 'white', fontSize: '30px' }}>{value}</h1>
      </div>
    </div>
  );
};

export default RegularStatsCard;
