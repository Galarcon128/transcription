import React, { useEffect } from "react";

function getBP() {
  const bps = ["A", "C", "G", "T"];
  const random = Math.floor(Math.random() * bps.length);
  return bps[random];
}

function generarCadenaADN(longitud) {
  var cadena = [];
  var caracteres = ["A", "C", "G", "T"];
  for (var i = 0; i < longitud; i++) {
    var indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    cadena.push(caracteres[indiceAleatorio]);
  }
  return cadena;
}

export default function Sequence({ nBP = 21 }) {
  return (
    <>
      {generarCadenaADN(nBP).map((bp, index) => {
        return (
          <div
            key={"bp_" + index + "_" + bp}
            className={`bpContainer rdb_sequence_${bp.toUpperCase()} ${
              index === 12 ? "bpSelected" : ""
            }`}
          >
            <p className={`pstyle`}>{bp}</p>
          </div>
        );
      })}
      {generarCadenaADN(nBP).map((bp, index) => {
        return (
          <div
            key={"bp_" + index + "_" + bp}
            className={`bpContainer rdb_sequence_${bp.toUpperCase()}`}
          >
            <p className={`pstyle`}>{bp}</p>
          </div>
        );
      })}
    </>
  );
}
//<div id='bp' className='bpSelected' >BP</div>
