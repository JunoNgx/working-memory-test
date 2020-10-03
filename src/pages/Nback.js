import React, { useEffect, useContext, useState } from 'react'

import { TestProgressContext } from '../contexts/TestProgress' 
import EndNotice from '../components/EndNotice';
import { randIncl } from '../utilities/Random'


const QUESTION_STR = [

]

const MAX_ARRAY_LENGTH = 9;

function NBack() {
    
    // const [hasStarted, setHasStarted] = useState(false)
    const [isTestOver, setIsTestOver] = useState(false)
    // const [isFailed, setIsFailed] = useState(false)
    const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false)
    const [currentNums, setCurrentNums] = useState([])
    const [questionNum, setQuestionNum] = useState()
    const [answerNum, setAnswerNum] = useState()
    const [score, setScore] = useState(0)

    const testProgress = useContext(TestProgressContext)

    // console.log(process.env.REACT_APP_DEBUG_MODE)

    // useEffect(()=>{
    //     addNewNumber()
    // }, [isWaitingForAnswer])

    useEffect(()=>{
        // 4 numbers are present in the array
        if (currentNums.length > 2) setIsWaitingForAnswer(true)
        if (isWaitingForAnswer) generateNewQuestion()
        if (!isWaitingForAnswer) addNewNumber()
    }, [currentNums, isWaitingForAnswer])

    useEffect(()=>{
        console.log('answer changed')
        console.log(answerNum === 0)
        console.log(isWaitingForAnswer && (answerNum || answerNum === 0))
        if (isWaitingForAnswer && (answerNum || answerNum === 0)) {
            // TODO technical debt, to clean up and refactor this line
            // 0 equates to false, explicitness is essential here
            if (answerNum === undefined) return
            if (parseInt(answerNum) === currentNums[currentNums.length-questionNum-1]) {
                console.log("correct")
                setScore(score => score + 1)
                setAnswerNum()
                setQuestionNum()
                setIsWaitingForAnswer(false)
                // addNewNumber()
            } else {
                setIsTestOver(true)
            }
        }
    }, [answerNum])

    useEffect(()=>{
        if (!questionNum && !answerNum) {
            addNewNumber()
        }
    }, [questionNum, answerNum])

    useEffect(()=>{
        if (score === 5) {
            setIsTestOver(true)
        }
    }, [score])

    useEffect(()=>{
        if (isTestOver) testProgress.addNbackResult(score)
    }, [isTestOver])

    function addNewNumber() {
        // if (!isWaitingForAnswer) {
            // setCurrentNums([...currentNums, randIncl(9)])
            setTimeout(()=>{
                // setCurrentNums([...currentNums, randIncl(9)])
                setCurrentNums([...currentNums, 0])
            }, 1000)
        // }
    }

    function generateNewQuestion() {
        setQuestionNum(1 + randIncl(3))
    }

    function submitAnswer(value) {
        // console.log(currentNums.length)
        // console.log(questionNum)
        // console.log(currentNums[currentNums.length-questionNum])
        console.log(value)
        setAnswerNum(value)
    }

    // Rendering //

    // Formatting ordinal numbers
    let ordinalStr = ''
    if (questionNum === 1) {
        ordinalStr = 'second'
    } else if (questionNum === 2) {
        ordinalStr = 'third'
    } else if (questionNum === 3) {
        ordinalStr = 'fourth'
    }

    // The "playfield" when the test is going on
    const playfield = (
        <div className="nback">
            {/* dotenv only store string, hence an explicit comparison to the string 'true' is necessary*/}
            {(process.env.REACT_APP_DEBUG_MODE === 'true')
                && <>Debug data: {currentNums.map((num, index) => <span key={index}>{num} </span>) }; {questionNum}</>
            }
            <p className="nback__attention">Pay attention to these numbers:</p>
            <div className="nback__current-nums">
                {currentNums.map((num, index) => 
                    <Number key={index} value={num} isHidden={index<currentNums.length-1}/> 
                    // <span key={index} className="nback__current-nums__num">
                    //     {num}
                    // </span>)
                )}
            </div>

            {/* <button onClick={addNewNumber}>addNum</button> */}

            {(isWaitingForAnswer && questionNum) && <div className="nback__qa">
                <div className="nback__qa__question">
                    <p>{`What is the ${ordinalStr} last digit?`}</p>
                </div>
                <div className="nback__qa__answers">
                    {[...Array(10)].map((_, index) =>
                        <button key={index} className="nback__qa__answers__answer" onClick={()=>{submitAnswer(index)}}>
                            {index}
                        </button>
                    )}
                </div>
            </div>}
        </div>
    )

    // Notice when the test is over
    const endNotice = (
        <EndNotice/>
    )

    return (
        <>
            {(isTestOver)
                ? <>{endNotice}</>
                : <>{playfield}</>
            }
        </>
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
