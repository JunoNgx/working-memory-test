import React, { useState } from 'react'

function NBack() {

    const [currentNums, setCurrentNums] = useState([1, 2, 3])
    const [questionNum, setQuestionNum] = useState()
    const [answerNum, setAnswerNum] = useState()

    return (
        <div>
            {currentNums.map(num => <span>{num} </span>)}
        </div>
    )
}

export default NBack
