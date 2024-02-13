import { useEffect, useState, useCallback, useRef } from "react";
import { CountdownTimer } from "./components/CountdownTimer";
import DNAsequence from "./components/DNAsequence";
import { GAME_STATE } from "./static";
import Title from "./components/Title";
import ButtonGame from "./components/ButtonGame";
import Score from "./components/Score";
import SequenceGame from "./components/SequenceGame";
import "./app.css";

function App() {
  const [stateGame, setStateGame] = useState(GAME_STATE.rest);
  return (
    <div className="main">
      <Title />
      <div className="gameContainer">
        {stateGame === GAME_STATE.play && (
          <CountdownTimer
            stateGame={stateGame}
            timeOver={() => {
              setStateGame(GAME_STATE.stop);
            }}
          />
          )}
        <Appa setStateGame={setStateGame} stateGame={stateGame} />
      </div>
    </div>
  );
}

function Appa({ setStateGame, stateGame }) {
  const [score, setScore] = useState(0);

  //const bpTarget = useRef(null);

  const handleScoreUp = () => {
    setScore((s) => s + 1);
  };

  const handleScoreDown = () => {
    setScore((s) => s - 1);
  };

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
    <>
      {stateGame === GAME_STATE.play && <></>}
      <div>
        <div>
          <p>Score</p>
          <span className="score">{score}</span>
        </div>
      </div>
      {stateGame === GAME_STATE.stop && <Score score={score} />}
      {stateGame !== GAME_STATE.play && (
        <ButtonGame stateGame={stateGame} handleStart={handleStart} />
      )}
      <SequenceGame
        handleScoreUp={handleScoreUp}
        handleScoreDown={handleScoreDown}
      />
    </>
  );
}

export default App;

/*
<div className="polymerase_container">
        {stateGame === GAME_STATE.play && (
          <div className="polymerase_dnaSequence">
            <DNAsequence
              handleScoreUp={handleScoreUp}
              handleScoreDown={handleScoreDown}
            />
          </div>
        )}
      </div>
*/
