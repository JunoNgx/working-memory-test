import React, { useContext, useState } from 'react'

import { TestProgressContext } from '../contexts/TestProgress' 
import { randIncl } from '../utilities/Random'

require('dotenv').config()
const QUESTION_STR = [

]

function NBack() {

    const [isTestOver, setIsTestOver] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [isWaitingForAnswer, setisWaitingForAnswer] = useState(false)
    const [currentNums, setCurrentNums] = useState([0])
    const [questionNum, setQuestionNum] = useState()
    const [answerNum, setAnswerNum] = useState()

    const testProgress = useContext(TestProgressContext)

    // console.log(process.env.REACT_APP_DEBUG_MODE)

    function addNewNumber() {
        setTimeout(()=>{
            setCurrentNums([...currentNums, randIncl(9)])
        }, 1000)
    }

    return (
        <div className="nback">
            <p>Progress: {testProgress.nbackResults.length}/5</p>
            {/* dotenv only store string, hence an explicit comparison to the string 'true' is necessary*/}
            {(process.env.REACT_APP_DEBUG_MODE === 'true')
                && <>Debug data: {currentNums.map((num, index) => <span key={index}>{num} </span>)}</>
            }

            <div className="nback__current-nums">
                {currentNums.map((num, index) => 
                    <Number key={index} value={num} isHidden={index<currentNums.length-1}/> 
                    // <span key={index} className="nback__current-nums__num">
                    //     {num}
                    // </span>)
                )}
            </div>

            <button onClick={addNewNumber}>addNum</button>

            <div className="nback__qa">
                <p className="nback__qa__question">
                    What is the second last digit?
                </p>
                <div className="nback__qa__answers">
                    {[...Array(10)].map((_, index) =>
                        <button key={index} className="nback__qa__answers__answer">
                            {index}
                        </button>
                    )}
                </div>
            </div>

            
        </div>
    )
}

export default NBack

function Number({value, isHidden}) {

    let numberClass = "nback__current-nums__num"
    if (isHidden) numberClass += " nback__current-nums__num--hidden"

    return (
        <span className={numberClass}>
            {(isHidden)
                ? <>🗙</>
                : <>{value}</>
            }
        </span>
    )
}
