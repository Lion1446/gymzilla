import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const [progress, setProgress] = useState(100);
  let seconds = 5;
  const navigate = useNavigate();
  useEffect(() => {
    if (seconds <= 0) {
      setProgress(0);
      return;
    }

    const intervalId = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress === 0) {
          clearInterval(intervalId);
          navigate(-1);
          return 0;
        }
        return Math.max(0, prevProgress - 100 / seconds);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#141414]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#D32029] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="mt-8">
        <Loader />
      </div>
      <p style={{ color: 'white' }}>
        Redirecting to previous screen in {(progress / 100.0) * seconds} seconds
      </p>
    </div>
  );
};

export default NotFoundPage;
