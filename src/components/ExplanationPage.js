import React, { useContext } from 'react'
import BackButton from './BackButton'
import StartButton from './StartButton'
import { TestProgressContext } from '../contexts/TestProgress'
import { STRINGS } from './Variables'

function ExplanationPage({instructionStr, testPath}) {

    // const testProgress = useContext(TestProgressContext)

    return (
        <div className="explain-page">
            {/* <p>Progress: {testCount}/5</p> */}
            <div className="explain-page__content">
                <p>{instructionStr}</p>
                {/* <p>{STRINGS.VALIDITY_NOTICE}</p>
                <p>{STRINGS.BROWSER_NOTICE}</p> */}
            </div>
            <StartButton path={testPath}/>
            <BackButton label={"Back"}/>
        </div>
    )
}

export default ExplanationPage
