import React, { useState, useEffect, useCallback } from 'react';

const DNASequenceGame = () => {
  const [sequence, setSequence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);

  const generateRandomSequence = () => {
    const possibleChars = ['A', 'T', 'G', 'C'];
    const randomIndex = Math.floor(Math.random() * possibleChars.length);
    return possibleChars[randomIndex];
  };

  const startGame = () => {
    setScore(0);
    setTimeRemaining(60);
    generateNewSequence();
  };

  const generateNewSequence = () => {
    setSequence(generateRandomSequence());
  };

  const handleKeyPress = useCallback(
    (event) => {
      const pressedKey = event.key.toUpperCase();
      if (['A', 'T', 'G', 'C'].includes(pressedKey)) {
        setUserInput(pressedKey);
      }
    },
    [setUserInput]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      if (timeRemaining > 0) {
        if (userInput === sequence) {
          setScore((prevScore) => prevScore + 1);
        }
        generateNewSequence();
        setUserInput('');
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        clearInterval(gameInterval);
        alert(`Game Over! Your score: ${score}`);
      }
    }, 1000);

    return () => {
      clearInterval(gameInterval);
    };
  }, [sequence, userInput, timeRemaining, score]);

  return (
    <div>
      <h1>DNA Sequence Game</h1>
      <p>Score: {score}</p>
      <p>Time Remaining: {timeRemaining}s</p>
      <p>Current Sequence: {sequence}</p>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default DNASequenceGame;
