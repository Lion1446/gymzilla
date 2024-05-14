import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import MembersPage from './pages/MembersPage';
import SettingsPage from './pages/SettingsPage';
import MainLayout from './layouts/MainLayout';
import LogsPage from './pages/LogsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/app" element={<MainLayout />}>
          <Route path="dashboard/" element={<DashboardPage />} />
          <Route path="attendances/" element={<LogsPage />} />
          <Route path="members/" element={<MembersPage />} />
          <Route path="settings/" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
