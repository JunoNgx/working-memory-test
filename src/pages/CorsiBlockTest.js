import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';

import { randIncl } from '../utilities/Random'

import { TestProgressContext } from '../contexts/TestProgress' 

const TIME_INTERVAL = 1000
const INSTRUCTION_OBSERVE = "Observe the pattern"
const INSTRUCTION_REPEAT = "Now repeat the pattern you saw by tapping the block in the correct sequence"

function CorsiBlockTest() {

    const [isTestOver, setIsTestOver] = useState(false)
    const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false)
    const [blockMap, setBlockMap] = useState(getInitialBlockMap())
    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState([])
    const [score, setScore] = useState(0)

    const testProgress = useContext(TestProgressContext)

    const history = useHistory()


    function getInitialBlockMap() {
        let array = []
        for (let i = 0; i < 35; i++) {
            array.push(false)
            // if (i % 2 === 0) {
            //     array.push(false)
            // } else {
            //     array.push(true)
            // }
        }
        return array
    }

    function generateNewQuestion() {

    }

    function changeBlockState(index) {
        // console.log(blockMap)
        // console.log(index)
        // console.log(blockMap[20])
        // const hl = !blockMap[index].highlighted

        let newMap = [...blockMap]
        newMap[index] = !blockMap[index]
        setBlockMap(newMap)

        // setBlockMap(prevBlockMap => {
        //     prevBlockMap[index] = !prevBlockMap[index]
        //     // console.log(prevBlockMap)
        //     return prevBlockMap
        // })

        // setBlockMap(prevMap => [...prevMap, [index]: false])
    }

    function handleBlockClick(index) {
        changeBlockState(index)
    }

    return (
        <div className="corsiblock">

            <div className="corsiblock__instruction">
                <p className="corsiblock__content">

                </p>
            </div>

            {/* The block map */}
            <div className="corsiblock__blocks">
                {blockMap.map((isHighlighted, index) => <div
                    key={index}
                    className="corsiblock__blocks__container"
                    // id={"block"+{index}}
                >
                    <Block index={index} isHighlighted={isHighlighted} handleClick={handleBlockClick}/>


                    {/* {(isHighlighted === true)
                        ? <div
                            className="
                                corsiblock__blocks__container__block
                                corsiblock__blocks__container__block--clickable
                                corsiblock__blocks__container__block--highlighted
                            "
                            onClick={()=>{changeBlockState(index)}}
                        ></div>
                        : <div
                            className="
                                corsiblock__blocks__container__block
                                corsiblock__blocks__container__block--clickable
                            "
                            onClick={()=>{changeBlockState(index)}}
                        ></div>
                    
                    } */}
                    
                </div>)}
            </div>
        </div>
    )
}

function Block({index, isHighlighted, handleClick}) {

    let classNames = "corsiblock__blocks__container__block corsiblock__blocks__container__block--clickable"
    
    if (isHighlighted) classNames += " corsiblock__blocks__container__block--highlighted"

    return (
        <div
            className={classNames}
            onClick={()=>{handleClick(index)}}
        ></div>
    )
}

export default CorsiBlockTest
