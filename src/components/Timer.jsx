import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaPause, FaSync } from 'react-icons/fa';

const Countdown = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (totalSeconds === 0) {
          clearInterval(interval);
          setIsActive(false);
        } else {
          setTotalSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, totalSeconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTotalSeconds(0);
  };

  const handleInputChange = (e) => {
    if (!isActive) {
      const minutes = Math.max(0, parseInt(e.target.value, 10));
      setTotalSeconds(minutes * 60);
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className='flex items-center justify-center'>
      {/* <h1>Countdown Timer</h1>
      <div>
        <label htmlFor="minutes">Set Timer (minutes): </label>
        <input
          type="number"
          id="minutes"
          value={Math.floor(totalSeconds / 60)}
          onChange={handleInputChange}
          disabled={isActive}
        />
      </div> */}
      <span className='text-[#05ABCD] text-4xl font-bold'>
        {isActive ? (
          <button onClick={pauseTimer}>
            <FaPause />
          </button>
        ) : (
          <button onClick={startTimer}>
            {/* <FaPlayCircle /> */}
          </button>
        )}
        {/* <button onClick={resetTimer}>
          <FaSync /> Reset
        </button> */}
      </span>
      <span>
        <h1 className='w-[20px] h-[30px] px-[10px] text-[#05ABCD] text-2xl font-bold '>{formatTime(totalSeconds)}</h1>
      </span>
    </div>
  );
};

export default Countdown;
