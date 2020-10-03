import React from 'react'
import { useHistory } from 'react-router-dom'

function ToMenuButton({path}) {

    const history = useHistory()

    return (
        <div>
            <button className="button--start" onClick={()=>{history.push(path)}}>Start</button>
        </div>
    )
}

export default ToMenuButton
