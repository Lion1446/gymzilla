import React, { useContext } from 'react';
import MembershipCardMember from './MembershipCardMember';
import { FaArrowRight } from 'react-icons/fa6';
import { DashboardContext } from '../layouts/MainLayout';
import { Link } from 'react-router-dom';

const MembershipStatusCard = ({ title, type, membersToShow }) => {
  console.log(membersToShow);
  function addDays(date, days) {
    const newDate = new Date(date);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysInMilliseconds = days * millisecondsPerDay;
    const newDateMilliseconds = newDate.getTime() + daysInMilliseconds;
    return new Date(newDateMilliseconds);
  }
  return (
    <div
      style={{
        borderRadius: '10px',
        border: '1px solid #262626',
        padding: '20px',
        marginBottom: '10px',
      }}
    >
      <h1 style={{ color: 'white', fontSize: '18px' }}>{title}</h1>

      {membersToShow === null
        ? null
        : Array.isArray(membersToShow)
        ? membersToShow
            .slice(0, 2)
            .map(member => (
              <MembershipCardMember
                isFormattedDate={true}
                key={member.id}
                name={member.firstName + ' ' + member.lastName}
                date={
                  type === 'expired' || type === 'expiring'
                    ? addDays(
                        member.datetimeOfRenewal,
                        member.membershipValidityDays
                      )
                    : type === 'new'
                    ? member.datetimeOfMembership
                    : null
                }
              />
            ))
        : null}
      <Link to="/members">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaArrowRight style={{ color: '#F27370', margin: '10px' }} />
          <p style={{ color: '#F27370' }}>View All</p>
        </div>
      </Link>
    </div>
  );
};

export default MembershipStatusCard;
