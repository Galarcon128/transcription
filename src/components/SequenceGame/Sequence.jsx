import React, { useCallback, useEffect, useState } from "react";

function getBP() {
  const bps = ["A", "C", "G", "T"];
  const random = Math.floor(Math.random() * bps.length);
  return bps[random];
}

const BPinv = {
  A: "T",
  T: "A",
  C: "G",
  G: "C",
};

const RNAcom = {
  A: "T",
  U: "A",
  C: "G",
  G: "C",
};

function getDNA(longitud) {
  let cadena = [];
  for (let i = 0; i < longitud; i++) {
    cadena.push(getBP());
  }
  return cadena;
}

export default function Sequence({
  nBP,
  handleScoreUp = () => {},
  handleScoreDown = () => {},
}) {
  const [SEQUENCE, setSEQUENCE] = useState(getDNA(nBP ? nBP.numberOfBP : 22));

  const handleKeyPress = useCallback(
    (event) => {
      const pressedKey = event.key.toUpperCase();
      if (["A", "G", "U", "C"].includes(pressedKey)) {
        let bpTarget = SEQUENCE[12];
        let bpPress = RNAcom[pressedKey]
        //console.log(pressedKey,bpTarget);
        if (bpTarget === bpPress
        ) {
          const newSequence = [...SEQUENCE];
          newSequence.shift();
          setSEQUENCE([...newSequence, getBP()]);
          handleScoreUp(pressedKey);
        } else {
          handleScoreDown();
        }
        //setUserInput(pressedKey);
      }
    },
    [SEQUENCE, handleScoreDown, handleScoreUp]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      {SEQUENCE.map((bp, index) => {
        return (
          <div
            key={"bp_" + index + "_" + bp}
            className={`bpContainer rdb_sequence_${bp} ${
              index === 12 ? "bpSelected" : ""
            }`}
          >
            <p className={`pstyle`}>{bp}</p>
          </div>
        );
      })}
      {SEQUENCE.map((bp, index) => {
        return (
          <div
            key={"bp_" + index + "_inv_" + BPinv[bp]}
            style={{height: nBP ? nBP.bpHeight : 100}}
            className={`bpContainer rdb_sequence_${BPinv[bp]} bpInv-${index}`}
          >
            <p className={`pstyle`}>{BPinv[bp]}</p>
          </div>
        );
      })}
    </>
  );
}
//<div id='bp' className='bpSelected' >BP</div>
