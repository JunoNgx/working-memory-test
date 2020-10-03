import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Agreement from './pages/Agreement';
import Menu from './pages/Menu';
import Nback from './pages/Nback';
import NbackExplain from './pages/NbackExplain';
import MemoryUpdating from './pages/MemoryUpdating';
import CorsiBlock from './pages/CorsiBlock';
import Results from './pages/Results';
import About from './pages/About';

import './styles/styles.scss';

import { TestProgressProvider } from './contexts/TestProgress';

function App() {

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
                        <Route exact path="/nback">
                            <NbackExplain/>
                        </Route>
                        <Route exact path="/nback/start">
                            <Nback/>
                        </Route>
                        <Route exact path="/memory-updating/start">
                            <MemoryUpdating/>
                        </Route>
                        <Route exact path="/corsi-block/start">
                            <CorsiBlock/>
                        </Route>
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
