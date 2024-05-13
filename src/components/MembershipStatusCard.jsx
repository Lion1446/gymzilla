import React, { useContext } from 'react';
import MembershipCardMember from './MembershipCardMember';
import { FaArrowRight } from 'react-icons/fa6';
import { DashboardContext } from '../layouts/MainLayout';

const MembershipStatusCard = ({ title, type }) => {
  const data = useContext(DashboardContext);

  function getExpiredMembers(members) {
    if (!members || !members) return 0;
    const currentDate = new Date();
    const expiredMembers = [];

    members.forEach(member => {
      const renewalDate = new Date(member.datetimeOfRenewal);
      const expirationDate = new Date(renewalDate);
      expirationDate.setDate(
        renewalDate.getDate() + member.membershipValidityDays
      );

      if (expirationDate < currentDate) {
        expiredMembers.push(member);
      }
    });

    return expiredMembers;
  }

  function getMembershipsAboutToExpire(members) {
    if (!members || !members) return 0;

    const currentDate = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(currentDate.getDate() + 7); // Next week from current date

    return members.filter(member => {
      const renewalDate = new Date(member.datetimeOfRenewal);
      const expirationDate = new Date(renewalDate);
      expirationDate.setDate(
        renewalDate.getDate() + member.membershipValidityDays
      );

      // Check if expiration date is within the next 7 days
      const daysUntilExpiration = Math.ceil(
        (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
      );
      return daysUntilExpiration <= 7 && daysUntilExpiration >= 0;
    });
  }
  const getMembersWithRenewalWithinMonth = members => {
    if (!members || !members) return 0;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const currentYear = currentDate.getFullYear();

    return members.filter(datum => {
      const renewalDate = new Date(datum.datetimeOfRenewal);
      const renewalMonth = renewalDate.getMonth() + 1; // Months are zero-based, so add 1
      const renewalYear = renewalDate.getFullYear();

      return renewalMonth === currentMonth && renewalYear === currentYear;
    });
  };

  function addDays(date, days) {
    // Clone the original date to avoid mutating it
    const newDate = new Date(date);

    // Get the milliseconds equivalent of the number of days
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const daysInMilliseconds = days * millisecondsPerDay;

    // Add the milliseconds equivalent of days to the original date
    const newDateMilliseconds = newDate.getTime() + daysInMilliseconds;

    // Create a new Date object from the result and return it
    return new Date(newDateMilliseconds);
  }

  const membersToShow =
    type == 'expired'
      ? getExpiredMembers(data['members'])
      : type == 'expiring'
      ? getMembershipsAboutToExpire(data['members'])
      : type == 'new'
      ? getMembersWithRenewalWithinMonth(data['members'])
      : null;
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

      {membersToShow !== null && membersToShow.length > 0
        ? membersToShow
            .slice(0, 2)
            .map(member => (
              <MembershipCardMember
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaArrowRight style={{ color: '#F27370', margin: '10px' }} />
        <p style={{ color: '#F27370' }}>View All</p>
      </div>
    </div>
  );
};

export default MembershipStatusCard;
