import React, { useContext } from 'react'
import BackButton from '../components/BackButton'
import StartButton from '../components/StartButton'
import { TestProgressContext } from '../contexts/TestProgress'

function NbackExplain() {

    const testProgress = useContext(TestProgressContext)

    return (
        <div className="explain-page">
            <p>Progress: {testProgress.nbackResults.length}/5</p>
            <div className="explain-page__content">
                <p>
                    In this test, you will be progressively shown numbers in an array. Earlier numbers will be hidden. Try to remember as much as you can, as you will then be asked for about one of the hidden numbers.
                </p>
                <p>
                    Please refrain from using the back button on your device or refreshing the browser to prevent data loss.
                </p>
            </div>
            <StartButton path={"/nback/start"}/>
            <BackButton label={"Back"}/>
        </div>
    )
}

export default NbackExplain
