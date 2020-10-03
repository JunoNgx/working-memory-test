import React, { useState } from 'react'



function NBack() {

    const [isTestOver, setIsTestOver] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [currentNums, setCurrentNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [questionNum, setQuestionNum] = useState()
    const [answerNum, setAnswerNum] = useState()

    function addNewNumber() {
        setCurrentNums([...currentNums, Math.floor(Math.random()*9)])
    }

    return (
        <div className="nback">
            {currentNums.map((num, index) => <span key={index}>{num} </span>)}
            <div className="nback__current-nums">
                {currentNums.map((num, index) =>
                    <p key={index} className="nback__current-nums__num">
                        {num}
                    </p>)
                }
            </div>

            <button onClick={addNewNumber}>addNum</button>
        </div>
    )
}

export default NBack
