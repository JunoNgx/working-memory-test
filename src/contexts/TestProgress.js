import React, { useState } from 'react'

const TestProgressContext = React.createContext();

function TestProgressProvider({children}) {

    const DEBUG_MODE = true;
    const [nbackResults, setNbackResults] = useState([]);
    const [memoryUpdatingResults, setMemoryUpdatingResults] = useState([2, 2, 3, 4, 5]);
    const [corsiBlockResults, setCorsiBlockResults] = useState([3, 2, 3, 4, 5]);

    function addNbackResult(_score) {
        let newResults = [...nbackResults]
        newResults.push(_score)
        if (newResults.length > 5) newResults.splice(0, 1)
        setNbackResults(newResults);
    }
    function addMemoryUpdatingResult(_score) {

    }
    function addCorsiBlockResult(_score) {

    }

    return (
        <div>
            <TestProgressContext.Provider value ={{
                nbackResults,
                addNbackResult,
                memoryUpdatingResults,
                addMemoryUpdatingResult,
                corsiBlockResults,
                addCorsiBlockResult
            }}>
                {children}
            </TestProgressContext.Provider>
            
        </div>
    )
}

export {TestProgressContext, TestProgressProvider}
