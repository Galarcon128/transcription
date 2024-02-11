import React, { useEffect, useState } from 'react'
import "./style.css"
import Sequence from './Sequence'

export default function SequenceGame({handleScoreUp,handleScoreDown}) {

    const [nBP, set_nBP] = useState()

    useEffect(() => {
        if (document.getElementById('polymerase')&& !nBP) {
            setElements()
            window.addEventListener('resize', setElements);
        }
        
    
      return () => {
        window.addEventListener('resize', ()=>{});
      }
    }, [])

    const setElements = ()=>{
        const polymerase = document.getElementById('polymerase')
        const sequenceDNA = document.getElementById("sequenceDNAContainer")
        //const bp = document.getElementById('bp')
        if (polymerase && sequenceDNA) {
            const width = window.innerWidth;
            //const height = window.innerHeight;
            //polymerase position
            //polymerase.offsetHeight
            //polymerase.offsetWidth
            const polymerasePosX = (width/2)-(polymerase.offsetWidth/2)
            polymerase.style.left = polymerasePosX+"px"
            //sequenceDNA
            const sequenceDNAPosY = (polymerase.offsetHeight*0.25)
            sequenceDNA.style.top = sequenceDNAPosY+"px"
            const sequenceDNAHeight = (polymerase.offsetHeight*0.8)
            sequenceDNA.style.height = sequenceDNAHeight+"px"
            const bpWidth = (polymerase.offsetWidth*.15)
            //bp.style.width = bpWidth+"px"
            //bp.style.height = sequenceDNAHeight+"px"
            //const bpPosX = (width/2)-(bpWidth/2)
            //bp.style.left = bpPosX+"px"
            const numberOfBP = Math.round(sequenceDNA.offsetWidth/bpWidth);
            sequenceDNA.style.display = "grid"
            //grid-template-columns: repeat(21, auto);
            sequenceDNA.style.gridTemplateColumns = `repeat(${numberOfBP}, ${bpWidth}px)`
            sequenceDNA.style.gridTemplateRows = `${sequenceDNAHeight*.3}px ${sequenceDNAHeight*.7}px`
            set_nBP(numberOfBP)

        }
    }
    
  return (
    <div className='sequenceGame' id='gameContainer' >
        <div className='sequenceDNAContainer' id='sequenceDNAContainer'>
            <Sequence nBP={nBP} />
        </div>
        <div className='polymerase_container' id='polymerase' />
        
    </div>
  )
}
