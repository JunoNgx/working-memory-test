import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnimatedRoute, AnimatedSwitch } from 'react-router-transition';

import Agreement from './components/Agreement';
import Menu from './components/Menu';
import NBack from './components/NBack';
import MemoryUpdating from './components/MemoryUpdating';
import CorsiBlock from './components/CorsiBlock';
import Results from './components/Results';
import About from './components/About';

import './styles/styles.scss';

function App() {
  return (
    <div className="App">
        <Router>
            {/* <Switch> */}
            <AnimatedSwitch
                atEnter={{translateX: -640, opacity: 0}}
                atLeave={{translateX: 640, opacity: 0}}
                atActive={{translateX: 0, opacity: 1}}
                // atEnter={{ opacity: 0 }}
                // atLeave={{ opacity: 0 }}
                // atActive={{ opacity: 1 }}
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
                    <NBack/>
                </Route>
                <Route exact path="/memory-updating">
                    <MemoryUpdating/>
                </Route>
                <Route exact path="/corsi-block">
                    <CorsiBlock/>
                </Route>
                <Route exact path="/results">
                    <Results/>
                </Route>
                <Route exact path="/about">
                    <About/>
                </Route>
            </AnimatedSwitch>
            {/* </Switch> */}
        </Router>
    </div>
  );
}

export default App;
