import React, { useState } from 'react';

import Light from './components/light';
import Log from './components/log';

import { LIGHTS, TIMEOUT } from './constants/statuses';

import { useMachine } from './service/fsm';

import styles from './app.module.css';

/**
 * The main component of the traffic light.
 *
 * @param {{[testId]: string, [lights]?: string[]}} props
 * @prop {string} [testId] - The value for the `data-testid` attribute.
 * @prop {string[]} [lights=[LIGHTS.RED, LIGHTS.YELLOW, LIGHTS.GREEN]] - The lights
 * to display.
 *
 * @returns {React.ReactElement} The traffic light component.
 */
const App = (props) => {
    const { lights = [LIGHTS.RED, LIGHTS.YELLOW, LIGHTS.GREEN], testId } = props;

    const [machine, setMachine] = useState(null);    
    const [intervalId, setIntervalId] = useState(null);
    const [logs, setLogs] = useState([]);

    const start = () => {
        if (!machine) return console.error('Unable to start FSM');

        const ts = window.setInterval(() => {
            machine.dispatch('activate');
            setLogs((prevState) => [...prevState, machine?.state]);
        }, TIMEOUT);

        setIntervalId(ts);        
    };

    const stop = () => {
        window.clearInterval(intervalId);
        setIntervalId(null);        
        setLogs([]);
        machine.deactivate();
    };

    useMachine(setMachine);

    return (
        <div className={styles.app} data-testid={testId}>
            <div>
                <div className={styles.lights}>
                    {lights.map((light) => (
                        <Light key={light} state={machine?.state} type={light} />
                    ))}
                </div>
                <Log logs={logs} />
                <div>
                  <div className={styles.counter}>Counter: {logs.length}</div>
                  <button onClick={intervalId ? stop : start}>{intervalId ? 'Clear' : 'Start'}</button>
                </div>
            </div>
        </div>
    );
};

export default App;
