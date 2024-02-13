import React from "react";
import { GAME_STATE } from "../static";
import IconButton from "@mui/material/IconButton";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const BUTTON_MESSAGE = {};
BUTTON_MESSAGE[GAME_STATE.rest] = "START";
BUTTON_MESSAGE[GAME_STATE.play] = "GO!";
BUTTON_MESSAGE[GAME_STATE.stop] = "TRY AGAIN?";

export default function ButtonGame({ stateGame, handleStart }) {
  return (
    <div className="gameButton">
      <p style={{color: "#ffffff"}} >{BUTTON_MESSAGE[stateGame]}</p>
      <IconButton
      sx={{backgroundColor: "#32617d"}}
        onClick={() => {
          switch (stateGame) {
            case GAME_STATE.stop:
            case GAME_STATE.rest:
              handleStart();
              break;
            
            default:
              break;
          }
        }}
      >
        <PlayCircleOutlineIcon sx={{color: "#ffffff", fontSize: "12vw"}}/>
      </IconButton>
      <p  style={{color: "#ffffff"}} >Press the button to start game</p>
    </div>
  );
}
