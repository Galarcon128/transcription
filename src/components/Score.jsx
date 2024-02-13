import React from 'react'

export default function Score({score, stateGame}) {
  return (
    <div>
        <div className="gameScore" >
          <p>Score: <span className="score">{score}</span></p>
        </div>
      </div>
  )
}
