import React, { useCallback, useEffect, useState } from "react";
import "./style.css";

const SEQUENCE =
  "LLLLLATGAAAAAGCACCTTCTGCCTCTCGCTCTGCTGTTTTCCGGAATATCTCCGGCCCAGGCGCTGGATGTCGGCGATATATCATCGTTTATGAACAGTGACAGCAGCACGCTGAGCAAAACGATCAAAAACAGTACCGACAGTGGTCGCCTTATCAATATCCGTCTCGAACGGCTCTCTTCACCGCTTGACGACGGGCAGGTTATCTCAATGGACAAGCCGGATGAGTTGCTACTCACTCCCGCCAGCTTGCTGCTACCCGCCCAAGCCAGCGAAGTGATCCGCTTCTTCTATAAGGGACCCGCAGATGAAAAAGAGCGCTACTACCGCATTGTCTGGTTTGATCAGGCCCTCAGTGATGCGCAGCGCGATAATGCCAACCGCAGCGCTGTGGCCACTGCTTCCGCCCGCATCGGCACCATTCTGGTCGTCGCCCCTCGTCAGGCGAACTACCACTTTCAGTACGCCAACGGCTCCCTGACAAATACAGGAAATGCGACGCTGCGGATCCTCGCCTACGGACCTTGCCTGAAAGCCGCCAACGGTAAGGAGTGTAAAGAGAATTACTACCTGATGCCGGGCAAGTCGCGTCGTTTTACCCGCGTGGACACTGCGGATAACAAAGGACGGGTTGCACTTTGGCAGGGTGATAAGTTCATTCCCGTGAAATAG".split(
    ""
  );

export default function DNAsequence({
  handleScoreUp = () => {},
  handleScoreDown = () => {},
}) {
  const [init, setInit] = useState(0);
  const sequenceStage = SEQUENCE.slice(init, init + 11);


  const handleKeyPress = useCallback(
    (event) => {
      const pressedKey = event.key.toUpperCase();
      if (["A", "T", "G", "C"].includes(pressedKey)) {
        let bpTarget = sequenceStage[5];
        console.log(pressedKey,bpTarget);
        if (bpTarget.toUpperCase() === pressedKey) {
          setInit((n) => n + 1);
        }
        //setUserInput(pressedKey);
      }
    },
    [setInit, init, sequenceStage]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="wordsWrap">
      <div className="sequenceGrid">
        {sequenceStage.map((bp, index) => {
          return (
            <div key={"bp_"+index+"_"+bp} className={`bpContainer rdb_sequence_${bp.toUpperCase()} ${index === 5 ? "bpSelected": ""}`} >
              <p className={`pstyle`}>{bp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
