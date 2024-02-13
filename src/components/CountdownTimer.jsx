import React, { useState, useEffect } from 'react';
//import {GAME_STATE} from "../static"

export const CountdownTimer = ({stateGame,timeOver = ()=>{}}) => {
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
        <div className="gameTime">
          <p>Time left: <span className="time">{seconds}</span></p>
        </div>
      </div>
    );
  };
  