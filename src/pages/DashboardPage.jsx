import React, { useContext } from 'react';
import { FaBell } from 'react-icons/fa6';
import RegularStatsCard from '../components/RegularStatsCard';
import ColoredStatsCard from '../components/ColoredStatsCard';
import LineChart from '../components/LineChart';
import DateTimeDisplay from '../components/TimeDisplay';
import MembershipStatusCard from '../components/MembershipStatusCard';
import { DashboardContext } from '../layouts/MainLayout';
import Modal from '../components/Modal';

const DashboardPage = () => {
  let data = useContext(DashboardContext);
  let members = data['members'];
  let attendances = data['attendances'];

  const getTodaysAttendance = logs => {
    if (!logs || !Array.isArray(logs)) {
      return 0;
    }
    const today = new Date();
    const options = { timeZone: 'Asia/Manila' }; // Set the timezone to Philippine time
    const todayString = today.toLocaleDateString('en-US', options); // Get today's date in mm/dd/yyyy format

    const todaysLogs = logs.filter(log => {
      const logDate = new Date(log.datetimeLogged);
      const logDateString = logDate.toLocaleDateString('en-US', options); // Get the date part of the log's datetimeLogged
      return logDateString === todayString;
    });
    return todaysLogs.length;
  };

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

  const getMembersWithRenewalWithinMonth = data => {
    if (!data || !data.length) return []; // Return an empty array if data is falsy or empty

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const currentYear = currentDate.getFullYear();

    return data.filter(datum => {
      const renewalDate = new Date(datum.datetimeOfRenewal);
      const renewalMonth = renewalDate.getMonth() + 1; // Months are zero-based, so add 1
      const renewalYear = renewalDate.getFullYear();

      return renewalMonth === currentMonth && renewalYear === currentYear;
    });
  };

  function getActiveMembersCount(members) {
    if (!members || !members) return 0;
    const currentDate = new Date();

    return members.reduce((count, member) => {
      const renewalDate = new Date(member.datetimeOfRenewal);
      const expirationDate = new Date(renewalDate);
      expirationDate.setDate(
        renewalDate.getDate() + member.membershipValidityDays
      );

      if (expirationDate > currentDate) {
        return count + 1; // Increment count if member is active
      } else {
        return count; // Do not increment count if member is not active
      }
    }, 0);
  }

  function getExpiringMemberships(members) {
    if (!members || !members.length) return []; // Return an empty array if members is falsy or empty
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
        // Add the expiring membership to the array of expiring memberships
        return [...expiringMemberships, member];
      } else {
        return expiringMemberships; // Do not modify the array if the membership is not expiring within next 7 days
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

  const todaysAttendance = getTodaysAttendance(attendances);
  const totalMembersThisMonth = getTotalMembersThisMonth(members);
  const membersWithRenewalWithinMonth =
    getMembersWithRenewalWithinMonth(members);
  const activeMembersCount = getActiveMembersCount(members);
  const expiringMemberships = getExpiringMemberships(members);
  const expiredMemberships = getExpiredMembers(members);

  return (
    <div
      style={{
        flex: 6,
        backgroundColor: '#0F0F0F',
        height: '100vh',
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          borderBottom: '1px solid #262626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Modal members={data['members']} />
        <FaBell
          style={{ margin: '0px 30px', height: '24px', color: 'white' }}
        />
        <div
          style={{
            display: 'flex',
            borderLeft: '1px solid white',
            alignItems: 'center',
            color: 'white',
            padding: '8px 30px',
          }}
        >
          <img
            src="src/assets/lion_diaz.png"
            alt="lion_diaz.png"
            width="35px"
            height="35px"
          />
          <p style={{ margin: '0px 10px' }}>Lionelle Diaz</p>
        </div>
      </div>
      <div
        style={{
          flex: 10,
          borderBottom: '1px solid #262626',
          padding: '30px',
          display: 'flex',
        }}
      >
        <div style={{ flex: '8' }}>
          <h1 style={{ color: 'white', fontSize: '32px' }}>
            Good day, Lionelle!
          </h1>
          <h3 style={{ color: 'white', fontSize: '16px', margin: '10px 0px' }}>
            Overview
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '10px',
            }}
          >
            <RegularStatsCard
              title="Today's Attendance"
              value={todaysAttendance}
              iconData="attendance"
            />
            <RegularStatsCard
              title="New members this month"
              value={totalMembersThisMonth.length}
              iconData="newMembers"
            />
            <RegularStatsCard
              title="Renewed members this month"
              value={membersWithRenewalWithinMonth.length}
              iconData="renewedMembers"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <ColoredStatsCard
              title={'Total active members'}
              value={activeMembersCount}
              iconData={'activeMembers'}
              backgroundColor="#2E3C10"
            />
            <ColoredStatsCard
              title={'Expiring memberships'}
              value={expiringMemberships.length}
              iconData={'expiringMembers'}
              backgroundColor="#442A11"
            />
            <ColoredStatsCard
              title={'Expired membersips'}
              value={expiredMemberships.length}
              iconData={'expiredMembers'}
              backgroundColor="#431418"
            />
          </div>
          <div>
            <LineChart />
          </div>
        </div>
        <div style={{ flex: '3' }}>
          <div style={{ marginBottom: '20px' }}>
            <DateTimeDisplay />
          </div>
          <MembershipStatusCard
            membersToShow={expiredMemberships}
            title="Expired Membership"
            type="expired"
          />
          <MembershipStatusCard
            membersToShow={expiringMemberships}
            title="Expiring Membership"
            type="expiring"
          />
          <MembershipStatusCard
            membersToShow={totalMembersThisMonth}
            title="New members this month"
            type="new"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
