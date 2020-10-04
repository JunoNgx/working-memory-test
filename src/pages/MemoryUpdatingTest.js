import React, { useEffect, useContext, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';

import { TestProgressContext } from '../contexts/TestProgress' 
import { randIncl } from '../utilities/Random'

const ALPHA = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

// This component is heavily derived from the N-Back test
// and even share the same CSS classnames for reusability

function MemoryUpdatingTest() {
    
    const [isTestOver, setIsTestOver] = useState(false)
    const [currentData, setCurrentData] = useState([])
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [score, setScore] = useState(0)
    
    const replData = useRef()

    const testProgress = useContext(TestProgressContext)

    const history = useHistory()

    useEffect(()=>{
        if (currentData.length <= 3) {
            addNewNumber()
        } else {
            generateNewQuestion()
        }    
    }, [currentData])

    useEffect(()=>{
        if (answer === undefined) return
        console.log(answer === currentData[currentData.length-question-1])
        if (answer === currentData[currentData.length-question-1]) {
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
                // TODO not the last, and not the two that has been replaced
                setQuestion(1 + randIncl(3))
            }
        }, 1500)
       
    }

    function performReplacement() {
        let source = 0;
        let replacement = 0;

        // Replacement must happen and it cannot be at the last item
        do {
            source = randIncl(ALPHA.length)
            replacement = randIncl(ALPHA.length)
        } while (
            source == replacement
            || source == currentData[currentData.length-1]
            || replacement == currentData[currentData.length-1]
        )

        replData.current = [source, replacement]

        let newArr = [...currentData]
        newArr.forEach((num) => {
            if (num === source) num = replacement
        })
        setCurrentData(newArr)
    }

    function addNewNumber() {
            setTimeout(()=>{
                setCurrentData([...currentData, randIncl(ALPHA.length)])
            }, 1200)
        // }
    }

    function submitAnswer(value) {
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
                && <>Debug data: {currentData.map((num, index) => <Letter key={index} value={num} isHidden={false}/>) }</>
            }
            <p className="nback__attention">Pay attention to these numbers:</p>
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
                    <p>{`What is the ${ordinalStr} last digit?`}</p>
                </div>
                <div className="nback__qa__answers">

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
