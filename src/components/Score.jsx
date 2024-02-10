import React from 'react'

export default function Score({score, stateGame}) {
  return (
    <div>
        <div className="gameTime" >
          <p>Score</p>
          <p><span className="score">{score}</span></p>
        </div>
      </div>
  )
}
