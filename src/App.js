import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Agreement from './pages/Agreement';
import Menu from './pages/Menu';
// import NbackExplanation from './pages/NbackExplanation';
import NbackTest from './pages/NbackTest';
// import MemoryUpdatingExplanation from './pages/MemoryUpdatingExplanation';
import MemoryUpdatingTest from './pages/MemoryUpdatingTest';
// import CorsiBlockExplanation from './pages/CorsiBlockExplanation';
import CorsiBlockTest from './pages/CorsiBlockTest';
import Results from './pages/Results';
import About from './pages/About';

import { STRINGS } from './components/Variables';
import ExplanationPage from './components/ExplanationPage';

import './styles/styles.scss';

import { TestProgressContext, TestProgressProvider } from './contexts/TestProgress';

function App() {

    // const testProgress = useContext(TestProgressContext)

    return (
        <div className="App">
            <TestProgressProvider>
                <Router>
                    <AnimatedSwitch
                        atEnter={{translateX: 640, opacity: 0}}
                        atLeave={{translateX: -640, opacity: 0}}
                        atActive={{translateX: 0, opacity: 1}}
                        className="switch-wrapper"
                        mapStyles={styles => ({
                            transform: `translateX(${styles.translateX}px)`,
                            opacity: styles.opacity
                        })}
                    >
                        <Route exact path="/">
                            <Agreement/>
                        </Route>
                        <Route exact path="/menu">
                            <Menu/>
                        </Route>

                        {/* Explanation pages */}
                        <Route exact path="/nback">
                            {/* <NbackExplanation/> */}
                            <ExplanationPage
                                instructionStr = {STRINGS.NBACK_EXPLANATION}
                                testPath = "/nback/start"
                                // testCount = {testProgress.nbackResults.length}
                            />
                        </Route>
                        <Route exact path="/memory-updating">
                            <ExplanationPage
                                instructionStr = {STRINGS.MEMORY_UPDATING_EXPLANATION}
                                testPath = "/memory-updating/start"
                                // testCount = {testProgress.nbackResults.length}
                            />
                            {/* <MemoryUpdatingExplanation/> */}
                        </Route>
                        <Route exact path="/corsi-block">
                            <ExplanationPage
                                instructionStr = {STRINGS.CORSI_BLOCK_EXPLANATION}
                                testPath = "/corsi-block/start"
                                // testCount = {testProgress.nbackResults.length}
                            />
                            {/* <CorsiBlockExplanation/> */}
                        </Route>

                        {/* The test pages */}
                        <Route exact path="/nback/start">
                            <NbackTest/>
                        </Route>
                        <Route exact path="/memory-updating/start">
                            <MemoryUpdatingTest/>
                        </Route>
                        <Route exact path="/corsi-block/start">
                            <CorsiBlockTest/>
                        </Route>

                        {/* Other menu options */}
                        <Route exact path="/results">
                            <Results/>
                        </Route>
                        <Route exact path="/about">
                            <About/>
                        </Route>
                    </AnimatedSwitch>
                </Router>
            </TestProgressProvider>
        </div>
    );
}

export default App;
