import { useEffect, useState, useCallback, useRef } from "react";
import { CountdownTimer } from "./components/CountdownTimer";
import DNAsequence from "./components/DNAsequence";
import { GAME_STATE } from "./static";

const BUTTON_MESSAGE = {};
BUTTON_MESSAGE[GAME_STATE.rest] = "START";
BUTTON_MESSAGE[GAME_STATE.play] = "GO!";
BUTTON_MESSAGE[GAME_STATE.stop] = "TRY AGAIN?";

function App() {
  const [stateGame, setStateGame] = useState(0);
  
  const [score, setScore] = useState(0);

  const bpTarget = useRef(null);

  const handleScoreUp = ()=>{
    setScore((s)=>s+1)
  }

  const handleScoreDown = ()=>{
    setScore((s)=>s-1)
  }


  const handleStart = () => {
    setStateGame(GAME_STATE.play);
  };

  const handleStopGame = () => {
    setStateGame(GAME_STATE.stop);
  };

  const handleResetGame = () => {
    setStateGame(GAME_STATE.rest);
  };

  

  return (
    <div className="wrapper">
      <h1>Genome Transcription Game</h1>
      <p> Helps to create the mRNA from the gene sequence </p>
      <button
        onClick={() => {
          switch (stateGame) {
            case GAME_STATE.rest:
              handleStart();
              break;

            default:
              break;
          }
        }}
      >
        {BUTTON_MESSAGE[stateGame]}
      </button>
      {stateGame === GAME_STATE.play && (
        <div className="outerWrap">
          <div className="scoreWrap">
            <p>Score</p>
            <span className="score">0</span>
          </div>
          <CountdownTimer timeOver={handleStopGame} />
        </div>
      )}
      <DNAsequence handleScoreUp={handleScoreUp} handleScoreDown={handleScoreDown} />
    </div>
  );
}

export default App;

