import React, { useEffect, useState } from 'react'
import "./style.css"
import Sequence from './Sequence'

export default function SequenceGame({handleScoreUp,handleScoreDown,stateGame}) {

    const [nBP, set_nBP] = useState()
    const [arnSequence, setArnSequence] = useState([])

    //console.log(arnSequence);

    const handleCreateARN=(bp)=>{
        handleScoreUp()
        setArnSequence([bp,...arnSequence])
    }

    useEffect(() => {
        if (document.getElementById('polymerase')&& !nBP) {
            setElements()
            window.addEventListener('resize', setElements);
        }
      return () => {
        document.removeEventListener('resize', ()=>{});
      }
    }, [nBP])

    const setElements = ()=>{
        const arn = document.getElementById('arn')
        const polymerase = document.getElementById('polymerase')
        const polymeraseUP = document.getElementById('polymerase_up')
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
            polymeraseUP.style.left = polymerasePosX+"px"
            polymeraseUP.style.top = (polymerase.offsetWidth*0.55)+"px"
            //sequenceDNA
            const sequenceDNAPosY = (polymerase.offsetHeight*0.25)
            sequenceDNA.style.top = sequenceDNAPosY+"px"
            const sequenceDNAHeight = (polymerase.offsetHeight*0.8)
            sequenceDNA.style.height = sequenceDNAHeight+"px"
            //bp mol
            const bpWidth = (polymerase.offsetWidth*.15)
            const bpHeight = sequenceDNAHeight*0.3
            //bp.style.width = bpWidth+"px"
            //bp.style.height = sequenceDNAHeight+"px"
            //const bpPosX = (width/2)-(bpWidth/2)
            //bp.style.left = bpPosX+"px"
            const numberOfBP = Math.round(sequenceDNA.offsetWidth/bpWidth);
            sequenceDNA.style.display = "grid"
            //grid-template-columns: repeat(21, auto);
            sequenceDNA.style.gridTemplateColumns = `repeat(${numberOfBP}, ${bpWidth}px)`
            sequenceDNA.style.gridTemplateRows = `${bpHeight}px ${sequenceDNAHeight*.7}px`
            arn.style.height = bpHeight+"px"
            arn.style.width = (bpWidth*13)+"px"
            arn.style.top = (2*bpHeight)+"px"
            arn.style.paddingRight = bpWidth+"px"
            //arn.style.display = "grid"
            //arn.style.gridTemplateColumns = `repeat(${13}, ${bpWidth}px)`
            set_nBP({numberOfBP,bpHeight})

        }
    }
    
  return (
    <div className='sequenceGame' id='gameContainer' >
        <div className='sequenceDNAContainer' id='sequenceDNAContainer'>
            <Sequence stateGame={stateGame} nBP={nBP} handleScoreUp={handleCreateARN} handleScoreDown={handleScoreDown} />
        </div>
        <div className='polymerase_container' id='polymerase' />
        <div className='polymerase_container_up' id='polymerase_up' />
        <div className='arn_container' id='arn' >
            {
                arnSequence.map((bp,index)=>{
                    return (
                        <div
                          key={"bp_" + index + "_ARN"}
                          className={`bpContainer rdb_sequence_${bp}`}
                          style={{marginTop: (10*(index+1))+"px", height: nBP ? nBP.bpHeight : 100}}
                        >
                          <p className={`pstyle`}>{bp}</p>
                        </div>
                      );
                    
                })
            }
        </div>
        
    </div>
  )
}
