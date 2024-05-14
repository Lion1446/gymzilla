import React from 'react';

const MembershipCardMember = ({ name, date, isFormattedDate }) => {
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };
  const formattedDate = isFormattedDate ? formatDate(date) : date;
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid #262626',
        padding: '8px 12px',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '35px' }}>
        <img src="/arlene_mccoy.png" alt="arlene_mccoy.png" />
      </div>
      <div
        style={{
          marginLeft: '10px',
        }}
      >
        <p style={{ color: 'white' }}>{name}</p>
        <p style={{ color: '#ACACAC' }}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default MembershipCardMember;
