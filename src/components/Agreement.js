import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function Agreement() {
    const history = useHistory();

    return (
        <div className="agreement">
            <p>This application was used as a data collection tool for a research project as part of the study programme under Murdoch University (Australia). Data are self-contained within the partipant's browser and handed over from explicitly from partipants to the researchers via screenshots or other forms.</p>
            <p>For data accuracy and validity of the research, please refrain from using assistive method or device, such as recording and/or taking notes, during the course of the tests.</p>
            <p>By clicking the button below, you accept to use the app with our terms and relinquish us of any legal obligation.</p>

            <button className="button--back" onClick={()=>{history.push("/menu")}}>I accept</button>
        </div>
    )
}

export default Agreement
