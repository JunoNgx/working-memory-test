import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { TestProgressContext } from '../contexts/TestProgress'

function Menu() {

    const history = useHistory();
    const testProgress = useContext(TestProgressContext)

    return (
        <div className="menu">
            <div className="menu__tests">
                <button className="button--menu button--menu--test" onClick={()=>{history.push("/nback")}}>
                    N-Back test
                    <br/>
                    Completed: {testProgress.nbackResults.length}/5
                </button>

                <button className="button--menu button--menu--test" onClick={()=>{history.push("/memory-updating")}}>
                    Memory updating test
                    <br/>
                    Completed: {testProgress.memoryUpdatingResults.length}/5
                </button>

                <button className="button--menu button--menu--test" onClick={()=>{history.push("/corsi-block")}}>
                    Corsi block test
                    <br/>
                    Completed: {testProgress.corsiBlockResults.length}/5
                </button>
            </div>  
            <div className="menu__others">
                <button className="button--menu button--menu--other" onClick={()=>{history.push("/results")}}>View results</button>
                <button className="button--menu button--menu--other" onClick={()=>{history.push("/about")}}>About</button>
            </div>
        </div>
    )
}

export default Menu
