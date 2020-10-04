import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';

import { TestProgressContext } from '../contexts/TestProgress' 
import EndNotice from '../components/EndNotice';
import { randIncl } from '../utilities/Random'


const QUESTION_STR = [

]

const MAX_ARRAY_LENGTH = 9;

function NBackTest() {
    
    // const [hasStarted, setHasStarted] = useState(false)
    const [isTestOver, setIsTestOver] = useState(false)
    // const [isFailed, setIsFailed] = useState(false)
    // const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false)
    const [currentNums, setCurrentNums] = useState([])
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [score, setScore] = useState(0)

    const testProgress = useContext(TestProgressContext)

    const history = useHistory()

    // console.log(process.env.REACT_APP_DEBUG_MODE)

    // useEffect(()=>{
    //     addNewNumber()
    // }, [isWaitingForAnswer])

    // useEffect(()=>{
    //     if (isWaitingForAnswer) {
    //         generateNewQuestion()
    //     } else {
    //         if (currentNums.length >= 3 && answer === undefined) setIsWaitingForAnswer(true)
    //         addNewNumber()
    //     }        
    //     // if (!isWaitingForAnswer) 
    // }, [currentNums, isWaitingForAnswer])

    // useEffect(()=>{
    //     console.log('answer changed')
    //     console.log(answer === 0)
    //     console.log(isWaitingForAnswer && (answer || answer === 0))
    //     if (isWaitingForAnswer && (answer !== undefined)) {
    //         // TODO technical debt, to clean up and refactor this line
    //         // 0 equates to false, explicitness is essential here
    //         // if (answer === undefined) return
    //         if (answer === currentNums[currentNums.length-question-1]) {
    //             console.log("correct")
    //             setScore(score => score + 1)
    //             setAnswer()
    //             setQuestion()
    //             setIsWaitingForAnswer(false)
    //             // addNewNumber()
    //         } else {
    //             setIsTestOver(true)
    //         }
    //     }
    // }, [answer])

    // useEffect(()=>{
    //     if (!question && !answer) {
    //         addNewNumber()
    //     }
    // }, [question, answer])

    useEffect(()=>{
        if (currentNums.length <= 3) {
            addNewNumber()
        } else {
            generateNewQuestion()
        }    
    }, [currentNums])

    useEffect(()=>{
        // console.log(answer)
        // console.log(answer !== undefined
        //     && answer === currentNums[currentNums.length-question-1])

        // TODO technical debt, to clean up and refactor this line
        // if (answer !== undefined
        //     && answer === currentNums[currentNums.length-question-1]) {

            

        //     setScore(score => score + 1)
        //     setAnswer(undefined)
        //     setQuestion(undefined)
        //     addNewNumber()
        // } else if (currentNums.length > 0) {
        //     setIsTestOver(true)
        // }

        if (answer === undefined) return
        console.log(answer === currentNums[currentNums.length-question-1])
        if (answer === currentNums[currentNums.length-question-1]) {
            setScore(score => score + 1)
            setAnswer(undefined)
            setQuestion(undefined)
            addNewNumber()
        } else {
            setIsTestOver(true)
        }
    }, [answer])

    useEffect(()=>{
        if (score === 5) {
            setIsTestOver(true)
            // testProgress.addNbackResult(score)
        }
    }, [score])

    useEffect(()=>{
        if (isTestOver) {
            testProgress.addNbackResult(score)
            history.push("/test-over")
        }
    }, [isTestOver])

    function generateNewQuestion() {

        setTimeout(() => {
            if (question === undefined) {
                setQuestion(1 + randIncl(3))
                // console.log(isWaitingForAnswer)
                // console.log('generated new question')
                
            }
        }, 1500)
       
   }

    function addNewNumber() {
        // if (!isWaitingForAnswer) {
            // setCurrentNums([...currentNums, randIncl(9)])
            setTimeout(()=>{
                setCurrentNums([...currentNums, randIncl(9)])
                // setCurrentNums([...currentNums, 0])
            }, 1200)
        // }
    }

    function submitAnswer(value) {
        // console.log(currentNums.length)
        // console.log(question)
        // console.log(currentNums[currentNums.length-question])
        console.log(value)
        setAnswer(value)
    }

    // Rendering //

    // Formatting ordinal numbers
    let ordinalStr = ''
    if (question === 1) {
        ordinalStr = 'second'
    } else if (question === 2) {
        ordinalStr = 'third'
    } else if (question === 3) {
        ordinalStr = 'fourth'
    }
    
    return (
        <div className="nback">
            {/* dotenv only store string, hence an explicit comparison to the string 'true' is necessary*/}
            {(process.env.REACT_APP_DEBUG_MODE === 'true')
                && <>Debug data: {currentNums.map((num, index) => <span key={index}>{num} </span>) }; {question}</>
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

            {(question) && <div className="nback__qa">
                <div className="nback__qa__question">
                    <p>{`What is the ${ordinalStr} last digit?`}</p>
                </div>
                <div className="nback__qa__answers">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((value, index) =>
                        <button key={index}
                            className="nback__qa__answers__answer"
                            onClick={()=>{submitAnswer(value)}}
                        >
                            {value}
                        </button>

                        // {(index === 10)
                        //     ? <>
                            
                        //     </>
                        //     : <>
                            
                        //     </>

                        // }
                        
                    )}
                </div>
            </div>}
        </div>
    )
}

export default NBackTest

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
