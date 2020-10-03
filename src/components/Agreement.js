import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function Agreement() {
    const history = useHistory();

    return (
        <div className="agreement">
            <p>This application was created for a research project under a Murodch University (Australia) study program. No data collection is performed in the operation of the map. Results of the test are explicitly handed over to the research team by participants.</p>
            <p>For data accuracy and validity of the research, please refrain from using assistive method or device, such as taking notes, during the course of the tests.</p>
            <p>By clicking the button below, you accept to use the app with our terms and relinquish us of any legal obligation.</p>

            <button className="button--agreement" onClick={()=>{history.push("/menu")}}>I accept</button>
        </div>
    )
}

export default Agreement
