import React from 'react'
import { useHistory } from 'react-router-dom'

function Menu() {

    const history = useHistory();

    return (
        <div className="menu">
            <div className="menu__tests">
                <button className="button--menu button--menu--test" onClick={()=>{history.push("/nback")}}>N-Back test</button>
                <button className="button--menu button--menu--test" onClick={()=>{history.push("/memory-updating")}}>Memory updating test</button>
                <button className="button--menu button--menu--test" onClick={()=>{history.push("/corsi-block")}}>Corsi block test</button>
            </div>  
            <div className="menu__others">
                <button className="button--menu button--menu--other" onClick={()=>{history.push("/results")}}>View results</button>
                <button className="button--menu button--menu--other" onClick={()=>{history.push("/about")}}>About</button>
            </div>
        </div>
    )
}

export default Menu
