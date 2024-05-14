import React, { useContext, useState } from 'react';
import SearchMember from '../components/SearchMember';
import { DashboardContext } from '../layouts/MainLayout';
import MembershipCardMember from '../components/MembershipCardMember';
import { useNavigate } from 'react-router-dom';

const LogsPage = () => {
  const data = useContext(DashboardContext);
  const members = data['members'];
  const attendances = data['attendances'];
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  function getAttendanceDetails(members, attendances) {
    if (!members || !members) return 0;
    if (!attendances || !attendances) return 0;
    const membersMap = new Map(members.map(member => [member.id, member]));
    const attendanceDetails = [];
    attendances.forEach(attendance => {
      const member = membersMap.get(attendance.idNumber);
      if (member) {
        const name = `${member.firstName} ${
          member.middleName ? member.middleName + ' ' : ''
        }${member.lastName}`;
        const datetimeAttendance = new Date(
          attendance.datetimeLogged
        ).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });

        attendanceDetails.push({ name, datetimeAttendance });
      }
    });
    attendanceDetails.sort(
      (a, b) => new Date(b.datetimeAttendance) - new Date(a.datetimeAttendance)
    );
    return attendanceDetails;
  }

  const attendanceDetails = getAttendanceDetails(members, attendances);

  const handleSelectedMember = loggedMember => {
    setSelectedMember(loggedMember);
  };

  const createAttendance = async newAttendance => {
    // await fetch('/api/logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'applications/json' },
    //   body: JSON.stringify(newAttendance),
    // });
    await fetch('https://gymzilla.onrender.com/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'applications/json' },
      body: JSON.stringify(newAttendance),
    });
    return;
  };

  const handleLogAttendance = async log => {
    if (log) {
      const newAttendance = {
        idNumber: selectedMember.id,
        datetimeLogged: new Date().toISOString().slice(0, -5) + 'Z',
      };
      await createAttendance(newAttendance);
      navigate(0);
    } else {
      console.log('Do nothing');
    }
  };

  return (
    <div
      style={{
        flex: 6,
        backgroundColor: '#0F0F0F',
        height: '100vh',
        color: 'white',
        display: 'flex',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 7,
          alignItems: 'center',
          padding: '30px',
        }}
      >
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>
          Log New Attendance
        </h1>
        <div style={{ display: 'flex' }}>
          <SearchMember memberData={members} onSelect={handleSelectedMember} />
          <button
            style={{
              backgroundColor: '#D32029',
              width: '150px',
              fontSize: '18px',
              marginLeft: '10px',
            }}
            onClick={() => {
              handleLogAttendance(selectedMember);
            }}
          >
            Log
          </button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 4,
          alignItems: 'center',
          padding: '30px',
        }}
      >
        <h1 style={{ fontSize: '32px' }}>Recent Logs Today</h1>
        <div style={{ width: '300px', overflowY: 'scroll' }}>
          {attendanceDetails === null
            ? null
            : Array.isArray(attendanceDetails)
            ? attendanceDetails
                .slice(0, 10)
                .map((att, index) => (
                  <MembershipCardMember
                    isFormattedDate={false}
                    key={index}
                    name={att.name}
                    date={att.datetimeAttendance}
                  />
                ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default LogsPage;
