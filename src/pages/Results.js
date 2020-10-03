import React from 'react'
import { useHistory } from 'react-router-dom'

function Results() {

    const history = useHistory()

    return (
        <div className="results">
            <p className="results__title">Test results so far:</p>
            
            <div className="results__container">
                <p className="results__container__test-name">N-back</p>
                <p className="results__container__results">4 4 2 1 0</p>
            </div>
            
            <div className="results__container">
                <p className="results__container__test-name">Memory updating</p>
                <p className="results__container__results">0 1 3 4 5</p>
            </div>
            
            <div className="results__container">
                <p className="results__container__test-name">Corsi-block tapping</p>
                <p className="results__container__results">5 4 3 2 1</p>
            </div>

            <p className="results__send-request">You have completed your tests. Please take a screenshot of this page and send to your point of contact in the research team. Your co-operation is much appreciated.</p>

            <button className="button--back" onClick={()=>{history.push("/menu")}}>Back</button>
        </div>
    )
}

export default Results
