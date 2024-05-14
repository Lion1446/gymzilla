import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitForm = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://gymzilla.onrender.com/users?username=' +
          username +
          '&password=' +
          password,
        { method: 'GET' }
      );
      const data = await response.json();
      if (data.length > 0) {
        console.log('Login successful');
        navigate('/dashboard', { replace: true });
      } else {
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      className="flex items-center bg-white dark:bg-gray-900"
      style={{
        width: '500px',
        height: '500px',
        backgroundColor: '#141414',
        borderRadius: '10px',
      }}
    >
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-white dark:text-gray-200">
              Welcome to Gymzilla
            </h1>
            <p className="text-slate-100">Sign in to access your account</p>
          </div>
          <div className="m-7">
            <form onSubmit={submitForm}>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-300"
                >
                  Username
                </label>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="John316"
                  autoComplete="username"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-300">
                    Password
                  </label>
                  <a
                    href="#!"
                    className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-red-600 rounded-md focus:bg-red-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{' '}
                <button
                  type="button"
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Sign up
                </button>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
