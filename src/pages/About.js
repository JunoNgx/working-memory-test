import React from 'react'
import { useHistory } from 'react-router-dom'

function About() {

    const history = useHistory()

    return (
        <div className="about">
            <p>This application was used as a data collection tool for a research project as part of the study programme under Murdoch University (Australia). Data are self-contained within the partipant's browser and handed over explicitly from the participant to the research team via screenshots or other forms of communications.</p>
            <p>Created by <a href="https://junongx.com/" rel="noopener noreferrer" target="_blank">Juno Nguyen</a> with <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">ReactJS</a> and <a href="hhttps://sass-lang.com/" rel="noopener noreferrer" target="_blank">SASS</a>. The source code is open and distributed under MIT License:</p>
            <p><a href="https://github.com/JunoNgx/working-memory-test" rel="noopener noreferrer" target="_blank">https://github.com/JunoNgx/working-memory-test</a></p>
            <p>For any question or issue, please contact Juno via appropriate channels.</p>

            <button className="button--back" onClick={()=>{history.push("/menu")}}>Back</button>
        </div>
    )
}

export default About
