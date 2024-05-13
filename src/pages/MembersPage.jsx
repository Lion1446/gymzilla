import React, { useContext } from 'react';
import { DashboardContext } from '../layouts/MainLayout';
import MembershipCardMember from '../components/MembershipCardMember';

const MembersPage = () => {
  const data = useContext(DashboardContext);
  const members = data['members'];

  function addDays(date, days) {
    const newDate = new Date(date);
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const daysInMilliseconds = days * millisecondsPerDay;
    const newDateMilliseconds = newDate.getTime() + daysInMilliseconds;
    return new Date(newDateMilliseconds);
  }
  const getTotalMembersThisMonth = members => {
    if (!members || !Array.isArray(members)) {
      return 0;
    }

    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Months are zero-based, so add 1
    const currentYear = today.getFullYear();

    const membersThisMonth = members.filter(member => {
      const membershipDate = new Date(member.datetimeOfMembership);
      return (
        membershipDate.getMonth() + 1 === currentMonth &&
        membershipDate.getFullYear() === currentYear
      );
    });

    return membersThisMonth;
  };

  function getExpiringMemberships(members) {
    if (!members || !members.length) return [];
    const currentDate = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(currentDate.getDate() + 7); // Next week from current date

    return members.reduce((expiringMemberships, member) => {
      const renewalDate = new Date(member.datetimeOfRenewal);
      const expirationDate = new Date(renewalDate);
      expirationDate.setDate(
        renewalDate.getDate() + member.membershipValidityDays
      );

      // Check if expiration date is within the next 7 days or less
      const daysUntilExpiration = Math.ceil(
        (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
      );
      if (daysUntilExpiration <= 7 && daysUntilExpiration >= 0) {
        return [...expiringMemberships, member];
      } else {
        return expiringMemberships;
      }
    }, []);
  }

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

  const newMembers = getTotalMembersThisMonth(members);
  const expiringMembers = getExpiringMemberships(members);
  const expiredMembers = getExpiredMembers(members);
  return (
    <div
      style={{
        flex: 6,
        backgroundColor: '#0F0F0F',
        height: '100vh',
        color: 'white',
        padding: '30px 30px',
        overflowY: 'scroll',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: '20px',
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '18px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Expired Membership
          </h1>
          {expiredMembers === null
            ? null
            : Array.isArray(expiredMembers)
            ? expiredMembers.map(member => (
                <MembershipCardMember
                  isFormattedDate={true}
                  key={member.id}
                  name={member.firstName + ' ' + member.lastName}
                  date={addDays(
                    member.datetimeOfRenewal,
                    member.membershipValidityDays
                  )}
                />
              ))
            : null}
        </div>
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: '20px',
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '18px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Expiring Membership
          </h1>
          {expiringMembers === null
            ? null
            : Array.isArray(expiringMembers)
            ? expiringMembers.map(member => (
                <MembershipCardMember
                  isFormattedDate={true}
                  key={member.id}
                  name={member.firstName + ' ' + member.lastName}
                  date={addDays(
                    member.datetimeOfRenewal,
                    member.membershipValidityDays
                  )}
                />
              ))
            : null}
        </div>
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: '20px',
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '18px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            New Members
          </h1>
          {newMembers === null
            ? null
            : Array.isArray(newMembers)
            ? newMembers.map(member => (
                <MembershipCardMember
                  isFormattedDate={true}
                  key={member.id}
                  name={member.firstName + ' ' + member.lastName}
                  date={member.datetimeOfRenewal}
                />
              ))
            : null}
          <button
            onClick={() => {
              alert(
                'Sorry. Functionality currently not supported due to time constraints.'
              );
            }}
            style={{
              padding: '8px 12px',
              backgroundColor: '#D32029',
              color: 'white',
            }}
          >
            Add New Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
