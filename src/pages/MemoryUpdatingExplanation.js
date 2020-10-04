import React, { useContext } from 'react'
import BackButton from '../components/BackButton'
import StartButton from '../components/StartButton'
import { TestProgressContext } from '../contexts/TestProgress'

function MemoryUpdatingExplanation() {

    const testProgress = useContext(TestProgressContext)

    return (
        <div className="explain-page">
            <p>Progress: {testProgress.memoryUpdatingResults.length}/5</p>
            <div className="explain-page__content">
                <p>
                    In this test, you will be progressively shown letters in an array. Earlier letters will be hidden. Try to remember them as much as you can, as the question will ask about these letters later on.
                </p>
                <p>
                    Please refrain from using the back button on your device or refreshing the browser to prevent data loss.
                </p>
            </div>
            <StartButton path={"/memory-updating/start"}/>
            <BackButton label={"Back"}/>
        </div>
    )
}

export default MemoryUpdatingExplanation
