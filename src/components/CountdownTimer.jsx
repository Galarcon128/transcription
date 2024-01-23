import React, { useState, useEffect } from 'react';

export const CountdownTimer = ({timeOver = ()=>{}}) => {
    const [seconds, setSeconds] = useState(60);
  
    useEffect(() => {
      if (seconds > 0) {
        const intervalId = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
  
        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
      }else{
        timeOver()
      }
    }, [seconds, timeOver]);
  
    return (
      <div>
        <div className="timeWrap">
          <p>Time left</p>
          <span className="time">{seconds}</span>
        </div>
      </div>
    );
  };
  