
import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaPause } from 'react-icons/fa';

function App() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
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
    setTotalSeconds(inputMinutes * 60);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputMinutes(inputValue === '' ? 0 : Math.max(0, parseInt(inputValue, 10)));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      startTimer();
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="App bg-[#1B222E] w-full h-screen flex flex-col items-center justify-center">
      <div className='w-[75%] '>
        <label htmlFor="minutes" className='text-[#4b6ca4] block mb-4 text-left'>Enter Minutes</label>
        <input
          type="text"
          id="minutes"
          value={inputMinutes}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className='w-full px-4 py-1 border border-solid border-slate-600  rounded bg-[#1B222E] text-white'
        />
        <div className='py-4 flex sm:items-center sm:justify-center px-7  md:px-0'>
          <span className='text-[#05ABCD] text-4xl font-bold'>
            {isActive ? (
              <button onClick={pauseTimer}>
                <FaPlayCircle />
              </button>
            ) : (
              <button onClick={startTimer}>
                <FaPlayCircle />
              </button>
            )}
          </span>
          <span>
            <h1 className='w-[20px] h-[30px] px-[10px] text-[#05ABCD] text-2xl font-bold '>{formatTime(totalSeconds)}</h1>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;

