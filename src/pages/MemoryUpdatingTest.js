import React, { useEffect, useContext, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';

import { TestProgressContext } from '../contexts/TestProgress' 
import { randIncl, randWithBlacklist } from '../utilities/Random'

const ALPHA = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

// This component is heavily derived from the N-Back test
// and even share the same CSS classnames for reusability

function MemoryUpdatingTest() {
    
    const [isTestOver, setIsTestOver] = useState(false)

    const [currentData, setCurrentData] = useState([])

    // To mitigate setting state in timeout
    const currentDataRef = useRef(currentData)
    currentDataRef.current = currentData

    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [score, setScore] = useState(0)
    
    const replData = useRef()
    const isReadyForNewQuestion = useRef(true)
    // let isReadyForNewQuestion = true

    const testProgress = useContext(TestProgressContext)

    const history = useHistory()

    useEffect(()=>{
        console.log(currentData)

        if (currentData.length <= 3) {
            addNewNumber()
        } else {
            if (isReadyForNewQuestion.current) generateNewQuestion()
        }    
    }, [currentData])

    // useEffect(() => {
    //     if (currentData.length > 3) performReplacement()
    // }, [question])

    useEffect(()=>{
        if (answer === undefined) return
        // console.log(answer === currentData[currentData.length-question-1])
        if (answer === currentData.includes(question)) {
            setQuestion(undefined)
            setAnswer(undefined)
            addNewNumber()
            performReplacement()
            setScore(score => score + 1)

            // A slight delay to prevent performReplacement from triggering
            // another question generation
            // Has to be shorter than the next timeout to generateNewQuestion)
            setTimeout(()=>{isReadyForNewQuestion.current = true}, 100)
        } else {
            setIsTestOver(true)
        }
    }, [answer])

    useEffect(()=>{
        if (score === 5) {
            setIsTestOver(true)
        }
    }, [score])

    useEffect(()=>{
        if (isTestOver) {
            testProgress.addMemoryUpdatingResult(score)
            history.push("/test-over")
        }
    }, [isTestOver])

    function generateNewQuestion() {

        setTimeout(() => {
            if (question === undefined) {
                setQuestion(
                    randWithBlacklist(
                        ALPHA.length,
                        [currentData[currentData.length-1]]
                    )
                )
    
                console.log(`New question generated`)
            }
        }, 1500)
       
    }

    function performReplacement() {
        // let source = randWithBlacklist(ALPHA.length, [currentData[currentData.length-1]]);
        // let replacement = randWithBlacklist(ALPHA.length, [source, currentData[currentData.length-1]]);
        let source = randWithBlacklist(7, [currentData[currentData.length-1]]);
        let replacement = randWithBlacklist(7, [source, currentData[currentData.length-1]]);

        replData.current = [source, replacement]
        isReadyForNewQuestion.current = false

        let newArr = [...currentData]
        newArr.forEach((num, i) => {
            if (num === source) newArr[i] = replacement
        })
        setCurrentData(newArr)

        console.log(`Chars replaced: ${ALPHA[source]} to ${ALPHA[replacement]} (${source} to ${replacement})`)
    }

    function addNewNumber() {
            setTimeout(()=>{
                setCurrentData(
                    [...currentDataRef.current,
                    // randWithBlacklist(ALPHA.length, currentData)]
                    randWithBlacklist(7, currentData)]
                )
            }, 1200)
        // }
    }

    function submitAnswer(_boo) {
        // console.log(value)
        setAnswer(_boo)
    }
    
    return (
        <div className="nback">
            {/* dotenv only store string, hence an explicit comparison to the string 'true' is necessary*/}
            {(process.env.REACT_APP_DEBUG_MODE === 'true')
                && <>Debug data: {currentData.map((num, index) => <Letter key={index} value={num} isHidden={false}/>) }</>
            }
            <p className="nback__attention">Pay attention to these letters:</p>
            <div className="nback__current-data">
                {currentData.map((num, index) => 
                    <Letter
                        className={"nback__current-data__num"}
                        key={index}
                        value={num}
                        isHidden={index<currentData.length-1}
                    />
                )}
            </div>

            {(question) && <div className="nback__qa">
                <div className="nback__qa__question">

                    {(replData.current) &&
                        <p>{`All instances of the letter ${ALPHA[replData.current[0]]} have been replaced with ${ALPHA[replData.current[1]]}.`}</p>
                    }

                    <p>{`Is the letter ${ALPHA[question]} in this sequence?`}</p>
                </div>
                <div className="nback__qa__answers--mu">
                    <button
                        className="nback__qa__answers--mu__answer"
                        onClick={()=>{submitAnswer(true)}}
                    >
                        Yes
                    </button>
                    <button
                        className="nback__qa__answers--mu__answer"
                        onClick={()=>{submitAnswer(false)}}
                    >
                        No
                    </button>
                </div>
            </div>}
        </div>
    )
}



export default MemoryUpdatingTest

function Letter({value, isHidden, className}) {

    if (isHidden) className += " " + className + "--hidden"

    return (
        <span className={className}>
            {(isHidden)
                ? <>🗙</>
                : <>{ALPHA[value]}</>
            }
        </span>
    )
}
