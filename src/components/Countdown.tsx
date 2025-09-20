import { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-11-05T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      <div className="countdown-box">
        <div className="number">{timeLeft.days}</div>
        <div className="label">Days</div>
      </div>
      <div className="countdown-box">
        <div className="number">{timeLeft.hours}</div>
        <div className="label">Hours</div>
      </div>
      <div className="countdown-box">
        <div className="number">{timeLeft.minutes}</div>
        <div className="label">Minutes</div>
      </div>
      <div className="countdown-box">
        <div className="number">{timeLeft.seconds}</div>
        <div className="label">Seconds</div>
      </div>
    </div>
  );
};

export default Countdown;
