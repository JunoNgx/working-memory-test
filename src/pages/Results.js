import React, { useContext } from 'react'
// import { useHistory } from 'react-router-dom'
import { TestProgressContext } from '../contexts/TestProgress'

import ToMenuButton from '../components/BackButton'

function Results() {

    const testProgress = useContext(TestProgressContext)
    // const history = useHistory()

    function resetData() {
        if (window.confirm('Are you sure you want to reset your data? Please be certain that this is what you want as your data will not be recoverable afterwards.')) {
            testProgress.resetAll()
            console.log('All data has been erased')
        }
    }

    return (
        <div className="results">
            <p className="results__title">Test results so far:</p>
            
            <div className="results__container">
                <p className="results__container__test-name">
                    N-back ({testProgress.nbackResults.length}/5)
                </p>
                <p className="results__container__results">
                    <ScoreRender dataArray={testProgress.nbackResults}/>
                    {/* {testProgress.nbackResults.map((result, index) =>
                        <span key={index}>{result} </span>
                    )} */}
                </p>
                {/* <div className="results__container__test-data">
                    <p className="results__container__test-data__results">
                        {testProgress.nbackResults.map(result =>
                            <span key>{result} </span>
                        )}
                    </p>
                    <p className="results__container__test-data__result-count">
                        {testProgress.nbackResults.length}/5
                    </p>
                </div> */}
            </div>
            
            <div className="results__container">
                <p className="results__container__test-name">
                    Memory updating ({testProgress.memoryUpdatingResults.length}/5)
                </p>
                <p className="results__container__results">
                    <ScoreRender dataArray={testProgress.memoryUpdatingResults}/>
                    {/* {testProgress.memoryUpdatingResults.map((result, index) =>
                        <span key={index}>{result} </span>
                    )} */}
                </p>
            </div>
            
            <div className="results__container">
                <p className="results__container__test-name">
                    Corsi-block tapping ({testProgress.corsiBlockResults.length}/5)
                </p>
                <p className="results__container__results">
                    <ScoreRender dataArray={testProgress.corsiBlockResults}/>
                </p>
            </div>
            
            {
                (
                    (testProgress.nbackResults.length === 5)
                    && (testProgress.memoryUpdatingResults.length === 5)
                    && (testProgress.corsiBlockResults.length === 5)
                )
                
                && <p className="results__send-request">You have completed your tests. Please take a screenshot of this page and send to your point of contact in the research team. Your co-operation is much appreciated.</p>
            }
            

            <ToMenuButton label={"Back"}/>
            <p className="results__warning">WARNING: pressing the below button will erase all of your testing progress. This will not be recoverable.</p>
            <button className="button--reset" onClick={resetData}>Reset</button>
        </div>
    )
}

export default Results

function ScoreRender({dataArray}) {
    return (
        <>{(dataArray.length === 0)
            ? <span>Not yet performed</span>
            : <>
                {dataArray.map((result, index) =>
                    <span key={index}>{result} </span>
                
                )}
            </>
            }
        </>
    )
}