
import React, { useState, useEffect } from 'react';

interface TrialClockProps {
  trialEnd: Date;
}

const TrialClock: React.FC<TrialClockProps> = ({ trialEnd }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +trialEnd - +new Date();
      let newTimeLeft = '';

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        newTimeLeft = 
          (hours > 9 ? hours : '0' + hours) + ':' + 
          (minutes > 9 ? minutes : '0' + minutes) + ':' + 
          (seconds > 9 ? seconds : '0' + seconds);
      } else {
        newTimeLeft = 'Trial Expired';
      }
      return newTimeLeft;
    };
    
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [trialEnd]);

  if (!timeLeft || timeLeft === 'Trial Expired') return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="text-center">
        <h2 className="text-white/10 text-6xl md:text-9xl font-black tracking-widest uppercase">
          {timeLeft}
        </h2>
        <p className="text-white/10 text-xl md:text-3xl font-bold uppercase tracking-wider">
            Trial Time Remaining
        </p>
      </div>
    </div>
  );
};

export default TrialClock;
