import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnimatedRoute, AnimatedSwitch } from 'react-router-transition';

import Agreement from './pages/Agreement';
import Menu from './pages/Menu';
import NBack from './pages/NBack';
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
                {/* <Switch> */}
                <AnimatedSwitch
                    atEnter={{translateX: 640, opacity: 0}}
                    atLeave={{translateX: -640, opacity: 0}}
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
        </TestProgressProvider>
    </div>
  );
}

export default App;
