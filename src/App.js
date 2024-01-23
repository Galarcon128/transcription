import { useEffect, useState, useCallback } from "react";
import { CountdownTimer } from "./components/CountdownTimer";
import { GAME_STATE } from "./static";

const BUTTON_MESSAGE = {}
BUTTON_MESSAGE[GAME_STATE.rest] = "START"
BUTTON_MESSAGE[GAME_STATE.play] = "GO!"
BUTTON_MESSAGE[GAME_STATE.stop] = "TRY AGAIN?"

function App() {
  const [stateGame, setStateGame] = useState(0);
  const [bp, setBp] = useState()
  const [init, setInit] = useState(0)
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setStateGame(GAME_STATE.play);
  };

  const handleStopGame = () => {
    setStateGame(GAME_STATE.stop);
  };

  const handleResetGame = () => {
    setStateGame(GAME_STATE.rest);
  };

  const handleKeyPress = useCallback(
    (event) => {
      const pressedKey = event.key.toUpperCase();
      if (['A', 'T', 'G', 'C'].includes(pressedKey)) {
        let bpTarget = sequence.slice(init+4,init+5)
        console.log(pressedKey,bpTarget );
        if (bpTarget.toUpperCase() === pressedKey) {
          setInit((n)=>n+1)
        }
        //setUserInput(pressedKey);
      }
    },
    [setInit,init]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

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
      <div className="wordsWrap">
        <p className="pstyle" >
          {sequence.slice(init,init+10).split().map((bp,index)=>{
          return <span key={"bp_"+bp+"_"+index}>{bp}</span>
        })}
        </p>
        
      </div>
    </div>
  );
}

export default App;

const sequence = "____ATGAAAAAGCACCTTCTGCCTCTCGCTCTGCTGTTTTCCGGAATATCTCCGGCCCAGGCGCTGGATGTCGGCGATATATCATCGTTTATGAACAGTGACAGCAGCACGCTGAGCAAAACGATCAAAAACAGTACCGACAGTGGTCGCCTTATCAATATCCGTCTCGAACGGCTCTCTTCACCGCTTGACGACGGGCAGGTTATCTCAATGGACAAGCCGGATGAGTTGCTACTCACTCCCGCCAGCTTGCTGCTACCCGCCCAAGCCAGCGAAGTGATCCGCTTCTTCTATAAGGGACCCGCAGATGAAAAAGAGCGCTACTACCGCATTGTCTGGTTTGATCAGGCCCTCAGTGATGCGCAGCGCGATAATGCCAACCGCAGCGCTGTGGCCACTGCTTCCGCCCGCATCGGCACCATTCTGGTCGTCGCCCCTCGTCAGGCGAACTACCACTTTCAGTACGCCAACGGCTCCCTGACAAATACAGGAAATGCGACGCTGCGGATCCTCGCCTACGGACCTTGCCTGAAAGCCGCCAACGGTAAGGAGTGTAAAGAGAATTACTACCTGATGCCGGGCAAGTCGCGTCGTTTTACCCGCGTGGACACTGCGGATAACAAAGGACGGGTTGCACTTTGGCAGGGTGATAAGTTCATTCCCGTGAAATAG"