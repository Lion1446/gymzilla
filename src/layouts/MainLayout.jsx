import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';

export const DashboardContext = React.createContext();

const MainLayout = () => {
  const [members, setMembers] = useState(null);
  const [attendances, setAttendances] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        let res = await fetch('/api/members');
        let data = await res.json();
        setMembers(data);
        res = await fetch('/api/logs');
        data = await res.json();
        setAttendances(data);
      } catch (e) {
        console.log('Error fetching member data', e);
      }
    };

    fetchMembers();
  }, []);
  return (
    <DashboardContext.Provider
      value={{ members: members, attendances: attendances }}
    >
      <div style={{ display: 'flex' }}>
        <SideNavBar style={{ flex: 1 }} />
        <Outlet style={{ flex: 6 }} />
      </div>
    </DashboardContext.Provider>
  );
};

export default MainLayout;
