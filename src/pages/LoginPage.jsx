import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/login-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        agnItems: 'center',
      }}
    >
      <div
        style={{
          width: '300px',
          height: '100vh',
          backgroundColor: '#0B0B0B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="/Gymzilla_logo 1.png" alt="gymzilla-logo" />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
